'use client';

import type React from 'react';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Play,
  Square,
  Headphones,
  MessageCircle,
  Mic,
  MicOff,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useConversation } from '@11labs/react';

// Message type definition
type Message = {
  id: string;
  content: string;
  source: 'agent' | 'user';
  timestamp: Date;
};

export default function HelpDeskAgent() {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'agent_01jvyxfam4f5eayafp2shgv3xz',
      content:
        "Hi! I'm your Help Desk Agent. I'm here to assist you with any technical issues or questions you might have. How can I help you today?",
      source: 'agent',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ElevenLabs conversation hook
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to Help Desk Agent');
      setIsConnected(true);
      addMessage({
        id: Date.now().toString(),
        content: "🟢 Voice connection established. I'm ready to help!",
        source: 'agent',
        timestamp: new Date(),
      });
    },
    onDisconnect: async () => {
      const conversationId = conversation.getId();
      console.log('Disconnected from Help Desk Agent');
      setIsConnected(false);
      setIsRecording(false);

      try {
        const { summary } = await fetch('/api/fetch-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId }),
        }).then((r) => r.json());

        console.log('Conversation Summary:', summary);

        addMessage({
          id: Date.now().toString(),
          content:
            '🔴 Voice session ended. Thank you for using our help desk service!',
          source: 'agent',
          timestamp: new Date(),
        });
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    },
    onMessage: (message) => {
      console.log('Voice Message:', message);
      addMessage({
        id: Date.now().toString(),
        content: message.message,
        source: message.source === 'ai' ? 'agent' : 'user',
        timestamp: new Date(),
      });
    },
    onError: (error) => {
      console.error('Voice conversation error:', error);
      addMessage({
        id: Date.now().toString(),
        content:
          '❌ Voice connection error. Please try again or use text chat.',
        source: 'agent',
        timestamp: new Date(),
      });
      setIsConnected(false);
      setIsRecording(false);
    },
  });

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: 'agent_01jvyxfam4f5eayafp2shgv3xz',
      });
    } catch (error) {
      console.error('Failed to start voice conversation:', error);
      addMessage({
        id: Date.now().toString(),
        content:
          '❌ Unable to access microphone. Please check your permissions and try again.',
        source: 'agent',
        timestamp: new Date(),
      });
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    try {
      console.log('Session Summary:');
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  }, []);

  const handleStartListening = () => {
    setIsRecording(true);
    startConversation();
  };

  const handleStopListening = () => {
    setIsRecording(false);
    stopConversation();
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    addMessage({
      id: Date.now().toString(),
      content: inputMessage,
      source: 'user',
      timestamp: new Date(),
    });

    // Clear input
    setInputMessage('');

    // Simulate agent thinking
    setIsTyping(true);

    // Simulate agent response after a delay
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        content: generateHelpDeskResponse(inputMessage),
        source: 'agent',
        timestamp: new Date(),
      });
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const generateHelpDeskResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('password') || lowerMessage.includes('login')) {
      return "I can help you with password issues! First, try resetting your password using the 'Forgot Password' link. If that doesn't work, I can guide you through additional troubleshooting steps.";
    }

    if (lowerMessage.includes('slow') || lowerMessage.includes('performance')) {
      return "Performance issues can be frustrating. Let's try a few things: 1) Clear your browser cache, 2) Close unnecessary tabs, 3) Restart your browser. Are you experiencing slowness on a specific page or throughout the application?";
    }

    if (lowerMessage.includes('error') || lowerMessage.includes('bug')) {
      return "I'd be happy to help you resolve this error. Could you please provide more details about when the error occurs and what message you're seeing? A screenshot would also be very helpful.";
    }

    if (
      lowerMessage.includes('email') ||
      lowerMessage.includes('notification')
    ) {
      return 'For email and notification issues, please check: 1) Your spam/junk folder, 2) Email preferences in your account settings, 3) Whether notifications are enabled in your browser. What specific email issue are you experiencing?';
    }

    if (lowerMessage.includes('mobile') || lowerMessage.includes('phone')) {
      return 'Mobile app issues can often be resolved by: 1) Updating to the latest app version, 2) Restarting the app, 3) Checking your internet connection. What specific mobile issue are you facing?';
    }

    // Default responses
    const defaultResponses = [
      "I understand your concern. Could you provide more specific details about the issue you're experiencing?",
      "That's a great question! Let me help you find the best solution for this problem.",
      "I'm here to help! Can you walk me through the steps you've already tried?",
      "Thank you for reaching out. I'll do my best to resolve this issue for you quickly.",
      "I see what you're describing. Let me suggest a few troubleshooting steps that should help.",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {showChat && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col mb-4">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                <span className="font-medium">Help Desk Agent</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-blue-700 h-6 w-6 p-0"
                onClick={() => setShowChat(false)}
              >
                ×
              </Button>
            </div>
            <div className="text-xs text-blue-100 mt-1">
              {isConnected
                ? '🟢 Voice Connected'
                : isRecording
                ? '🔴 Connecting...'
                : '⚪ Ready'}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.source === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                      message.source === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    )}
                  >
                    <p>{message.content}</p>
                    <div
                      className={cn(
                        'text-xs mt-1',
                        message.source === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">
                      Agent is typing...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Text Input */}
          <div className="border-t border-gray-200 p-3 bg-white rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Circular Component */}
      <div className="relative">
        {/* Pulsing ring when recording */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full animate-ping opacity-75"></div>
        )}

        {/* Connection ring */}
        {isConnected && (
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-pulse"></div>
        )}

        {/* Main button */}
        <Card className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-200">
          <CardContent className="p-0 h-full flex items-center justify-center">
            {!isRecording ? (
              <Button
                onClick={handleStartListening}
                className="w-full h-full rounded-full text-blue-500 bg-white hover:bg-white hover:cursor-pointer border-0 flex items-center justify-center"
              >
                <Play className="h-6 w-6" />
              </Button>
            ) : (
              <Button
                onClick={handleStopListening}
                className="w-full h-full rounded-full text-blue-500 bg-white hover:bg-white hover:cursor-pointer border-0 flex items-center justify-center"
              >
                <Square className="h-6 w-6" />
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Status indicator */}
        <div className="absolute -top-1 -right-1">
          {isRecording ? (
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <Mic className="h-2 w-2 text-white" />
            </div>
          ) : isConnected ? (
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          ) : (
            <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
              <MicOff className="h-2 w-2 text-white" />
            </div>
          )}
        </div>

        {/* Chat toggle button */}
        <Button
          onClick={() => setShowChat(!showChat)}
          className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 shadow-md"
          size="sm"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </div>

      {/* Tooltip */}
      {!showChat && !isRecording && (
        <div className="absolute bottom-20 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Click to start voice chat
        </div>
      )}
    </div>
  );
}
