'use client';

import { useConversation } from '@11labs/react';
import { useCallback } from 'react';

export function Conversation({ agentId }: { agentId: string }) {
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
    },
    onDisconnect: async () => {
      const conversationId = conversation.getId();
      console.log('Disconnected');
      const { summary } = await fetch('/api/fetch-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId }),
      }).then((r) => r.json());

      console.log('Summary:', summary);
    },
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation, agentId]);

  const stopConversation = useCallback(async () => {
    const conversationId = conversation.getId();
    await conversation.endSession();
    const { summary } = await fetch('/api/fetch-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId }),
    }).then((r) => r.json());

    console.log('Summary:', summary);
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      </div>
    </div>
  );
}
