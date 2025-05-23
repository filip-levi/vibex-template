# Levi9 Internal Helpdesk

Levi9 Internal Helpdesk is a modern, responsive web application built with Next.js and React, designed to showcase and interact with a collection of AI-powered agents. The app provides detailed information about each agent and allows users to chat with them in real time. The UI is clean, accessible, and optimized for both desktop and mobile devices.

## Dedicated agents

For each business requirement (such as Sick Leave, Expense Report, Internal Asset Booking, Maintenance Issues, Corporate Travel, and Education and Social Activities), there is a dedicated agent page.

## Features

### 1. Agent Directory

- **Agent Grid & Carousel:**
  - Browse all available agents in a visually appealing grid format.
  - Each agent card displays the agent's name, role, and avatar.
  - Clicking an agent navigates to their detailed profile page.

### 2. Agent Profile Pages

- **Detailed Agent Information:**
  - Each agent has a dedicated page with their name, role, avatar, and a long description.
  - Key capabilities are listed in a styled section for quick reference.
- **Navigation:**
  - Easy navigation back to the main directory with a prominent back button.
- **Responsive Layout:**
  - Profile pages are split into two columns on large screens: agent info and chat interface.

### 3. Real-Time Chat Interface

- **AgentChat Component:**
  - Users can interact with agents via a chat interface embedded on each agent's profile page.
  - The chat UI is user-friendly, supporting message input and displaying conversation history.
  - Users can call agents directly and speak to them in english.

### 4. UI Components

- **Reusable UI Elements:**
  - Button, Badge, Accordion, and Input components are available for consistent styling and interaction.
- **FAQ Accordion:**
  - An FAQ section uses an accordion for collapsible answers.

### 5. Theming & Styling

- **Modern Design:**
  - Uses Tailwind CSS for utility-first styling and responsive design.
  - Gradient headers, rounded cards, and accessible color schemes.
- **Customizable:**
  - Easily extendable with new agents, features, or UI tweaks.

### 6. Data Management

- **Static Data:**
  - Agent data is managed in a central file (`src/data/agents.ts`), making it easy to add or update agents.
- **TypeScript Support:**
  - The app is fully typed for safety and maintainability.

### 7. Error Handling

- **404 Handling:**
  - Navigating to a non-existent agent profile triggers a user-friendly not found page.

### 8. Footer

- **Consistent Branding:**
  - A footer is present on all pages, displaying copyright and branding.

## Project Structure

```
src/
  app/
    page.tsx                # Main landing page
    agent/[id]/page.tsx     # Dynamic agent profile pages
  components/
    AgentCarousel.tsx       # Carousel for agents
    AgentChat.tsx           # Chat interface
    AgentGrid.tsx           # Grid display for agents
    Conversation.tsx        # Chat conversation logic
    FaqAccordion.tsx        # FAQ section
    ui/                     # Reusable UI components
  data/
    agents.ts               # Agent data definitions
  styles/
    globals.css             # Global styles
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Adding New Agents

- Edit `src/data/agents.ts` and add a new agent object with the required fields:
  - `id`, `name`, `role`, `image`, `longDescription`, `capabilities` (array)

## Customization

- **Styling:**
  - Modify Tailwind classes or add new styles in `globals.css`.
- **Components:**
  - Extend or create new components in `src/components/` as needed.

## Testing

- Example tests are located in `src/tests/`. Add more tests to ensure reliability.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

This project is licensed under the MIT License.

---

For questions or contributions, please open an issue or submit a pull request.
