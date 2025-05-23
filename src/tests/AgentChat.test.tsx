import { render, screen } from '@testing-library/react';
import AgentChatInterface from '@/components/AgentChat';

// Mock the useConversation hook
jest.mock('@11labs/react', () => ({
  useConversation: () => ({
    startSession: jest.fn(),
    endSession: jest.fn(),
    getId: jest.fn(),
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe('AgentChatInterface', () => {
  const mockAgent = {
    id: 'test-agent-id',
    name: 'Test Agent',
  };

  it('renders chat interface with agent name', () => {
    render(<AgentChatInterface agent={mockAgent} />);
    expect(screen.getByText('Chat with Test Agent')).toBeInTheDocument();
  });

  it('renders play button', () => {
    render(<AgentChatInterface agent={mockAgent} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders chat container', () => {
    render(<AgentChatInterface agent={mockAgent} />);
    const container = document.querySelector('.bg-white');
    expect(container).toBeInTheDocument();
  });

  it('renders voice controls section', () => {
    render(<AgentChatInterface agent={mockAgent} />);
    const controls = document.querySelector('.bg-gray-50');
    expect(controls).toBeInTheDocument();
  });
});
