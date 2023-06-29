import { useEffect } from 'react';

// 커스텀 훅: 외부 스크립트를 동적으로 로드하기 위한 훅
const useScript = (url, onload) => {
  useEffect(() => {
    // 스크립트 엘리먼트 생성
    const script = document.createElement('script');

    // 스크립트 소스 URL 설정
    script.src = url;

    // 스크립트 로드 완료 시 실행할 콜백 함수 설정
    script.onload = onload;

    // 스크립트를 <head> 요소에 추가
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거를 위한 클린업 함수 반환
    return () => {
      document.head.removeChild(script);
    };
  }, [url, onload]);
};

export default useScript;
