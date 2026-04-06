import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const BEFORE_IMG = "https://cdn.poehali.dev/files/fd1ae4e9-54bb-45fc-8313-432f72306ba1.png"
const AFTER_IMG = "https://cdn.poehali.dev/files/a07f25ce-b7bb-4654-8c7c-7716e39c0d6a.png"

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getPos = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); setDragging(true) }
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) getPos(e.clientX) }
  const onTouchMove = (e: React.TouchEvent) => getPos(e.touches[0].clientX)

  useEffect(() => {
    const up = () => setDragging(false)
    window.addEventListener("mouseup", up)
    return () => window.removeEventListener("mouseup", up)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-col-resize select-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* AFTER (base layer) */}
      <img
        src={AFTER_IMG}
        alt="После"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />

      {/* BEFORE (clipped layer) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={BEFORE_IMG}
          alt="До"
          className="absolute inset-0 h-full object-contain"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw" }}
          draggable={false}
        />
      </div>

      {/* Divider line with matrix glow */}
      <div
        className="absolute top-0 bottom-0 w-[2px]"
        style={{
          left: `${pos}%`,
          background: "linear-gradient(to bottom, transparent 0%, #00ff41 30%, #00ff41 70%, transparent 100%)",
          boxShadow: "0 0 12px #00ff41, 0 0 24px #00ff4160"
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-col-resize z-20"
        style={{
          left: `${pos}%`,
          background: "rgba(0,0,0,0.85)",
          border: "2px solid #00ff41",
          boxShadow: "0 0 20px #00ff41, 0 0 40px #00ff4140"
        }}
        onMouseDown={onMouseDown}
        onTouchStart={() => setDragging(true)}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M8 5L3 11L8 17" stroke="#00ff41" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 5L19 11L14 17" stroke="#00ff41" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 text-sm font-bold px-4 py-1.5 rounded-full backdrop-blur-sm tracking-widest text-white/70"
        style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
        ДО
      </div>
      <div className="absolute top-6 right-6 text-sm font-bold px-4 py-1.5 rounded-full backdrop-blur-sm tracking-widest"
        style={{ background: "rgba(0,0,0,0.7)", border: "1px solid #00ff4150", color: "#00ff41", boxShadow: "0 0 10px #00ff4130" }}>
        ПОСЛЕ
      </div>
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
