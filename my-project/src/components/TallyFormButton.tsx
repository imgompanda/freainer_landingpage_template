import { useEffect, useState } from 'react';
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

    return () => {
      document.body.removeChild(script);
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
        onOpen: () => setIsLoading(false),
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
          width: "56px",
          height: "56px",
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-t-2 border-white rounded-full"
          />
        ) : (
          "📅"
        )}
      </Button>
    </div>
  );
}