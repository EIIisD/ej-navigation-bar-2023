import React from "react"
import { type Story, type StoryDefault } from "@ladle/react"

import { generateBoardingPass, type IBoardingPass } from "@/lib/boarding-pass"
import { Timeline, type TimelineProps } from "@/components/navigation-bar/timeline"

export default {
  meta: { withBg: false, withShade: true },
} satisfies StoryDefault

const Template: Story<TimelineProps> = ({ bp: initialBp }) => {
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
    <>
      <Timeline bp={bp} />
    </>
  )
}

export const Default: Story<TimelineProps> = Template.bind({})
Default.args = {
  bp: generateBoardingPass(),
}
