'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Agent data
const agents = [
  {
    id: 1,
    name: 'Nova',
    role: 'Research Assistant',
    description:
      'Specialized in gathering and analyzing information from various sources to provide comprehensive research assistance.',
    image: '/placeholder-5g4zr.png',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 2,
    name: 'Atlas',
    role: 'Data Analyst',
    description:
      'Expert in processing and visualizing complex data sets to extract meaningful insights and patterns.',
    image: '/placeholder-ftjd4.png',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    name: 'Sage',
    role: 'Creative Writer',
    description:
      'Crafts engaging narratives, stories, and content with a unique creative flair and adaptable style.',
    image: '/artistic-ai-assistant.png',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 4,
    name: 'Orion',
    role: 'Code Assistant',
    description:
      'Helps with programming tasks, debugging code, and providing technical solutions across multiple languages.',
    image:
      '/placeholder.svg?height=400&width=400&query=tech-focused AI assistant with green code elements',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 5,
    name: 'Echo',
    role: 'Customer Support',
    description:
      'Provides friendly and efficient assistance for user inquiries, troubleshooting, and support requests.',
    image:
      '/placeholder.svg?height=400&width=400&query=friendly AI assistant with orange customer service elements',
    color: 'from-orange-500 to-amber-600',
  },
];

export default function AgentCarousel() {
  const [activeIndex, setActiveIndex] = useState(1); // Start with second item active
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % agents.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + agents.length) % agents.length);
  };

  // Auto scroll
  useEffect(() => {
    if (!autoScrollEnabled) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, autoScrollEnabled]);

  // Pause auto-scroll when hovering
  const handleMouseEnter = () => setAutoScrollEnabled(false);
  const handleMouseLeave = () => setAutoScrollEnabled(true);

  return (
    <div
      className="relative max-w-7xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation arrows */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
        <Button
          variant="outline"
          size="icon"
          className="bg-cyan-500 hover:bg-cyan-600 border-cyan-500 text-white rounded"
          onClick={goToPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
        <Button
          variant="outline"
          size="icon"
          className="bg-cyan-500 hover:bg-cyan-600 border-cyan-500 text-white rounded"
          onClick={goToNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Carousel container */}
      <div className="flex items-center justify-center gap-4 py-8 px-16">
        {agents.map((agent, index) => {
          const isActive = index === activeIndex;
          const isAdjacent =
            Math.abs(index - activeIndex) === 1 ||
            (activeIndex === 0 && index === agents.length - 1) ||
            (activeIndex === agents.length - 1 && index === 0);

          if (!isActive && !isAdjacent) return null;

          return (
            <div
              key={agent.id}
              className={cn(
                'relative transition-all duration-700 ease-out cursor-pointer',
                isActive
                  ? 'w-96 h-96 scale-105 z-20'
                  : 'w-80 h-80 scale-95 z-10 opacity-60'
              )}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={agent.image || '/placeholder.svg'}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Gradient overlay - only visible when active */}
                <div
                  className={cn(
                    'absolute inset-0 transition-opacity duration-700',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {/* Multiple gradient layers for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20" />
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent" />

                  {/* Blur effects */}
                  <div className="absolute top-4 left-4 w-20 h-20 bg-blue-500/30 rounded-full blur-xl" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-purple-500/30 rounded-full blur-xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                </div>

                {/* Agent info - only visible when active */}
                <div
                  className={cn(
                    'absolute bottom-0 left-0 right-0 p-6 transition-all duration-700',
                    isActive
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  )}
                >
                  <div className="space-y-2">
                    <div className="text-sm font-medium uppercase tracking-wider">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {agent.role}
                      </span>
                    </div>
                    <h3 className="text-2xl font-medium text-white">
                      {agent.name}
                    </h3>
                  </div>
                </div>

                {/* Hover effect for non-active cards */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent description below carousel - only for active agent */}
      <div className="text-center mt-8 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed">
            {agents[activeIndex].description}
          </p>
          <Button
            className={cn(
              'mt-6 bg-gradient-to-r text-white hover:opacity-90 transition-opacity',
              agents[activeIndex].color
            )}
          >
            Learn More About {agents[activeIndex].name}
          </Button>
        </div>
      </div>
    </div>
  );
}
