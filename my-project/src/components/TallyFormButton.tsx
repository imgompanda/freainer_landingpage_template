import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

declare global {
  interface Window {
    Tally: {
      openPopup: (formId: string, options?: any) => void;
    };
  }
}

export default function TallyFormButton() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // CSS를 추가하여 Tally 로더를 숨깁니다. !important를 사용하여 우선순위를 높입니다.
    const style = document.createElement("style");
    style.textContent = `
      .tally-loader, .tally-overlay {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);

    // JavaScript를 사용하여 로딩 요소를 직접 제거합니다.
    const removeLoader = () => {
      const loader = document.querySelector(".tally-loader");
      const overlay = document.querySelector(".tally-overlay");
      if (loader) loader.remove();
      if (overlay) overlay.remove();
    };

    // MutationObserver를 사용하여 동적으로 추가되는 요소를 감시합니다.
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          removeLoader();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  const openTallyPopup = () => {
    setIsLoading(true);
    if (window.Tally) {
      window.Tally.openPopup("wb8xN2", {
        width: 400,
        autoClose: 5000,
        layout: "default",
        alignLeft: false,
        hideTitle: true,
        overlay: false,
        emoji: {
          text: "📅",
          animation: "none",
        },
        position: {
          x: "right",
          y: "bottom",
        },
        onOpen: () => {
          setIsLoading(false);
          // 팝업이 열린 후에도 로더를 제거합니다.
          setTimeout(() => {
            const loader = document.querySelector(".tally-loader");
            const overlay = document.querySelector(".tally-overlay");
            if (loader) loader.remove();
            if (overlay) overlay.remove();
          }, 100);
        },
        hideLoadingIndicator: true,
        customCSS: `
          .tally-loader, .tally-overlay {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
          }
        `,
      });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 10000,
      }}
    >
      <Button
        id="reservation-button"
        className="bg-black text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-gray-800 transition-colors duration-200"
        onClick={openTallyPopup}
        style={{
          width: "64px", // 버튼 크기를 조금 더 크게 조정
          height: "64px",
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-t-2 border-white rounded-full" // 로딩 애니메이션 크기 조정
          />
        ) : (
          "📅"
        )}
      </Button>
    </div>
  );
}
