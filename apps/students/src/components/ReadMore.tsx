"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ReadMoreProps {
  children: React.ReactNode
  previewLines?: number
  label?: string
  collapseLabel?: string
}

export default function ReadMore({
  children,
  previewLines = 3,
  label = "Read more",
  collapseLabel = "Show less",
}: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [collapsedHeight, setCollapsedHeight] = useState<number>(0)
  const [isClamped, setIsClamped] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Measure the collapsed height (n lines) and full height to determine if clamping is needed
  useEffect(() => {
    const el = innerRef.current
    if (!el || !isMobile) {
      setIsClamped(false)
      return
    }

    // Measure line height from the element
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24
    const preview = lineHeight * previewLines

    setCollapsedHeight(preview)
    setIsClamped(el.scrollHeight > preview + 4)
  }, [isMobile, previewLines, children])

  // On desktop — just render children normally
  if (!isMobile) {
    return <div>{children}</div>
  }

  return (
    <div className="read-more-wrapper">
      <motion.div
        animate={{ height: expanded || !isClamped ? "auto" : collapsedHeight }}
        initial={false}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div ref={innerRef}>{children}</div>
      </motion.div>

      {/* Fade-out gradient when collapsed */}
      <AnimatePresence>
        {!expanded && isClamped && (
          <motion.div
            key="fade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: -32,
              height: 32,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {isClamped && (
        <motion.button
          onClick={() => setExpanded((prev) => !prev)}
          className="read-more-btn"
          aria-expanded={expanded}
          whileTap={{ scale: 0.96 }}
        >
          <motion.span
            key={expanded ? "less" : "more"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {expanded ? collapseLabel : label}
          </motion.span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ flexShrink: 0 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.button>
      )}

      <style>{`
        .read-more-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .read-more-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #E8A020;
          font-family: inherit;
          width: fit-content;
          transition: opacity 0.15s ease;
        }

        .read-more-btn:hover {
          opacity: 0.75;
        }
      `}</style>
    </div>
  )
}
