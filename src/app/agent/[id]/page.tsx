/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { agents } from "@/data/agents";
import AgentChat from "@/components/AgentChat";
import ExpenseTracker from "@/components/ExpenseTracker";
import SickLeaveTracker from "@/components/SickLeave";
import { parseISO, format } from "date-fns";

// @typescript-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AgentPage({ params }: any) {
  const agentId = params.id;
  const agent = agents.find((a) => a.id === agentId);
  const [expenseReports, setExpenseReports] = useState<
    {
      id: string;
      expenseReportName: string;
      description?: string;
      currency: string;
      cashAdvance?: string;
      notes?: string;
      date: string;
      createdAt: Date;
    }[]
  >([]);
  const [sickLeaves, setSickLeaves] = useState<
    {
      id: string;
      start_date: string;
      end_date: string;
      doctors_note: boolean;
      createdAt: Date;
      status: "active" | "completed" | "pending";
    }[]
  >([]);

  if (!agent) {
    notFound();
  }

  // Handler for agent summary (for Expense Analyst)
  const handleAgentSummary = (summary: Record<string, unknown>) => {
    if (!summary) return;
    if (agent.role === "Expense Analyst") {
      const newReport = {
        id: Date.now().toString(),
        expenseReportName:
          typeof summary.expenseReportName === "string"
            ? summary.expenseReportName
            : "",
        description:
          typeof summary.description === "string"
            ? summary.description
            : undefined,
        currency:
          typeof summary.currency === "string" ? summary.currency : "USD",
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

      setExpenseReports((prev) => [newReport, ...prev]);
    } else if (agent.role === "Well-being Support") {
      // Sick leave bot
      let start_date =
        typeof summary.start_date === "string"
          ? summary.start_date
          : new Date().toISOString().split("T")[0];
      let end_date =
        typeof summary.end_date === "string" ? summary.end_date : "unknown";
      const doctors_note =
        typeof summary.doctors_note === "boolean"
          ? summary.doctors_note
          : false;

      // Format dates for display (YYYY-MM-DD)
      try {
        if (start_date && start_date !== "unknown") {
          start_date = format(parseISO(start_date), "yyyy-MM-dd");
        }
        if (end_date && end_date !== "unknown") {
          end_date = format(parseISO(end_date), "yyyy-MM-dd");
        }
      } catch (ignore) {
        // fallback to raw string if parsing fails
      }

      // Determine status
      let status: "active" | "completed" | "pending" = "pending";
      const today = format(new Date(), "yyyy-MM-dd");
      if (start_date <= today) {
        if (end_date === "unknown" || end_date >= today) {
          status = "active";
        } else {
          status = "completed";
        }
      }
      const newLeave = {
        id: Date.now().toString(),
        start_date,
        end_date,
        doctors_note,
        createdAt: new Date(),
        status,
      };
      setSickLeaves((prev) => [newLeave, ...prev]);
    }

    document
      .getElementById("#expensereports")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-blue-700/20"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {agent.role}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Agent information */}
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-100">
                <Image
                  src={agent.image || "/placeholder.svg"}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {agent.name}
                </h2>
                <p className="text-blue-600">{agent.role}</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {agent.longDescription}
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Key Capabilities
              </h3>
              <ul className="space-y-2">
                {agent.capabilities.map((capability, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column - Chat interface */}
          <div className="lg:w-1/2">
            <AgentChat agent={agent} onSummary={handleAgentSummary} />
          </div>
        </div>
      </div>

      {agent.role === "Expense Analyst" && (
        <>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center my-6">
            Dashboard
          </h2>
          <ExpenseTracker
            key={expenseReports.length}
            reportsFromAgent={expenseReports}
          />
        </>
      )}

      {agent.role === "Well-being Support" && (
        <>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center my-6">
            Dashboard
          </h2>
          <SickLeaveTracker
            key={sickLeaves.length}
            leavesFromAgent={sickLeaves}
          />
        </>
      )}

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-100">
            © {new Date().getFullYear()} AgentHub. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
