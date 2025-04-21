"use client"
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Bell, Info, User, Terminal, Server, Archive, Shield, ThumbsUp, Clock, AlertTriangle, Check, X } from "lucide-react";
import NetworkGlobe from "@/app/NetworkGlobe";
import { useState, useEffect } from "react";

export default function Home() {
  // 모바일 뷰 감지를 위한 상태
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 초기 화면 크기 확인
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
      <MainLayout>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Welcome header */}
          <div className="p-4 lg:p-5 mb-2 flex justify-between items-center flex-shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-white">안녕하세요! 👋</h1>
              </div>
              <p className="text-sm text-muted-foreground">NodeOps Cloud에 오신 것을 환영합니다</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-secondary/50">
                <Bell size={18} className="text-muted-foreground" />
              </button>
              <button className="p-2 rounded-full hover:bg-secondary/50">
                <Info size={18} className="text-muted-foreground" />
              </button>
              <button className="p-2 rounded-full hover:bg-secondary/50">
                <User size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Main content area - flex-col on mobile, flex-row on desktop */}
          <div className={`flex flex-1 overflow-hidden px-4 lg:px-5 gap-4 lg:gap-10 
                        ${isMobile ? 'flex-col' : 'flex-row'}`}>
            {/* Left column with stats and network visualization */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Stats cards - fewer columns on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 flex-shrink-0">
                <StatsCard
                    icon={<User className="h-5 w-5 text-muted-foreground" />}
                    value="705,660"
                    label="활성 사용자"
                />
                <StatsCard
                    icon={<Server className="h-5 w-5 text-muted-foreground" />}
                    value="32,621,067"
                    label="NFT 레벨업"
                />
                <StatsCard
                    icon={<Shield className="h-5 w-5 text-muted-foreground" />}
                    value="88,482"
                    label="일치된 기능"
                />
                <StatsCard
                    icon={<Archive className="h-5 w-5 text-muted-foreground" />}
                    value="23,626"
                    label="컨텐츠 장면수"
                />
              </div>

              {/* Network visualization - 더 작은 높이(모바일에서) */}
              <div className="network-graph flex-1 flex items-center justify-center mb-6"
                   style={{ minHeight: isMobile ? '300px' : '400px' }}>
                <NetworkGlobe />
              </div>

              {/* Bottom stats - 모바일에서 2열로 조정 */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 flex-shrink-0">
                <BottomStatsCard
                    icon={<Terminal className="h-5 w-5 text-muted-foreground" />}
                    value="721"
                    label="클라우드 배치"
                />
                <BottomStatsCard
                    icon={<Archive className="h-5 w-5 text-muted-foreground" />}
                    value="14,172"
                    label="데이터"
                    unit="테라"
                />
                <BottomStatsCard
                    icon={<Shield className="h-5 w-5 text-muted-foreground" />}
                    value="5,124"
                    label="CPU"
                    unit="코어"
                />
                <BottomStatsCard
                    icon={<Server className="h-5 w-5 text-muted-foreground" />}
                    value="326,281"
                    label="저장"
                    unit="테라"
                />
              </div>
            </div>

            {/* Right column with task list - 모바일에서 높이 조정 */}
            <div className={`${isMobile ? 'w-full h-96' : 'w-full lg:w-96 h-full'} flex-shrink-0 flex flex-col`}>
              <div className="bg-card rounded-xl border border-border flex flex-col h-full overflow-hidden">
                <h2 className="text-lg font-semibold text-white p-4 flex-shrink-0">테스트</h2>
                <div className="overflow-y-auto flex-1 px-2">
                  <TaskItem
                      icon={<span className="network-node network-u2">U2</span>}
                      title="온바딩 가이드/튜토리얼"
                      info="10개월 전 • 상태미정"
                      isNew
                      status="pending"
                  />
                  <TaskItem
                      icon={<span className="network-node network-og">MS</span>}
                      title="주문입고 수익률 올려보세요"
                      info="1개월 전 • 최신 상태"
                      status="completed"
                  />
                  <TaskItem
                      icon={<span className="network-node network-u2">U2</span>}
                      title="스테이킹 허브 - 지갑 연결"
                      info="10개월 전 • 진행"
                      status="in-progress"
                  />
                  <TaskItem
                      icon={<span className="network-node network-u2">U2</span>}
                      title="네트워크 상태 - 아직 정하 주세기"
                      info="10개월 전 • 진행"
                      status="in-progress"
                  />
                  <TaskItem
                      icon={<span className="network-node network-u2">U2</span>}
                      title="업 네트워크 - 워터드 투스터"
                      info="10개월 전 • 진행"
                      status="in-progress"
                  />
                  <TaskItem
                      icon={<span className="network-node network-el">EL</span>}
                      title="소접 - EigenLayer 중계기"
                      info="5개월 전 • 진행중인"
                      status="in-progress"
                  />
                  <TaskItem
                      icon={<span className="network-node network-og">QN</span>}
                      title="리믹싱 코너스관성 탐험"
                      info="1000년 후 • 종류"
                      status="delayed"
                  />
                  <TaskItem
                      icon={<span className="network-node network-el">GL</span>}
                      title="장큰 노드 배포 - Glacier Network"
                      info="10개월 전 • 진행"
                      status="in-progress"
                  />
                  <TaskItem
                      icon={<span className="network-node network-og">OG</span>}
                      title="DA 노드 배포 - OG"
                      info="12.5 NPs • 진행"
                      status="in-progress"
                  />
                  <TaskItem
                      icon={<span className="network-node network-og">OG</span>}
                      title="소접 - OG 중계"
                      info="5개월 전 • 지연되지 않음"
                      status="completed"
                  />
                  <TaskItem
                      icon={<span className="network-node network-el">ND</span>}
                      title="노드 배포 - 힘을 기울"
                      info="7.5 NPs • 진행"
                      status="in-progress"
                  />
                  {/* 나머지 태스크 아이템들... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
  );
}

type StatsCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

function StatsCard({ icon, value, label }: StatsCardProps) {
  return (
      <Card className="bg-card border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-full bg-secondary">
            {icon}
          </div>
        </div>
        <div>
          {/* 모바일에서 더 작은 텍스트 */}
          <div className="text-xl md:text-2xl font-semibold text-white">{value}</div>
          <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
        </div>
      </Card>
  );
}

type BottomStatsCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  unit?: string;
};

function BottomStatsCard({ icon, value, label, unit }: BottomStatsCardProps) {
  return (
      <Card className="bg-card border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-full bg-secondary">
            {icon}
          </div>
        </div>
        <div>
          {/* 모바일에서 더 작은 텍스트 */}
          <div className="text-xl md:text-2xl font-semibold text-white">{value}</div>
          <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
          {unit && <div className="text-xs text-muted-foreground mt-1">{unit}</div>}
        </div>
      </Card>
  );
}

type TaskItemProps = {
  icon: React.ReactNode;
  title: string;
  info: string;
  isNew?: boolean;
  status?: 'pending' | 'in-progress' | 'completed' | 'delayed' | 'rejected' | 'review' | 'warning';
};

function TaskItem({ icon, title, info, isNew, status }: TaskItemProps) {
  const getStatusIcon = () => {
    switch(status) {
      case 'completed':
        return <Check size={16} className="text-green-400" />;
      case 'in-progress':
        return <Clock size={16} className="text-blue-400" />;
      case 'delayed':
        return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'rejected':
        return <X size={16} className="text-red-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-orange-400" />;
      case 'review':
        return <ThumbsUp size={16} className="text-purple-400" />;
      default:
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        );
    }
  };

  return (
      <div className="flex items-center justify-between p-3 hover:bg-secondary/30 rounded-xl transition-all mb-1">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <div className="text-sm font-medium flex items-center gap-2">
              {title}
              {isNew && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500 text-background whitespace-nowrap">
                새로움
              </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">{info}</div>
          </div>
        </div>
        <div className="text-gray-500">
          {getStatusIcon()}
        </div>
      </div>
  );
}

type NetworkNodeProps = {
  type: 'u2' | 'el' | 'og';
  style?: React.CSSProperties;
  className?: string;
};

function NetworkNode({ type, style, className }: NetworkNodeProps) {
  return (
      <div
          className={`network-node network-${type} node-active ${className || ''}`}
          style={style}
      >
        {type === 'u2' ? 'U2' : type === 'el' ? 'EL' : 'OG'}
      </div>
  );
}
