'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do AI agents work?',
    answer:
      'Our AI agents use advanced machine learning algorithms and natural language processing to understand and respond to your requests. Each agent is specialized in a specific domain and trained on relevant data to provide expert assistance in their field.',
  },
  {
    question: 'What tasks can the agents help me with?',
    answer:
      'Our agents can assist with a wide range of tasks depending on their specialization. Nova can help with research, Atlas with data analysis, Sage with creative writing, Orion with coding tasks, Echo with customer support inquiries, and Luna with language translation.',
  },
  {
    question: 'How secure is my data when using these agents?',
    answer:
      "We take data security very seriously. All communications with our agents are encrypted, and we do not store your personal data beyond what's necessary to provide the service. You can review our privacy policy for more details on how we handle your information.",
  },
  {
    question: 'Can I customize the agents to better suit my needs?',
    answer:
      'Yes, our agents can be customized to better understand your preferences and requirements over time. Additionally, our enterprise plans offer more extensive customization options, including training on your specific data and integration with your existing systems.',
  },
  {
    question: 'How do I get started with using the agents?',
    answer:
      "Getting started is simple! Just click the 'Get Started' button, create an account, and you'll have immediate access to all our agents. You can then select the agent that best fits your current needs and begin interacting with them right away.",
  },
  {
    question: 'Are there any usage limits for the agents?',
    answer:
      'We offer different plans with varying usage limits. Our free tier allows you to experience the basic capabilities of each agent with some limitations. For unlimited access and advanced features, we recommend upgrading to one of our premium plans.',
  },
  {
    question: 'Can the agents work together on complex tasks?',
    answer:
      'One of the unique features of our platform is the ability for agents to collaborate. For example, Nova can research a topic, Sage can write content based on that research, and Luna can translate it into multiple languages, all in a seamless workflow.',
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
