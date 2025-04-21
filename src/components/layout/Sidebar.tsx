"use client";

import Link from 'next/link';
import { Home, Server, Activity, Cpu, BarChart2, LifeBuoy, HelpCircle, Settings, Folder, BookOpen } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-80 bg-background border-r border-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="scale-90" />
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-auto py-6 px-4">
        <div className="text-xs text-muted-foreground mb-3 ml-3">메뉴</div>
        <ul className="space-y-1.5">
          <NavItem href="/" icon={<Home size={18} />} label="개요" active newBadge />
          <NavItem href="/info" icon={<Activity size={18} />} label="활동일 보고" />
          <NavItem href="/explorer" icon={<Server size={18} />} label="차트와 소스" />
          <NavItem href="/billing" icon={<Cpu size={18} />} label="어차운트 티어바닝" newBadge />
          <NavItem href="/analytics" icon={<BarChart2 size={18} />} label="분석 도구" />
          <NavItem href="/resources" icon={<Folder size={18} />} label="리소스 관리" />
        </ul>

        <div className="mt-8">
          <div className="text-xs text-muted-foreground mb-3 ml-3">리소스</div>
          <ul className="space-y-1.5">
            <NavItem href="/docs" icon={<BookOpen size={18} />} label="문서" />
            <NavItem href="/support" icon={<LifeBuoy size={18} />} label="지원" />
            <NavItem href="/help" icon={<HelpCircle size={18} />} label="도움말 센터" />
          </ul>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-muted-foreground">상태</div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">정상</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground px-2 mb-3">
          <div className="flex gap-1">
            <span>Quantstamp</span>
            <span>/</span>
          </div>
          <div>HALBORN</div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 text-sm py-2 rounded-md bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors">
            <Settings size={16} className="inline-block mr-1" /> 설정
          </button>
          <button className="flex-1 text-sm py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-background font-medium transition-colors">
            로그인
          </button>
        </div>
      </div>
    </aside>
  );
}

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  newBadge?: boolean;
};

function NavItem({ href, icon, label, active, newBadge }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors
          ${active
            ? 'bg-secondary text-foreground'
            : 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
          }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0">{icon}</span>
          <span>{label}</span>
        </div>
        {newBadge && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500 text-background">
            새로운
          </span>
        )}
      </Link>
    </li>
  );
}
