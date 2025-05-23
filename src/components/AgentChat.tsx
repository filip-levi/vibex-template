/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";
import { useConversation } from "@11labs/react";
import { cn } from "@/lib/utils";

interface Message {
  content: string;
  source: "ai" | "user";
  timestamp: Date;
}

interface AgentChatProps {
  agent: any;
  onSummary?: (summary: any) => void;
}

export default function AgentChatInterface({
  agent,
  onSummary,
}: AgentChatProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleStartRecording = () => {
    setIsRecording(true);
    startConversation();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopConversation();
  };

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
    },
    onDisconnect: async () => {
      const conversationId = conversation.getId();
      console.log("Disconnected");
      const summaryResponse = await fetch("/api/fetch-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId }),
      }).then((r) => r.json());
      console.log("Summary:", summaryResponse);
      if (onSummary && summaryResponse && !summaryResponse.error) {
        onSummary(summaryResponse);
      }
    },
    onMessage: (message) => {
      console.log("Message:", message);
      setMessages((prev) => [
        ...prev,
        {
          content: message.message,
          source: message.source,
          timestamp: new Date(),
        },
      ]);
    },
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: agent.id,
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation, agent.id]);

  const stopConversation = useCallback(async () => {
    const conversationId = conversation.getId();
    await conversation.endSession();
    const result = await fetch("/api/fetch-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId }),
    }).then((r) => r.json());

    console.log("Summary:", result);

    if (onSummary && result && !result.error) {
      onSummary(result);
    }
  }, [conversation, onSummary]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden h-[600px] flex flex-col">
      {/* Chat header */}
      <div className="bg-blue-600 text-white p-4">
        <h3 className="font-medium">Chat with {agent.name}</h3>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex",
              message.source === "ai" ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.source === "ai"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-blue-600 text-white"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Voice controls */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex justify-center mb-4">
          {!isRecording ? (
            <Button
              onClick={handleStartRecording}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center"
            >
              <Play className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              onClick={handleStopRecording}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center"
            >
              <Square className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
