export const agents = [
  {
    id: 1,
    name: 'Penny Niner',
    role: 'Expense Analyst',
    description:
      'Meticulously processes your expense reports, ensuring accuracy and compliance with company policies. Its analytical skills help streamline the reimbursement process.',
    longDescription:
      'Penny Niner expertly handles your expense submissions. It can understand the details you provide, check them against company policy, and provide updates on their status. Imagine Penny using a friendly voice (via Eleven Labs) to confirm your submission or gently remind you of missing information. Perhaps it even generates a visually appealing summary of your spending using insights derived from the data.',
    capabilities: [
      'Analyzes expense details',
      'Checks policy compliance',
      'Provides status updates',
      'Potential for voice confirmations (Eleven Labs)',
      'Potential for visual summaries (Midjourney)',
      'Automation of approval workflows (Make/n8n)',
    ],
    image: '/images/expense.png',
    color: 'from-orange-300 to-orange-700',
  },
  {
    id: 'agent_01jvydwvsrefh9wxy54kves86w',
    name: 'Niner Care',
    role: 'Well-being Support',
    description:
      'Provides friendly and efficient support for your sick leave requests, ensuring you can take the time you need to rest and recover.',
    longDescription:
      "Niner Care is here to support your well-being. It facilitates your sick leave requests with ease and understanding. Envision Niner Care offering a comforting voice (via Eleven Labs) when you submit your leave or perhaps sending a gentle, visually generated 'get well soon' message (via Midjourney). It could also automate calendar updates and notifications (via Make/n8n).",
    capabilities: [
      'Handles sick leave requests',
      'Provides supportive communication',
      'Potential for comforting voice messages (Eleven Labs)',
      'Potential for visual well-wishes (Midjourney)',
      'Automation of calendar updates (Make/n8n)',
    ],
    image: '/images/healthcare.png',
    color: 'from-lime-500 to-green-600',
  },
  {
    id: 3,
    name: 'Levi Learner',
    role: 'Education and Social Facilitator',
    description:
      'Crafts engaging information and facilitates sign-ups for educational and social activities, fostering a vibrant company culture.',
    longDescription:
      'Levi Learner keeps you informed and engaged with learning opportunities and social events. It can present information in creative ways, perhaps using visually appealing formats (via Midjourney), and even announce events with an enthusiastic voice (via Eleven Labs). It can also automate sign-up processes and reminders (via Make/n8n).',
    capabilities: [
      'Presents information on events',
      'Manages sign-ups',
      'Potential for engaging visuals (Midjourney)',
      'Potential for enthusiastic voice announcements (Eleven Labs)',
      'Automation of sign-ups and reminders (Make/n8n)',
    ],
    image: '/images/education.png',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 4,
    name: 'Levi Voyager',
    role: 'Travel Coordinator',
    description:
      'Assists with your corporate travel needs by researching and organizing your trips, aiming for a smooth and efficient experience.',
    longDescription:
      'Levi Voyager helps you plan your corporate travel efficiently. It can gather travel preferences, present options, and keep you informed about your itinerary. Imagine Levi Voyager providing helpful voice prompts (via Eleven Labs) about your upcoming trip or even generating visually appealing destination information (via Midjourney). It could also automate booking processes (via Make/n8n).',
    capabilities: [
      'Assists with travel planning',
      'Presents travel options',
      'Provides itinerary information',
      'Potential for helpful voice prompts (Eleven Labs)',
      'Potential for destination visuals (Midjourney)',
      'Automation of booking processes (Make/n8n)',
    ],
    image: '/images/travel.png',
    color: 'from-blue-500 to-teal-600',
  },
  {
    id: 5,
    name: 'Book-It Niner',
    role: 'Asset Manager',
    description:
      'Helps you easily find and book internal assets, ensuring efficient access to the tools and spaces you need.',
    longDescription:
      "Book-It Niner simplifies the process of reserving internal resources. It allows you to check availability and make bookings with ease. Envision Book-It Niner confirming your booking with a friendly voice (via Eleven Labs) or perhaps showing you a visual representation of the asset you're booking (via Midjourney). It would also handle the scheduling and prevent double-bookings (via Make/n8n).",
    capabilities: [
      'Manages asset booking',
      'Checks availability',
      'Confirms bookings',
      'Potential for friendly voice confirmations (Eleven Labs)',
      'Potential for asset visuals (Midjourney)',
      'Automation of scheduling (Make/n8n)',
    ],
    image: '/images/asset.png',
    color: 'from-orange-800 to-orange-600',
  },
  {
    id: 6,
    name: 'Fix-It Niner',
    role: 'Maintenance Assistant',
    description:
      'Efficiently handles your maintenance reports, helping to get issues resolved promptly and keep your work environment in good condition.',
    longDescription:
      'Fix-It Niner streamlines the reporting and resolution of maintenance issues. It allows you to easily submit problems and receive updates on their status. Imagine Fix-It Niner providing voice updates (via Eleven Labs) on the progress of your request or even using a visual to help you describe the issue (if integrated with Midjourney for basic image generation). It would also manage the workflow of issue resolution (via Make/n8n).',
    capabilities: [
      'Handles maintenance reports',
      'Provides status updates',
      'Potential for voice updates (Eleven Labs)',
      'Potential for visual issue descriptions (Midjourney - basic)',
      'Automation of issue resolution workflow (Make/n8n)',
    ],
    image: '/images/maintenance.png',
    color: 'from-gray-400 to-violet-600',
  },
];
