import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Code2, Palette } from "lucide-react"
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

  const onMouseDown = () => setDragging(true)
  const onMouseUp = () => setDragging(false)
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
      className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden cursor-col-resize select-none shadow-2xl border border-primary/20"
      style={{ aspectRatio: "1/1" }}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* AFTER (bottom layer) */}
      <img src={AFTER_IMG} alt="После" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* BEFORE (clipped top layer) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={BEFORE_IMG} alt="До" className="absolute inset-0 h-full object-cover" style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }} draggable={false} />
      </div>

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }} />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize z-10 border-2 border-primary/30"
        style={{ left: `${pos}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => setDragging(true)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 5L17 10L13 15" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">ДО</div>
      <div className="absolute top-3 right-3 bg-primary/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">ПОСЛЕ</div>
    </div>
  )
}

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-muted/40 blur-3xl animate-pulse" style={{ top: "20%", left: "10%", animationDuration: "4s" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-muted/30 blur-3xl animate-pulse" style={{ bottom: "10%", right: "15%", animationDuration: "6s", animationDelay: "1s" }} />
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-muted/20 blur-3xl transition-all duration-1000 ease-out"
          style={{ left: `${mousePosition.x - 150}px`, top: `${mousePosition.y - 150}px` }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <Code2 className="absolute text-muted-foreground/30 animate-float" style={{ top: "15%", left: "5%", animationDelay: "0s" }} size={40} />
        <Palette className="absolute text-muted-foreground/30 animate-float" style={{ top: "25%", right: "5%", animationDelay: "2s" }} size={35} />
        <Sparkles className="absolute text-muted-foreground/30 animate-float" style={{ bottom: "20%", left: "8%", animationDelay: "1s" }} size={30} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Веб-студия полного цикла</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up text-balance">
              Сайты, которые{" "}
              <span className="text-primary relative inline-block">
                продают
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 5 150 5 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl animate-fade-in-up animate-delay-100 leading-relaxed">
              Разрабатываем сайты полного цикла, которые привлекают клиентов и увеличивают вашу выручку. От идеи до результата.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in-up animate-delay-200 mb-10">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                asChild
              >
                <a href="#contact">
                  Получить сайт
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary font-semibold px-8 py-6 text-lg backdrop-blur-sm bg-transparent"
                asChild
              >
                <a href="#portfolio">Наши работы</a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-muted-foreground animate-fade-in-up animate-delay-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>50+ проектов</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.5s" }} />
                <span>45+ довольных клиентов</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "1s" }} />
                <span>Рост продаж у 90% клиентов</span>
              </div>
            </div>
          </div>

          {/* Right: before/after slider */}
          <div className="flex-1 w-full max-w-lg animate-fade-in-up animate-delay-200">
            <p className="text-center text-sm text-muted-foreground mb-3">Потяните ползунок, чтобы увидеть разницу</p>
            <BeforeAfterSlider />
          </div>
        </div>
      </div>
    </section>
  )
}
