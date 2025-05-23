import AgentGrid from '@/components/AgentGrid';
import FaqAccordion from '@/components/FaqAccordion';
import { Button } from '@/components/ui/button';
import Spline from '@splinetool/react-spline';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-800">
      {/* Hero Section - Blue Gradient Background */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex md:flex-row items-center gap-12">
            {/* Left side - Text content */}
            <div className="w-[50%] space-y-6">
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
              <div>
                <svg
                  id="mask"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-107.0855 -44.8045 332.9997 405.0007"
                  width="332.9997"
                  height="405.0007"
                >
                  <path
                    d="M 18.914 117.092 C 18.845 141.941 38.945 162.196 63.845 162.196 C 88.605 162.196 108.844 142.15 108.914 117.37 L 18.914 117.092 Z"
                    fill="#fff"
                    transform="matrix(1, 0, 0, 1, 5.684341886080802e-14, 2.842170943040401e-14)"
                  ></path>
                  <path
                    id="animate"
                    d="M 18.914 117.948 C 18.845 93.099 38.945 72.844 63.844 72.844 C 88.605 72.844 108.844 92.891 108.914 117.67 L 18.914 117.948 Z"
                    fill="#fff"
                    transform="matrix(1, 0, 0, 1, 5.684341886080802e-14, 2.842170943040401e-14)"
                  >
                    <animate
                      attributeName="d"
                      to="M 18.914 117.948 C 21.841 113.305 41.062 130.957 64.54 121.375 C 87.465 112.019 107.946 121.057 108.914 117.67 L 18.914 117.948 Z"
                      dur=".1s"
                      fill="freeze"
                      begin="mask.mouseenter"
                    ></animate>
                    <animate
                      attributeName="d"
                      to="M 18.914 117.948 C 18.845 93.099 38.945 72.844 63.844 72.844 C 88.605 72.844 108.844 92.891 108.914 117.67 L 18.914 117.948 Z"
                      dur=".1s"
                      fill="freeze"
                      begin="mask.mouseleave"
                    ></animate>
                  </path>
                  <path
                    d="M 51.434 102.323 C 51.456 94.426 45.067 87.988 37.154 87.988 C 29.284 87.988 22.852 94.359 22.83 102.235 L 51.434 102.323 Z"
                    fill="#fff"
                    transform="matrix(1, 0, 0, 1, 5.684341886080802e-14, 2.842170943040401e-14)"
                  ></path>
                  <path
                    d="M 104.606 102.323 C 104.628 94.426 98.24 87.988 90.326 87.988 C 82.457 87.988 76.024 94.359 76.002 102.235 L 104.606 102.323 Z"
                    fill="#fff"
                    transform="matrix(1, 0, 0, 1, 5.684341886080802e-14, 2.842170943040401e-14)"
                  ></path>
                  <path
                    d="M 25.561 360.166 C 26.099 359.28 26.435 358.735 26.838 358.189 C 62.995 303.942 99.353 249.763 135.308 195.311 C 146.397 178.478 155.537 160.487 160.443 140.655 C 171.935 94.313 151.907 49.47 109.77 27.798 C 82.148 13.623 53.183 10.284 23.814 21.12 C -12.813 34.681 -35.73 61.329 -42.988 100.31 C -53.069 154.626 -18.659 205.806 34.567 217.255 C 35.373 217.46 36.18 217.596 37.255 217.869 C 36.919 218.482 36.717 218.959 36.449 219.368 C 25.763 236.406 15.077 253.511 4.459 270.617 C 3.854 271.639 3.316 271.843 2.174 271.503 C -51.321 253.988 -90.704 210.713 -103.002 156.057 C -106.631 139.905 -107.908 123.481 -106.564 106.989 C -103.607 69.507 -89.427 36.862 -64.292 9.262 C -40.098 -17.317 -10.393 -34.354 24.688 -41.51 C 51.503 -46.962 78.049 -45.463 104.393 -38.375 C 133.224 -30.606 158.83 -16.704 180.402 4.423 C 203.521 27.049 218.038 54.377 223.616 86.544 C 225.632 98.198 226.438 109.988 225.565 121.846 C 224.624 135.203 221.196 147.947 216.425 160.418 C 210.04 177.115 201.774 192.79 192.567 207.987 C 165.752 251.944 138.87 295.9 112.055 339.925 C 110.509 342.447 109.098 345.036 107.35 347.354 C 101.1 355.872 92.7 360.098 82.215 360.166 C 72.336 360.234 62.524 360.166 52.645 360.166 C 44.379 360.166 36.045 360.166 27.779 360.166 C 27.174 360.166 26.569 360.166 25.561 360.166 Z"
                    fill="#fff"
                    transform="matrix(1, 0, 0, 1, 5.684341886080802e-14, 2.842170943040401e-14)"
                  ></path>
                </svg>
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
      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Meet Our <span className="text-blue-600">AI Agents</span>
        </h2>
        <AgentGrid />
      </section>

      {/* FAQ Section - White Background with Blue Accents */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <FaqAccordion />
        </div>
      </section>

      {/* Footer - Blue Background */}
      <footer className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-100">
            © {new Date().getFullYear()} AgentHub. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
