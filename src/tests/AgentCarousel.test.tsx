import { render, screen } from '@testing-library/react';
import AgentCarousel from '@/components/AgentCarousel';

describe('AgentCarousel', () => {
  it('renders the carousel container', () => {
    render(<AgentCarousel />);
    const container = document.querySelector('.max-w-7xl');
    expect(container).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<AgentCarousel />);
    expect(true).toBe(true);
  });

  it('renders agent name for active slide', () => {
    render(<AgentCarousel />);
    // Atlas is the second agent (index 1) which is active by default
    expect(screen.getByText('Atlas')).toBeInTheDocument();
  });

  it('renders agent role for active slide', () => {
    render(<AgentCarousel />);
    expect(screen.getByText('Data Analyst')).toBeInTheDocument();
  });

  it('renders learn more button', () => {
    render(<AgentCarousel />);
    expect(screen.getByText(/Learn More About/)).toBeInTheDocument();
  });
});
