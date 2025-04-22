"use client";

import { Bell, Search, UserCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type HeaderProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
  isTablet: boolean;
};

export function Header({ toggleSidebar, isSidebarOpen, isMobile, isTablet }: HeaderProps) {
  return (
      <header className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6 border-b border-border bg-card sticky top-0 z-10">
        {/* 모바일/태블릿용 메뉴 버튼 */}
        {(isMobile || isTablet) && (
            <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu size={isMobile ? 20 : 22} className="text-muted-foreground" />
            </Button>
        )}

        {/* 검색 - 모바일에서는 작게 */}
        <div className={`flex items-center ${isMobile ? 'w-full max-w-[140px]' : 'w-full max-w-xs'}`}>
          <div className="relative w-full">
            <Search
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground"
            />
            <input
                type="text"
                placeholder={isMobile ? "검색..." : "Search..."}
                className="w-full py-1 sm:py-1.5 pl-7 sm:pl-10 pr-3 sm:pr-4 rounded-full bg-secondary text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* 오른쪽 도구들 */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* 네트워크 상태 - 모바일에서는 숨김 */}
          <div className="hidden md:flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent node-active" />
            <span className="text-sm text-muted-foreground">Testnet</span>
          </div>

          {/* 알림 */}
          <Button
              variant="ghost"
              size={isMobile ? "sm" : "icon"}
              className="text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* 사용자 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarFallback className="bg-secondary text-foreground text-xs sm:text-sm">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 sm:w-56">
              <DropdownMenuLabel className="text-xs sm:text-sm">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs sm:text-sm">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-xs sm:text-sm">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-xs sm:text-sm">Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs sm:text-sm">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  );
}
