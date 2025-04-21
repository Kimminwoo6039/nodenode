"use client";

import type { FC } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-white font-bold flex items-center">
        <div className="mr-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="10" height="10" fill="white" />
            <rect x="14" width="10" height="10" fill="white" />
            <rect y="14" width="10" height="10" fill="white" />
          </svg>
        </div>
        <span className="text-lg">NodeOps</span>
      </div>
    </div>
  );
};
