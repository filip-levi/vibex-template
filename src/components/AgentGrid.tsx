'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { agents } from '@/data/agents';
import { useRouter } from 'next/navigation';

export default function AgentGrid() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="relative rounded-2xl overflow-hidden aspect-[4/5] group shadow-lg border border-gray-200"
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
            <div className="space-y-2 transform transition-transform duration-300 group-hover:-translate-y-4">
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
              <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 ">
                <p className="text-sm text-gray-100 line-clamp-3 hidden">
                  {agent.description}
                </p>
                <Button
                  className={cn(
                    'mt-4 bg-gradient-to-r text-white hover:opacity-90 transition-opacity w-full cursor-pointer hidden group-hover:block',
                    agent.color
                  )}
                  onClick={() => router.push(`/agent/${agent.id}`)}
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
