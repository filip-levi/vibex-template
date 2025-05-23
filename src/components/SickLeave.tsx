"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Calendar,
  FileText,
  Trash2,
  Edit,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Sick Leave type
type SickLeave = {
  id: string;
  start_date: string;
  end_date: string; // Can be 'unknown'
  doctors_note: boolean;
  createdAt: Date;
  status: "active" | "completed" | "pending";
};

// Sample data
const sampleLeaves: SickLeave[] = [
  {
    id: "1",
    start_date: "2025-05-20",
    end_date: "2025-05-22",
    doctors_note: true,
    createdAt: new Date("2025-05-20"),
    status: "completed",
  },
  {
    id: "2",
    start_date: "2025-05-23",
    end_date: "unknown",
    doctors_note: false,
    createdAt: new Date("2025-05-23"),
    status: "active",
  },
];

export default function SickLeaveTracker({
  leavesFromAgent,
}: {
  leavesFromAgent?: SickLeave[];
}) {
  const [leaves, setLeaves] = useState<SickLeave[]>(
    leavesFromAgent && leavesFromAgent.length > 0
      ? [...leavesFromAgent, ...sampleLeaves]
      : sampleLeaves
  );
  const [showForm, setShowForm] = useState(false);
  const [editingLeave, setEditingLeave] = useState<SickLeave | null>(null);
  const [formData, setFormData] = useState({
    start_date: new Date().toISOString().split("T")[0], // Today's date
    end_date: "",
    end_date_unknown: false,
    doctors_note: false,
  });

  useEffect(() => {
    if (leavesFromAgent && leavesFromAgent.length > 0) {
      setLeaves((prev) => {
        const existingIds = new Set(prev.map((l) => l.id));
        const newOnes = leavesFromAgent.filter((l) => !existingIds.has(l.id));
        return [...newOnes, ...prev];
      });
    }
  }, [leavesFromAgent]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.start_date) {
      alert("Please enter a start date");
      return;
    }

    const endDate = formData.end_date_unknown
      ? "unknown"
      : formData.end_date || "unknown";

    // Determine status
    let status: "active" | "completed" | "pending" = "pending";
    const today = new Date().toISOString().split("T")[0];
    const startDate = formData.start_date;

    if (startDate <= today) {
      if (endDate === "unknown" || endDate >= today) {
        status = "active";
      } else {
        status = "completed";
      }
    }

    const newLeave: SickLeave = {
      id: editingLeave ? editingLeave.id : Date.now().toString(),
      start_date: formData.start_date,
      end_date: endDate,
      doctors_note: formData.doctors_note,
      createdAt: editingLeave ? editingLeave.createdAt : new Date(),
      status,
    };

    if (editingLeave) {
      setLeaves((prev) =>
        prev.map((leave) => (leave.id === editingLeave.id ? newLeave : leave))
      );
    } else {
      setLeaves((prev) => [newLeave, ...prev]);
    }

    // Reset form
    setFormData({
      start_date: new Date().toISOString().split("T")[0],
      end_date: "",
      end_date_unknown: false,
      doctors_note: false,
    });
    setShowForm(false);
    setEditingLeave(null);
  };

  const handleEdit = (leave: SickLeave) => {
    setEditingLeave(leave);
    setFormData({
      start_date: leave.start_date,
      end_date: leave.end_date === "unknown" ? "" : leave.end_date,
      end_date_unknown: leave.end_date === "unknown",
      doctors_note: leave.doctors_note,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this sick leave record?")) {
      setLeaves((prev) => prev.filter((leave) => leave.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === "unknown") return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    if (endDate === "unknown") return "Ongoing";

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActiveLeaves = () =>
    leaves.filter((leave) => leave.status === "active").length;
  const getTotalDaysThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return leaves
      .filter((leave) => {
        const leaveDate = new Date(leave.start_date);
        return (
          leaveDate.getMonth() === currentMonth &&
          leaveDate.getFullYear() === currentYear
        );
      })
      .reduce((total, leave) => {
        if (leave.end_date === "unknown") return total + 1; // Count as 1 day for ongoing
        const start = new Date(leave.start_date);
        const end = new Date(leave.end_date);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return total + diffDays;
      }, 0);
  };

  const getLeavesWithDoctorsNote = () =>
    leaves.filter((leave) => leave.doctors_note).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sick Leave Tracker</h1>
              <p className="text-blue-100">
                Manage your sick leave records efficiently
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Active Leaves</div>
              <div className="text-2xl font-bold">{getActiveLeaves()}</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Records</div>
                  <div className="text-xl font-bold">{leaves.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Active Leaves</div>
                  <div className="text-xl font-bold">{getActiveLeaves()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Days This Month</div>
                  <div className="text-xl font-bold">
                    {getTotalDaysThisMonth()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">With Doctor Note</div>
                  <div className="text-xl font-bold">
                    {getLeavesWithDoctorsNote()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800" id="expensereports">
            Sick Leave Records
          </h2>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingLeave(null);
              setFormData({
                start_date: new Date().toISOString().split("T")[0],
                end_date: "",
                end_date_unknown: false,
                doctors_note: false,
              });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "New Sick Leave"}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingLeave
                  ? "Edit Sick Leave Record"
                  : "Create New Sick Leave Record"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Start Date *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) =>
                        handleInputChange("start_date", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) =>
                        handleInputChange("end_date", e.target.value)
                      }
                      disabled={formData.end_date_unknown}
                      placeholder={
                        formData.end_date_unknown
                          ? "Unknown"
                          : "Select end date"
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="end_date_unknown"
                    checked={formData.end_date_unknown}
                    onCheckedChange={(checked: string | boolean) => {
                      handleInputChange("end_date_unknown", checked);
                      if (checked) {
                        handleInputChange("end_date", "");
                      }
                    }}
                  />
                  <Label htmlFor="end_date_unknown">End date is unknown</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="doctors_note"
                    checked={formData.doctors_note}
                    onCheckedChange={(checked: string | boolean) =>
                      handleInputChange("doctors_note", checked)
                    }
                  />
                  <Label htmlFor="doctors_note">I have a doctor note</Label>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {editingLeave ? "Update Record" : "Create Record"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingLeave(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaves.map((leave) => (
            <Card
              key={leave.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(leave.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(leave.status)}
                          <span className="capitalize">{leave.status}</span>
                        </div>
                      </Badge>
                      {leave.doctors_note && (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Doctor Note
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">Sick Leave</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(leave)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(leave.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Start Date:
                    </span>
                    <span className="text-sm">
                      {formatDate(leave.start_date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      End Date:
                    </span>
                    <span className="text-sm">
                      {formatDate(leave.end_date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Duration:
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {calculateDuration(leave.start_date, leave.end_date)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Created: {leave.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {leaves.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No sick leave records yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first sick leave record.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Record
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
