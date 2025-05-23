import { render, screen } from '@testing-library/react';
import AgentGrid from '@/components/AgentGrid';
import { agents } from '@/data/agents';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('AgentGrid', () => {
  it('renders the grid container', () => {
    render(<AgentGrid />);
    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders agent names', () => {
    render(<AgentGrid />);
    agents.forEach((agent) => {
      expect(screen.getByText(agent.name)).toBeInTheDocument();
    });
  });

  it('renders agent roles', () => {
    render(<AgentGrid />);
    agents.forEach((agent) => {
      expect(screen.getByText(agent.role)).toBeInTheDocument();
    });
  });

  it('renders connect buttons', () => {
    render(<AgentGrid />);
    agents.forEach((agent) => {
      expect(
        screen.getByText(`Connect with ${agent.name}`)
      ).toBeInTheDocument();
    });
  });
});
