import AgentGrid from '@/components/AgentGrid';
import FaqAccordion from '@/components/FaqAccordion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-800">
      {/* Hero Section - Blue Gradient Background */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left side - Text content */}
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">AgentHub</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Discover a collection of specialized AI agents designed to help
                with various tasks. Each with unique capabilities and
                personalities, our agents are trained to assist you in research,
                data analysis, creative writing, coding, and more.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-blue-700/20"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right side - Logo */}
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-xl"></div>
                <div className="relative w-full h-full rounded-full border-2 border-white/30 overflow-hidden"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-16 md:h-24">
          <svg
            className="absolute bottom-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Agent Grid Section - White Background */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Meet Our <span className="text-blue-600">AI Agents</span>
        </h2>
        <AgentGrid />
      </section>

      {/* FAQ Section - White Background with Blue Accents */}
      <section className="container mx-auto px-4 py-20 mt-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <FaqAccordion />
        </div>
      </section>

      {/* Footer - Blue Background */}
      <footer className="bg-blue-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-100">
            © {new Date().getFullYear()} AgentHub. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
