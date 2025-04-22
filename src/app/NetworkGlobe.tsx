"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { X } from 'lucide-react';

// 노드 데이터를 확장하여 모달에 표시할 정보 추가
const nodesData = [
  { id: 1, type: 'u2', label: 'U2', position: [2.5, 1.5, 1.5], color: 0xFFE500, title: "온바딩 가이드/튜토리얼", np: 5, info: "지역 사회" },
  { id: 2, type: 'og', label: 'MS', position: [2.7, 1.0, -1.0], color: 0xFF0066, title: "주문입고 수익률 올려보세요", np: 8, info: "네트워크 참여" },
  { id: 3, type: 'og', label: 'OG', position: [1.0, -1.5, 2.5], color: 0xFF0066, title: "DA 노드 배포 - OG", np: 12.5, info: "진행중" },
  { id: 4, type: 'el', label: 'EL', position: [-1.0, 2.7, 1.0], color: 0x22DDAA, title: "소접 - EigenLayer 중계기", np: 7, info: "진행중인" },
  { id: 5, type: 'u2', label: 'U2', position: [-2.0, -1.5, 1.5], color: 0xFFE500, title: "네트워크 업그레이드 V2.1", np: 6, info: "대기 중" },
  { id: 6, type: 'og', label: 'QN', position: [1.5, -2.5, -1.0], color: 0xFF0066, title: "리믹싱 코너스관성 탐험", np: 9, info: "종류" },
  { id: 7, type: 'el', label: 'GL', position: [-2.5, 0.5, -1.5], color: 0x22DDAA, title: "장큰 노드 배포 - Glacier Network", np: 10, info: "진행중" },
  { id: 8, type: 'u2', label: 'U2', position: [0.5, 1.5, -2.7], color: 0xFFE500, title: "스테이킹 허브 - 지갑 연결", np: 4, info: "진행" },
  { id: 9, type: 'og', label: 'OG', position: [-1.5, -2.0, -1.5], color: 0xFF0066, title: "소접 - OG 중계", np: 7.5, info: "지연되지 않음" },
  { id: 10, type: 'el', label: 'ND', position: [1.0, 2.0, 2.0], color: 0x22DDAA, title: "노드 배포 - 힘을 기울", np: 7.5, info: "진행" }
];

// 모달 컴포넌트
const NodeModal = ({ node, onClose, isMobile }) => {
  if (!node) return null;

  return (
      <div
          className={`fixed inset-0 z-50 flex ${isMobile ? 'items-end' : 'items-start justify-end'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div
            className={`bg-black overflow-y-auto animate-slide-in
                    ${isMobile
                ? 'w-full h-3/4 rounded-t-xl border-t'
                : 'w-96 h-full border-l'} 
                    border-gray-800`}
            onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">소셜 - {node.title} 중책기</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-800">
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-400 mb-6">{node.title}의 보고서를 널리 알리세요</p>
            <div className="flex items-center gap-2 mb-2 text-green-500">
              <span>+</span>
              <span>{node.np}개의 NP</span>
              <span>•</span>
              <span>{node.info}</span>
            </div>

            {/* 가상의 콘텐츠 영역 */}
            <div className="space-y-4 mt-6">
              <div className="h-20 bg-gray-800 rounded-md animate-pulse"></div>
              <div className="h-20 bg-gray-800 rounded-md animate-pulse"></div>
              <div className="h-20 bg-gray-800 rounded-md animate-pulse"></div>
              <div className="h-20 bg-gray-800 rounded-md animate-pulse"></div>
              <div className="h-20 bg-gray-800 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
  );
};

function NetworkGlobe() {
  const mountRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // 반응형 처리를 위한 화면 크기 감지
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // 초기 모바일 여부 확인
    checkMobile();

    // 윈도우 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [checkMobile]);

  useEffect(() => {
    if (!mountRef.current) return;

    // 컨테이너 크기 가져오기
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 400; // 기본 높이 설정

    // 씬, 카메라, 렌더러 설정
    const scene = new THREE.Scene();

    // 화면 크기에 따라 카메라 파라미터 조정
    const fov = isMobile ? 90 : 75;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    // 모바일에서는 조금 더 멀리서 보기
    camera.position.z = isMobile ? 7 : 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = ''; // 기존 요소 제거
    container.appendChild(renderer.domElement);

    // 지구본 생성 (모바일에서는 조금 더 작게)
    const globeRadius = isMobile ? 2.5 : 3;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x222222,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // 점들의 위치를 저장할 배열 생성
    const dotsGeometry = new THREE.BufferGeometry();
    const dotsCount = isMobile ? 1000 : 2000; // 모바일에서는 점 개수 줄이기
    const positions = new Float32Array(dotsCount * 3);

    // 지구본 위에 점들을 랜덤하게 배치
    for (let i = 0; i < dotsCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotsCount);
      const theta = Math.sqrt(dotsCount * Math.PI) * phi;

      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    dotsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const dotsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.03 : 0.02,
      color: 0xaaff00
    });

    const dots = new THREE.Points(dotsGeometry, dotsMaterial);
    scene.add(dots);

    // 노드 크기 조정 (모바일에서는 더 크게)
    const nodeSize = isMobile ? 0.18 : 0.15;

    // 노드 생성 및 참조 저장
    const nodeMeshes = nodesData.map(nodeData => {
      const nodeGeometry = new THREE.SphereGeometry(nodeSize, 16, 16);
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: nodeData.color });
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);

      // 위치 조정 (모바일에서는 비율 조정)
      const scale = isMobile ? globeRadius / 3 : globeRadius / 3;
      nodeMesh.position.set(
          nodeData.position[0] * scale,
          nodeData.position[1] * scale,
          nodeData.position[2] * scale
      );

      nodeMesh.userData = nodeData; // 노드 데이터 저장
      scene.add(nodeMesh);

      return nodeMesh;
    });

    // 레이캐스터 설정 (클릭 감지용)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 마우스 클릭 이벤트 리스너 (수정된 부분)
    const handleClick = (event) => {
      // 이벤트 타입 확인 및 안전한 값 추출
      let clientX, clientY;

      // 터치 이벤트인 경우
      if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }
      // 마우스 이벤트인 경우
      else if (event.clientX !== undefined && event.clientY !== undefined) {
        clientX = event.clientX;
        clientY = event.clientY;
      }
      // 유효한 좌표가 없는 경우 종료
      else {
        return;
      }

      // 마우스/터치 위치 계산 (정규화된 장치 좌표)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;

      // 레이캐스터 설정 및 교차 객체 확인
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const clickedNode = intersects[0].object;
        setSelectedNode(clickedNode.userData);
      }
    };

    // 마우스/터치 인터랙션 변수
    let isPointerDown = false;
    let pointerX = 0;
    let pointerY = 0;
    let rotationSpeed = isMobile ? 0.001 : 0.002; // 모바일에서는 회전 속도 조정
    let autoRotate = true;
    let isDragging = false;

    // 포인터 이벤트 리스너 (수정된 부분)
    const handlePointerDown = (event) => {
      isPointerDown = true;

      // 이벤트 타입 확인 및 안전한 값 추출
      let clientX, clientY;

      // 터치 이벤트인 경우
      if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }
      // 마우스 이벤트인 경우
      else if (event.clientX !== undefined && event.clientY !== undefined) {
        clientX = event.clientX;
        clientY = event.clientY;
      }
      // 유효한 좌표가 없는 경우 종료
      else {
        return;
      }

      pointerX = clientX;
      pointerY = clientY;
      autoRotate = false;
      isDragging = false; // 드래그 시작 시 초기화
    };

    const handlePointerUp = (event) => {
      if (!isDragging) {
        // 드래그하지 않고 단순 클릭/탭한 경우에만 클릭 이벤트 처리
        handleClick(event);
      }

      isPointerDown = false;
      setTimeout(() => {
        autoRotate = true;
      }, 3000); // 3초 후 자동 회전 다시 시작
    };

    const handlePointerMove = (event) => {
      if (!isPointerDown) return;

      // 이벤트 타입 확인 및 안전한 값 추출
      let clientX, clientY;

      // 터치 이벤트인 경우
      if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }
      // 마우스 이벤트인 경우
      else if (event.clientX !== undefined && event.clientY !== undefined) {
        clientX = event.clientX;
        clientY = event.clientY;
      }
      // 유효한 좌표가 없는 경우 종료
      else {
        return;
      }

      const deltaX = clientX - pointerX;
      const deltaY = clientY - pointerY;

      // 작은 움직임이라도 드래그로 간주
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        isDragging = true;
      }

      // 모바일에서는 회전 감도 조정
      const sensitivity = isMobile ? 0.007 : 0.005;

      globe.rotation.y += deltaX * sensitivity;
      globe.rotation.x += deltaY * sensitivity;

      // 점들과 노드들도 함께 회전
      dots.rotation.y = globe.rotation.y;
      dots.rotation.x = globe.rotation.x;

      nodeMeshes.forEach(node => {
        // 구의 중심을 기준으로 회전
        node.position.applyEuler(new THREE.Euler(deltaY * sensitivity, deltaX * sensitivity, 0));
      });

      pointerX = clientX;
      pointerY = clientY;
    };

    // 터치 이벤트 핸들러에서 preventDefault 추가
    const preventDefaultTouch = (e) => {
      e.preventDefault();
    };

    // 데스크탑 이벤트
    renderer.domElement.addEventListener('mousedown', handlePointerDown);
    renderer.domElement.addEventListener('mouseup', handlePointerUp);
    renderer.domElement.addEventListener('mousemove', handlePointerMove);

    // 모바일 터치 이벤트
    renderer.domElement.addEventListener('touchstart', handlePointerDown, { passive: false });
    renderer.domElement.addEventListener('touchend', handlePointerUp);
    renderer.domElement.addEventListener('touchmove', handlePointerMove, { passive: false });

    // 스크롤 방지 (모바일)
    renderer.domElement.addEventListener('touchmove', preventDefaultTouch, { passive: false });

    // 창 크기 조절 이벤트 리스너
    const handleResize = () => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight || 400;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 애니메이션 루프
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 자동 회전
      if (autoRotate) {
        globe.rotation.y += rotationSpeed;
        dots.rotation.y = globe.rotation.y;

        // 노드들도 같이 회전
        nodeMeshes.forEach(node => {
          node.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationSpeed);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener('resize', handleResize);

      // 데스크탑 이벤트 제거
      renderer.domElement.removeEventListener('mousedown', handlePointerDown);
      renderer.domElement.removeEventListener('mouseup', handlePointerUp);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);

      // 모바일 터치 이벤트 제거
      renderer.domElement.removeEventListener('touchstart', handlePointerDown);
      renderer.domElement.removeEventListener('touchend', handlePointerUp);
      renderer.domElement.removeEventListener('touchmove', handlePointerMove);
      renderer.domElement.removeEventListener('touchmove', preventDefaultTouch);

      cancelAnimationFrame(animationId);

      // DOM에서 캔버스 제거
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // 메모리 해제
      globeGeometry.dispose();
      globeMaterial.dispose();
      dotsGeometry.dispose();
      dotsMaterial.dispose();

      nodeMeshes.forEach(node => {
        node.geometry.dispose();
        node.material.dispose();
      });

      renderer.dispose();
    };
  }, [isMobile]); // isMobile이 변경될 때마다 다시 생성

  return (
      <>
        <div
            ref={mountRef}
            className="w-full h-full"
            style={{
              minHeight: isMobile ? '300px' : '400px',
              touchAction: 'none' // 모바일에서 스크롤 방지
            }}
        />

        {/* 모달 컴포넌트 */}
        {selectedNode && (
            <NodeModal
                node={selectedNode}
                onClose={() => setSelectedNode(null)}
                isMobile={isMobile}
            />
        )}
      </>
  );
}

export default NetworkGlobe;
