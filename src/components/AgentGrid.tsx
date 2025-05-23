'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const agents = [
  {
    id: 1,
    name: 'Penny Niner',
    role: 'Expense Analyst',
    description:
      'Meticulously processes your expense reports, ensuring accuracy and compliance with company policies. Its analytical skills help streamline the reimbursement process.',
    image: '/images/expense.png',
    color: 'from-orange-300 to-orange-700',
  },
  {
    id: 2,
    name: 'Niner Care',
    role: 'Well-being Support',
    description:
      'Provides friendly and efficient support for your sick leave requests, ensuring you can take the time you need to rest and recover.',
    image: '/images/healthcare.png',
    color: 'from-lime-500 to-green-600',
  },
  {
    id: 3,
    name: 'Levi Learner',
    role: 'Education and Social Facilitator',
    description:
      'Crafts engaging information and facilitates sign-ups for educational and social activities, fostering a vibrant company culture.',
    image: '/images/education.png',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 4,
    name: 'Levi Voyager',
    role: 'Travel Coordinator',
    description:
      'Assists with your corporate travel needs by researching and organizing your trips, aiming for a smooth and efficient experience.',
    image: '/images/travel.png',
    color: 'from-blue-500 to-teal-600',
  },
  {
    id: 5,
    name: 'Book-It Niner',
    role: 'Asset Manager',
    description:
      'Helps you easily find and book internal assets, ensuring efficient access to the tools and spaces you need.',
    image: '/images/asset.png',
    color: 'from-orange-800 to-orange-600',
  },
  {
    id: 6,
    name: 'Fix-It Niner',
    role: 'Maintenance Assistant',
    description:
      'Efficiently handles your maintenance reports, helping to get issues resolved promptly and keep your work environment in good condition.',
    image: '/images/maintenance.png',
    color: 'from-gray-400 to-violet-600',
  },
];

export default function AgentGrid() {
  const [, setActiveId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-lg border border-gray-200"
          onMouseEnter={() => setActiveId(agent.id)}
          onMouseLeave={() => setActiveId(null)}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={agent.image || '/placeholder.svg'}
              alt={agent.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Radial gradients for effect */}
          <div
            className={cn(
              'absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300',
              'bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))]',
              agent.color
            )}
          ></div>

          {/* Blur effects */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full blur-xl bg-white/30 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full blur-xl bg-white/30 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="space-y-2">
              {/* Always visible content */}
              <div className="space-y-1">
                <div className="text-sm font-medium uppercase tracking-wider">
                  <span
                    className={cn(
                      'bg-gradient-to-r bg-clip-text text-transparent',
                      agent.color
                    )}
                  >
                    {agent.role}
                  </span>
                </div>
                <h3 className="text-2xl font-medium">{agent.name}</h3>
              </div>

              {/* Hover content */}
              <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-sm text-gray-100 line-clamp-3">
                  {agent.description}
                </p>
                <Button
                  className={cn(
                    'mt-4 bg-gradient-to-r text-white hover:opacity-90 transition-opacity w-full',
                    agent.color
                  )}
                >
                  Connect with {agent.name}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
