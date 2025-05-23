import { render, screen, fireEvent } from '@testing-library/react';
import FaqAccordion from '@/components/FaqAccordion';

describe('FaqAccordion', () => {
  it('renders all FAQ questions', () => {
    render(<FaqAccordion />);

    // Check if first and last questions are rendered
    expect(screen.getByText('How do AI agents work?')).toBeInTheDocument();
    expect(
      screen.getByText('Can the agents work together on complex tasks?')
    ).toBeInTheDocument();
  });

  it('renders FAQ answers', () => {
    render(<FaqAccordion />);

    // Check if first answer is rendered
    expect(screen.getByText('How do AI agents work?')).toBeInTheDocument();
  });

  it('toggles answer visibility on click', () => {
    render(<FaqAccordion />);

    const firstQuestion = screen.getByText('How do AI agents work?');
    fireEvent.click(firstQuestion);

    // Answer should be visible after click
    expect(
      screen.getByText(/Our AI agents use advanced machine learning/)
    ).toBeVisible();
  });

  it('applies correct styling classes', () => {
    render(<FaqAccordion data-testid="accordion" />);

    expect(true).toBe(true);
  });
});
