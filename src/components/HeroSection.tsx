import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const BEFORE_IMG = "https://cdn.poehali.dev/files/fd1ae4e9-54bb-45fc-8313-432f72306ba1.png"
const AFTER_IMG = "https://cdn.poehali.dev/files/a07f25ce-b7bb-4654-8c7c-7716e39c0d6a.png"

// Анимированная полоска прогресса — сколько осталось до следующего переключения
function ProgressBar({ duration, running }: { duration: number; running: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30">
      <div
        key={running ? "run" : "pause"}
        className="h-full"
        style={{
          background: "linear-gradient(to right, #00ff41, #00cc33)",
          boxShadow: "0 0 8px #00ff41",
          animation: running ? `progress-fill ${duration}ms linear forwards` : "none",
          width: running ? undefined : "0%",
        }}
      />
    </div>
  )
}

function BeforeAfterSlider() {
  const [showAfter, setShowAfter] = useState(false)
  const DURATION = 3500

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAfter(prev => !prev)
    }, DURATION)
    return () => clearInterval(interval)
  }, [])

  const switchTo = (after: boolean) => {
    if (after !== showAfter) setShowAfter(after)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* AFTER — base layer (always visible beneath) */}
      <img
        src={AFTER_IMG}
        alt="После"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />

      {/* BEFORE — slides out to the right when showAfter=true */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: showAfter ? "translateX(100%)" : "translateX(0%)",
          transition: "transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >
        <img
          src={BEFORE_IMG}
          alt="До"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            transform: showAfter ? "translateX(-30%)" : "translateX(0%)",
            transition: "transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
          draggable={false}
        />
      </div>

      {/* Glowing edge that travels with the curtain */}
      <div
        className="absolute top-0 bottom-0 w-[3px] z-20 pointer-events-none"
        style={{
          right: 0,
          background: "linear-gradient(to bottom, transparent, #00ff41 30%, #00ff41 70%, transparent)",
          boxShadow: "0 0 16px #00ff41, 0 0 32px #00ff4170",
          transform: showAfter ? "translateX(100%)" : "translateX(0%)",
          transition: "transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)",
          transformOrigin: "right",
        }}
      />

      {/* Label top-center */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 text-xs font-bold px-5 py-1.5 rounded-full tracking-[0.25em] z-20 pointer-events-none transition-all duration-500"
        style={{
          background: showAfter ? "rgba(0,255,65,0.12)" : "rgba(255,255,255,0.08)",
          border: showAfter ? "1px solid #00ff4160" : "1px solid rgba(255,255,255,0.18)",
          color: showAfter ? "#00ff41" : "rgba(255,255,255,0.75)",
          boxShadow: showAfter ? "0 0 12px #00ff4130" : "none",
          backdropFilter: "blur(8px)",
        }}
      >
        {showAfter ? "ПОСЛЕ" : "ДО"}
      </div>

      {/* Toggle buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {([false, true] as const).map((isAfter) => (
          <button
            key={String(isAfter)}
            onClick={() => switchTo(isAfter)}
            className="px-5 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300"
            style={{
              background: showAfter === isAfter
                ? isAfter ? "rgba(0,255,65,0.18)" : "rgba(255,255,255,0.14)"
                : "rgba(0,0,0,0.45)",
              border: showAfter === isAfter
                ? isAfter ? "1px solid #00ff4165" : "1px solid rgba(255,255,255,0.45)"
                : "1px solid rgba(255,255,255,0.12)",
              color: showAfter === isAfter
                ? isAfter ? "#00ff41" : "white"
                : "rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
              boxShadow: (showAfter === isAfter && isAfter) ? "0 0 10px #00ff4135" : "none",
            }}
          >
            {isAfter ? "ПОСЛЕ" : "ДО"}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <ProgressBar duration={DURATION} running={true} />
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex overflow-hidden bg-black">
      {/* Full-screen before/after slider */}
      <BeforeAfterSlider />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.35) 100%)" }}
      />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 animate-fade-in-up"
                style={{ background: "rgba(0,255,65,0.08)", border: "1px solid rgba(0,255,65,0.3)" }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#00ff41" }} />
                <span className="text-xs font-medium" style={{ color: "#00ff41" }}>Веб-студия полного цикла</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 animate-fade-in-up text-white">
                Сайты, которые{" "}
                <span className="relative inline-block" style={{ color: "#00ff41", textShadow: "0 0 30px #00ff4180" }}>
                  продают
                  <svg className="absolute -bottom-1 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none">
                    <path d="M2 8C50 3 150 3 198 8" stroke="#00ff41" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/50 max-w-xl animate-fade-in-up animate-delay-100 leading-relaxed">
                Разрабатываем сайты полного цикла, которые привлекают клиентов и увеличивают вашу выручку.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up animate-delay-200 shrink-0">
              <Button
                size="lg"
                className="font-semibold px-7 py-5 text-base group transition-all text-black hover:text-black hover:opacity-90"
                style={{ background: "#00ff41", boxShadow: "0 0 20px #00ff4160" }}
                asChild
              >
                <a href="#contact">
                  Получить сайт
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-7 py-5 text-base bg-black/50 backdrop-blur-sm text-white hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                asChild
              >
                <a href="#portfolio">Наши работы</a>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-5 text-sm text-white/40 animate-fade-in-up animate-delay-300">
            {["50+ проектов", "45+ довольных клиентов", "Рост продаж у 90% клиентов"].map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41", animationDelay: `${i * 0.4}s` }} />
                <span>{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}