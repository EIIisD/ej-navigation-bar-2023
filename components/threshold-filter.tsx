"use client"

import React from "react"

interface ThresholdFilterProps {
  id: string
  strength: number // Between 0 and 1
  blur: number // The amount of blur for antialiasing, typically small (e.g., 1 to 3)
}

const ThresholdFilter: React.FC<ThresholdFilterProps> = ({ id, strength, blur }) => {
  const tableValues = `${1 - strength} ${strength}`
  return (
    <svg style={{ width: 0, height: 0, position: "absolute" }}>
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feComponentTransfer in="blur">
            <feFuncR type="discrete" tableValues={tableValues}></feFuncR>
            <feFuncG type="discrete" tableValues={tableValues}></feFuncG>
            <feFuncB type="discrete" tableValues={tableValues}></feFuncB>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation={-blur} />
        </filter>
      </defs>
    </svg>
  )
}

export default ThresholdFilter
