"use client";

import { motion } from "framer-motion";

export function Footer() {
  const tools = [
    {
      name: "Next.js",
      icon: (
        <svg viewBox="0 0 180 180" className="w-4 h-4">
          <mask
            id="mask0_408_134"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="180"
            height="180"
          >
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#mask0_408_134)">
            <circle cx="90" cy="90" r="90" fill="black" />
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
              fill="url(#paint0_linear_408_134)"
            />
            <rect
              x="115"
              y="54"
              width="12"
              height="72"
              fill="url(#paint1_linear_408_134)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_408_134"
              x1="109"
              y1="116.5"
              x2="144.5"
              y2="160.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_408_134"
              x1="121"
              y1="54"
              x2="120.799"
              y2="106.875"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: "Shadcn/UI",
      icon: (
        <svg viewBox="0 0 256 256" className="w-4 h-4" fill="currentColor">
          <rect width="256" height="256" fill="none" />
          <line
            x1="208"
            y1="128"
            x2="128"
            y2="208"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="192"
            y1="40"
            x2="40"
            y2="192"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      ),
    },
    {
      name: "Framer Motion",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M12 0L24 8v8L12 24 0 16V8z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Developer Credit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <span>Developed by</span>
            <a
              href="https://www.jeyen.site"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              Jonel Naquita
            </a>
          </motion.div>

          {/* Tech Stack Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs text-gray-500 mr-1">Built with</span>
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="group relative flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200 cursor-default"
              >
                <div className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {tool.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
