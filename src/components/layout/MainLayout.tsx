"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useEffect, useState } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,    // < 768px
    isTablet: false,    // 768px ~ 1023px
    isDesktop: true     // >= 1024px
  });

  useEffect(() => {
    setIsMounted(true);

    // 화면 크기 감지 함수
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
      // 모바일에서는 사이드바 기본적으로 닫기
      if (width < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // 초기 화면 크기 확인
    checkScreenSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);

    // 클린업
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (!isMounted) {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
    );
  }

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="h-screen bg-black text-foreground flex overflow-hidden">
        {/* 사이드바 - 모바일에서는 조건부 렌더링 */}
        <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isMobile={screenSize.isMobile}
            isTablet={screenSize.isTablet}
        />

        {/* 메인 컨텐츠 영역 */}
        <div className={`flex-1 flex flex-col h-full transition-all duration-300
        ${screenSize.isDesktop ? 'pl-80' : screenSize.isTablet ? (isSidebarOpen ? 'pl-64' : 'pl-0') : 'pl-0'}`}>

          {/* 헤더 */}
          <Header
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              isMobile={screenSize.isMobile}
              isTablet={screenSize.isTablet}
          />

          {/* 메인 컨텐츠 */}
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
  );
}
