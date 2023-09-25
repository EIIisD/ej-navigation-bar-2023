import React from "react"
import { type Story, type StoryDefault } from "@ladle/react"

import { generateBoardingPass, type IBoardingPass } from "@/lib/boarding-pass"
import { Hero, type HeroProps } from "@/components/boarding-pass/archive/hero"

export default {
  meta: { withBg: false, fullWidth: true },
} satisfies StoryDefault

const Template: Story<HeroProps> = ({ bp: initialBp }) => {
  const [bp, setBp] = React.useState<IBoardingPass>(initialBp)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "e") {
        setBp(generateBoardingPass())
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="w-full">
      <Hero bp={bp} />
    </div>
  )
}

export const Default: Story<HeroProps> = Template.bind({})
Default.args = {
  bp: generateBoardingPass(),
}
