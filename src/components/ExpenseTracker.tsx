"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Calendar,
  DollarSign,
  FileText,
  Trash2,
  Edit,
  Play,
} from "lucide-react";
import AgentChatInterface from "./AgentChat";

// Expense Report type
type ExpenseReport = {
  id: string;
  expenseReportName: string;
  description?: string;
  currency: string;
  cashAdvance?: string;
  notes?: string;
  date: string;
  createdAt: Date;
};

// Sample data
const sampleReports: ExpenseReport[] = [
  {
    id: "1",
    expenseReportName: "Business Trip to NYC",
    description: "Client meetings and conference attendance",
    currency: "USD",
    cashAdvance: "500.00",
    notes: "Hotel and meals covered by company card",
    date: "2025-05-20T00:00:00.000Z",
    createdAt: new Date("2025-05-20"),
  },
  {
    id: "2",
    expenseReportName: "Q2 Marketing Events",
    description: "Trade show booth and promotional materials",
    currency: "USD",
    cashAdvance: "1200.00",
    notes: "Receipts attached for all purchases",
    date: "2025-05-15T00:00:00.000Z",
    createdAt: new Date("2025-05-15"),
  },
];

const currencies = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
];

export default function ExpenseTracker({
  reportsFromAgent,
}: {
  reportsFromAgent?: ExpenseReport[];
}) {
  const [reports, setReports] = useState<ExpenseReport[]>(
    reportsFromAgent && reportsFromAgent.length > 0
      ? [...reportsFromAgent, ...sampleReports]
      : sampleReports
  );
  const [showForm, setShowForm] = useState(false);
  const [editingReport, setEditingReport] = useState<ExpenseReport | null>(
    null
  );
  const [formData, setFormData] = useState({
    expenseReportName: "",
    description: "",
    currency: "USD",
    cashAdvance: "",
    notes: "",
    date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
  });
  const [showAgentChat, setShowAgentChat] = useState(false);
  const agentRef = useRef<{ id: string; name: string }>({
    id: "agent_01jvypgajzfav98fvb9zx0ezx2", // Penny Niner, Expense Analyst
    name: "Penny Niner",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.expenseReportName.trim()) {
      alert("Please enter an expense report name");
      return;
    }

    const newReport: ExpenseReport = {
      id: editingReport ? editingReport.id : Date.now().toString(),
      expenseReportName: formData.expenseReportName,
      description: formData.description || undefined,
      currency: formData.currency,
      cashAdvance: formData.cashAdvance || undefined,
      notes: formData.notes || undefined,
      date: new Date(formData.date).toISOString(),
      createdAt: editingReport ? editingReport.createdAt : new Date(),
    };

    if (editingReport) {
      setReports((prev) =>
        prev.map((report) =>
          report.id === editingReport.id ? newReport : report
        )
      );
    } else {
      setReports((prev) => [newReport, ...prev]);
    }

    // Reset form
    setFormData({
      expenseReportName: "",
      description: "",
      currency: "USD",
      cashAdvance: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
    setEditingReport(null);
  };

  const handleEdit = (report: ExpenseReport) => {
    setEditingReport(report);
    setFormData({
      expenseReportName: report.expenseReportName,
      description: report.description || "",
      currency: report.currency,
      cashAdvance: report.cashAdvance || "",
      notes: report.notes || "",
      date: new Date(report.date).toISOString().split("T")[0],
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense report?")) {
      setReports((prev) => prev.filter((report) => report.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTotalAdvances = () => {
    return reports
      .filter((report) => report.cashAdvance)
      .reduce(
        (total, report) => total + Number.parseFloat(report.cashAdvance || "0"),
        0
      );
  };

  // Handler for agent summary
  const handleAgentSummary = (summary: Record<string, unknown>) => {
    setShowAgentChat(false);
    if (!summary) return;
    // Create and add the new report directly
    const newReport: ExpenseReport = {
      id: Date.now().toString(),
      expenseReportName:
        typeof summary.expenseReportName === "string"
          ? summary.expenseReportName
          : "",
      description:
        typeof summary.description === "string"
          ? summary.description
          : undefined,
      currency: typeof summary.currency === "string" ? summary.currency : "USD",
      cashAdvance:
        typeof summary.cashAdvance === "string"
          ? summary.cashAdvance
          : undefined,
      notes: typeof summary.notes === "string" ? summary.notes : undefined,
      date:
        typeof summary.date === "string"
          ? new Date(summary.date).toISOString()
          : new Date().toISOString(),
      createdAt: new Date(),
    };
    setReports((prev) => [newReport, ...prev]);
    setFormData({
      expenseReportName: "",
      description: "",
      currency: "USD",
      cashAdvance: "",
      notes: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
    setEditingReport(null);
  };

  // If new reports come from agent, add them to the list
  useEffect(() => {
    if (reportsFromAgent && reportsFromAgent.length > 0) {
      setReports((prev) => {
        // Only add new agent reports that aren't already in the list
        const existingIds = new Set(prev.map((r) => r.id));
        const newOnes = reportsFromAgent.filter((r) => !existingIds.has(r.id));
        return [...newOnes, ...prev];
      });
    }
  }, [reportsFromAgent]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
              <p className="text-blue-100">
                Manage your expense reports efficiently
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Total Reports</div>
              <div className="text-2xl font-bold">{reports.length}</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Reports</div>
                  <div className="text-xl font-bold">{reports.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Cash Advances</div>
                  <div className="text-xl font-bold">
                    ${getTotalAdvances().toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">This Month</div>
                  <div className="text-xl font-bold">
                    {
                      reports.filter((report) => {
                        const reportDate = new Date(report.date);
                        const now = new Date();
                        return (
                          reportDate.getMonth() === now.getMonth() &&
                          reportDate.getFullYear() === now.getFullYear()
                        );
                      }).length
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800" id="#expensereports">
            Expense Reports
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setShowForm(!showForm);
                setEditingReport(null);
                setFormData({
                  expenseReportName: "",
                  description: "",
                  currency: "USD",
                  cashAdvance: "",
                  notes: "",
                  date: new Date().toISOString().split("T")[0],
                });
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? "Cancel" : "New Report"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAgentChat(true)}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Play className="h-4 w-4 mr-2" />
              Import from Agent
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingReport
                  ? "Edit Expense Report"
                  : "Create New Expense Report"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expenseReportName">Report Name *</Label>
                    <Input
                      id="expenseReportName"
                      value={formData.expenseReportName}
                      onChange={(e) =>
                        handleInputChange("expenseReportName", e.target.value)
                      }
                      placeholder="Enter report name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="currency">Currency *</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value: string) =>
                        handleInputChange("currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cashAdvance">Cash Advance</Label>
                    <Input
                      id="cashAdvance"
                      type="number"
                      step="0.01"
                      value={formData.cashAdvance}
                      onChange={(e) =>
                        handleInputChange("cashAdvance", e.target.value)
                      }
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="What is this expense report for?"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Additional notes about this expense report"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {editingReport ? "Update Report" : "Create Report"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingReport(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card
              key={report.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">
                      {report.expenseReportName}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {formatDate(report.date)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(report)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(report.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {report.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {report.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Currency:
                    </span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {report.currency}
                    </span>
                  </div>

                  {report.cashAdvance && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Cash Advance:
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {report.currency}{" "}
                        {Number.parseFloat(report.cashAdvance).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {report.notes && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                      <strong>Notes:</strong> {report.notes}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No expense reports yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first expense report.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Report
            </Button>
          </div>
        )}

        {/* Agent Chat Modal */}
        {showAgentChat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowAgentChat(false)}
              >
                ×
              </button>
              <AgentChatInterface
                agent={agentRef.current}
                onSummary={handleAgentSummary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
