'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How can I use AI agents for internal Levi9 processes?',
    answer:
      'Our AI agents are designed to streamline internal Levi9 operations. Nova helps with technical documentation and research, Atlas assists with project data analysis, Sage handles internal communications and content creation, Orion supports development tasks, and Echo manages internal support requests. Each agent is trained on Levi9-specific processes and documentation.',
  },
  {
    question: 'What internal tasks can the agents help me with?',
    answer:
      "Our agents can assist with various internal Levi9 tasks: Nova can help with technical research and documentation, Atlas can analyze project metrics and KPIs, Sage can draft internal communications and reports, Orion can assist with code reviews and development tasks, and Echo can help with internal support and process inquiries. They're all integrated with our internal systems and follow Levi9's best practices.",
  },
  {
    question: 'How secure is my internal data when using these agents?',
    answer:
      "All agents operate within Levi9's secure internal network and follow our strict security protocols. They only access authorized internal resources and maintain data confidentiality. All interactions are logged and monitored according to our internal security policies, and agents are regularly audited for compliance.",
  },
  {
    question: 'Can I customize the agents for my specific team needs?',
    answer:
      "Yes, agents can be customized for different Levi9 teams and projects. They can be trained on team-specific documentation, coding standards, and internal processes. Our platform allows you to set up custom workflows and integrate with team-specific tools while maintaining compliance with Levi9's standards.",
  },
  {
    question: 'How do I get started with using the agents in my team?',
    answer:
      "Getting started is simple! Log in with your Levi9 credentials, select the agent that best fits your team's needs, and begin using them for your internal tasks. Each agent comes with pre-configured access to relevant internal systems and documentation. You can also request additional integrations through the internal support portal.",
  },
  {
    question: 'What are the usage guidelines for internal agents?',
    answer:
      "Usage is based on your team's access level and project requirements. All agents are available 24/7 for internal use, with priority given to critical business operations. Usage is monitored to ensure optimal resource allocation across teams. For specific usage quotas or additional access, please contact your team lead or the internal support team.",
  },
  {
    question: 'How can agents collaborate on complex internal projects?',
    answer:
      'Our agents are designed to work together seamlessly on internal projects. For example, Nova can research technical requirements, Atlas can analyze project metrics, Sage can draft project documentation, Orion can assist with implementation, and Echo can handle stakeholder communications. This collaborative approach ensures comprehensive project support while maintaining internal standards and processes.',
  },
];

export default function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-[60%] mx-auto">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b border-gray-200"
        >
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors py-5">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 pb-5">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
