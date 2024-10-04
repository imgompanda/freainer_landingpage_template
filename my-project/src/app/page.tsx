"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Code, Brain, Zap } from "lucide-react";
import Script from "next/script";
import TallyFormButton from "@/components/TallyFormButton";

declare global {
  interface Window {
    Tally: {
      openPopup: (formId: string, options?: any) => void;
    };
  }
}

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Cursor와 친해지기",
      description:
        "복잡해 보이던 코드 작성도 이제 두렵지 않아요! Cursor의 기본 사용법을 익히며, AI와 함께 빠르게 적응할 수 있어요.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "효율적인 작업 흐름 만들기",
      description:
        "제작과 디버깅을 분리해서 시간을 절약하고, 더 깔끔하게 프로젝트를 진행하는 법을 배워요.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI에게 똑똑하게 질문하기",
      description:
        "AI를 제대로 활용하려면 명령을 잘 작성하는 법도 중요죠. Cursor에서 AI에게 효과적으로 질문하고 원하는 답을 얻는 방법을 익혀요.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "오류 없는 프로젝트 관리",
      description:
        "Requirements.md 기법을 통해 프로젝트의 일관성을 유지하고, 체계적인 관리 방법을 터득해요.",
    },
  ];

  const steps = [
    "아이디어 구상",
    "Cursor로 코드 작성",
    "AI와 협업",
    "디버깅 및 최적화",
    "완성된 프로젝트",
  ];

  const testimonials = [
    {
      name: "Lucy",
      age: 28,
      job: "외국계 기업 사무직",
      avatar: "L",
      quote:
        "코딩과 전혀 관련 없는 업무를 하고 평생 코딩의 '코' 자도 몰랐는데, 커서 바이블을 읽고 프로젝트를 만들어보니 정말 쉽고 간편하게 웹사이트를 만들 수 있었어요! 개발에 대한 두려움이 사라졌습니다.",
    },
    {
      name: "David",
      age: 32,
      job: "백엔드 개발자",
      avatar: "D",
      quote:
        "백엔드 개발자라서 프론트엔드 작업에는 늘 어려움이 있었는데, 커서 바이블 덕분에 제가 상상하는 디자인을 구현할 수 있게 됐어요. 이제는 AI를 통해 UI/UX 개발도 더 자 있게 할 수 있습니다.",
    },
    {
      name: "Sophia",
      age: 25,
      job: "프리랜서 디자이너",
      avatar: "S",
      quote:
        "디자인 작업을 주로 하다 보니 발 쪽은 손도 못 대고 있었어요. 하지만 커서 바이블을 통해 AI 코드 에디터를 활용하는 방법을 배우면서, 제 디자인을 바로 코드로 전환할 수 있게 되었고, 직접 웹페이지를 만들 수 있어 큰 도움이 됐습니다!",
    },
  ];

  return (
    <>
      <div ref={targetRef} className="min-h-screen bg-white text-black relative">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-black z-50"
          style={{ scaleX: smoothProgress }}
        />

        <header className="min-h-screen flex flex-col justify-center items-center px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            아이디어를 서비스로 바꾸는 비밀 – 커서 바이블
          </h1>
          <p className="text-xl text-center text-gray-600 mb-8">
            지금 예약하면 50% 할인! 여러분의 아이디어를 실현할 절호의 기회!
          </p>
          <Button
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => {
              const reservationButton =
                document.getElementById("reservation-button");
              if (reservationButton) {
                reservationButton.click();
              }
            }}
          >
            지금 예약하기
          </Button>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="mb-16">
            <motion.h2
              style={{
                opacity: useTransform(smoothProgress, [0.1, 0.2], [0, 1]),
                y: useTransform(smoothProgress, [0.1, 0.2], [50, 0]),
              }}
              className="text-3xl font-semibold mb-6 text-center"
            >
              커서 바이블로 무엇을 배우나요?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [0.2 + index * 0.05, 0.3 + index * 0.05],
                      [0, 1]
                    ),
                    x: useTransform(
                      smoothProgress,
                      [0.2 + index * 0.05, 0.3 + index * 0.05],
                      [index % 2 === 0 ? -50 : 50, 0]
                    ),
                  }}
                >
                  <Card className="h-full border-2 border-black">
                    <CardContent className="flex flex-col items-start p-6 h-full">
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <motion.h2
              style={{
                opacity: useTransform(smoothProgress, [0.4, 0.5], [0, 1]),
                y: useTransform(smoothProgress, [0.4, 0.5], [50, 0]),
              }}
              className="text-3xl font-semibold mb-6 text-center"
            >
              Cursor로 아이디어를 현실로
            </motion.h2>
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.45, 0.55], [0, 1]),
                scale: useTransform(smoothProgress, [0.45, 0.55], [0.9, 1]),
              }}
              className="bg-gray-100 p-8 rounded-lg shadow-lg"
            >
              <div className="flex justify-between mb-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    style={{
                      opacity: useTransform(
                        smoothProgress,
                        [0.5 + index * 0.02, 0.6 + index * 0.02],
                        [0, 1]
                      ),
                      y: useTransform(
                        smoothProgress,
                        [0.5 + index * 0.02, 0.6 + index * 0.02],
                        [20, 0]
                      ),
                    }}
                    className="text-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-black mx-auto mb-2"></div>
                    <p className="text-sm">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="mb-16">
            <motion.h2
              style={{
                opacity: useTransform(smoothProgress, [0.6, 0.7], [0, 1]),
                y: useTransform(smoothProgress, [0.6, 0.7], [50, 0]),
              }}
              className="text-3xl font-semibold mb-6 text-center"
            >
              사용자 후기
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [0.65 + index * 0.05, 0.75 + index * 0.05],
                      [0, 1]
                    ),
                    rotateY: useTransform(
                      smoothProgress,
                      [0.65 + index * 0.05, 0.75 + index * 0.05],
                      [90, 0]
                    ),
                  }}
                >
                  <Card className="border-2 border-black h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="w-12 h-12 mr-4">
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">
                            {testimonial.name}, {testimonial.age}세
                          </h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.job}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <motion.h2
              style={{
                opacity: useTransform(smoothProgress, [0.8, 0.9], [0, 1]),
                y: useTransform(smoothProgress, [0.8, 0.9], [50, 0]),
              }}
              className="text-3xl font-semibold mb-6 text-center"
            >
              지금 바로 예약하세요
            </motion.h2>
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.85, 0.95], [0, 1]),
                scale: useTransform(smoothProgress, [0.85, 0.95], [0.9, 1]),
              }}
              className="max-w-md mx-auto"
            >
              <Button
                className="w-full bg-black text-white hover:bg-gray-800"
                onClick={() => {
                  const reservationButton =
                    document.getElementById("reservation-button");
                  if (reservationButton) {
                    reservationButton.click();
                  }
                }}
              >
                지금 예약하고 50% 할인받기
              </Button>
            </motion.div>
          </section>
        </main>

        <footer className="bg-black text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 커서 바이블. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <TallyFormButton />
    </>
  );
}