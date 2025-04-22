"use client";

import Link from 'next/link';
import { Home, Server, Activity, Cpu, BarChart2, LifeBuoy, HelpCircle, Settings, Folder, BookOpen, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  isTablet: boolean;
};

export function Sidebar({ isOpen, onClose, isMobile, isTablet }: SidebarProps) {
  // 모바일에서 사이드바 오버레이 스타일
  const mobileStyle = isMobile
      ? `fixed top-0 left-0 h-screen z-50 transform transition-transform duration-300 ease-in-out 
       ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg`
      : isTablet
          ? `fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out 
       ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
          : 'fixed top-0 left-0 h-screen';

  // 사이드바 너비 조정
  const sidebarWidth = isTablet ? 'w-64' : 'w-80';

  // 모바일에서 사이드바 외부 영역 오버레이
  const renderOverlay = () => {
    if (isMobile && isOpen) {
      return (
          <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={onClose}
              aria-hidden="true"
          />
      );
    }
    return null;
  };

  return (
      <>
        {renderOverlay()}
        <aside className={`${mobileStyle} ${sidebarWidth} bg-background border-r border-border flex flex-col`}>
          {/* Logo and Close Button Row */}
          <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="scale-75 sm:scale-90" />
            </Link>
            {(isMobile || isTablet) && (
                <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-secondary text-muted-foreground"
                    aria-label="Close sidebar"
                >
                  <X size={20} />
                </button>
            )}
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-auto py-4 sm:py-6 px-3 sm:px-4">
            <div className="text-xs text-muted-foreground mb-2 sm:mb-3 ml-3">메뉴</div>
            <ul className="space-y-1 sm:space-y-1.5">
              <NavItem href="/" icon={<Home size={isMobile ? 16 : 18} />} label="개요" active newBadge isMobile={isMobile} />
              <NavItem href="/info" icon={<Activity size={isMobile ? 16 : 18} />} label="활동일 보고" isMobile={isMobile} />
              <NavItem href="/explorer" icon={<Server size={isMobile ? 16 : 18} />} label="차트와 소스" isMobile={isMobile} />
              <NavItem href="/billing" icon={<Cpu size={isMobile ? 16 : 18} />} label="어차운트 티어바닝" newBadge isMobile={isMobile} />
              <NavItem href="/analytics" icon={<BarChart2 size={isMobile ? 16 : 18} />} label="분석 도구" isMobile={isMobile} />
              <NavItem href="/resources" icon={<Folder size={isMobile ? 16 : 18} />} label="리소스 관리" isMobile={isMobile} />
            </ul>

            <div className="mt-6 sm:mt-8">
              <div className="text-xs text-muted-foreground mb-2 sm:mb-3 ml-3">리소스</div>
              <ul className="space-y-1 sm:space-y-1.5">
                <NavItem href="/docs" icon={<BookOpen size={isMobile ? 16 : 18} />} label="문서" isMobile={isMobile} />
                <NavItem href="/support" icon={<LifeBuoy size={isMobile ? 16 : 18} />} label="지원" isMobile={isMobile} />
                <NavItem href="/help" icon={<HelpCircle size={isMobile ? 16 : 18} />} label="도움말 센터" isMobile={isMobile} />
              </ul>
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto p-3 sm:p-4 border-t border-border">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="text-xs text-muted-foreground">상태</div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">정상</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground px-2 mb-2 sm:mb-3">
              <div className="flex gap-1">
                <span>Quantstamp</span>
                <span>/</span>
              </div>
              <div>HALBORN</div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-xs sm:text-sm py-1.5 sm:py-2 rounded-md bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors">
                <Settings size={isMobile ? 14 : 16} className="inline-block mr-1" /> 설정
              </button>
              <button className="flex-1 text-xs sm:text-sm py-1.5 sm:py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-background font-medium transition-colors">
                로그인
              </button>
            </div>
          </div>
        </aside>
      </>
  );
}

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  newBadge?: boolean;
  isMobile?: boolean;
};

function NavItem({ href, icon, label, active, newBadge, isMobile }: NavItemProps) {
  return (
      <li>
        <Link
            href={href}
            className={`flex items-center justify-between rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors
          ${active
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
            }`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex-shrink-0">{icon}</span>
            <span>{label}</span>
          </div>
          {newBadge && (
              <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full bg-yellow-500 text-background">
            새로운
          </span>
          )}
        </Link>
      </li>
  );
}
