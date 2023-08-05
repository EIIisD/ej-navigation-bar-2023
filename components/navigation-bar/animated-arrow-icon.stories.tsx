import React from "react"
import { type Story, type StoryDefault } from "@ladle/react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { AnimatedArrowIcon, type AnimatedArrowIconProps } from "@/components/navigation-bar/animated-arrow-icon"

export default {
  meta: { withBg: false },
} satisfies StoryDefault

type AnimatedArrowIconControllerProps = AnimatedArrowIconProps & {
  toggleArrowVisibility?: boolean
}

const AnimatedArrowIconController = ({ className, toggleArrowVisibility, leading }: AnimatedArrowIconControllerProps) => {
  const [showArrow, setShowArrow] = React.useState(toggleArrowVisibility)

  React.useEffect(() => {
    setShowArrow(toggleArrowVisibility)
  }, [toggleArrowVisibility])

  return (
    <>
      <div className="whitespace-nowrap font-mono text-[8px]/none font-normal text-tertiary">{className}</div>
      <button
        type="button"
        onMouseEnter={() => !toggleArrowVisibility && setShowArrow(true)}
        onMouseLeave={() => !toggleArrowVisibility && setShowArrow(false)}
        onFocus={() => !toggleArrowVisibility && setShowArrow(true)}
        onBlur={() => !toggleArrowVisibility && setShowArrow(false)}
        className={cn("-m-3 p-3", className)}
      >
        Animated Arrow Icon <AnimatedArrowIcon show={showArrow} leading={leading} />
      </button>
    </>
  )
}

const Template: Story<AnimatedArrowIconProps> = (args) => {
  const [toggleArrowVisibility, setToggleArrowVisibility] = React.useState(false)

  return (
    <>
      <div className="absolute right-0 top-0 p-6">
        <div className="flex items-center gap-3">
          <Checkbox id="arrowVisibility" checked={toggleArrowVisibility} onCheckedChange={(checked) => setToggleArrowVisibility(!!checked)} />
          <label htmlFor="arrowVisibility" className="cursor-pointer text-secondary">
            Toggle arrow visibility
          </label>
        </div>
      </div>
      <section>
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} {...args} />
      </section>
    </>
  )
}

export const Default: Story = Template.bind({})
Default.args = {
  className: "text-base/6 font-bold",
  leading: "6",
}

export const Leadings: Story = () => {
  const [toggleArrowVisibility, setToggleArrowVisibility] = React.useState(false)

  return (
    <>
      <div className="absolute right-0 top-0 p-6">
        <div className="flex items-center gap-3">
          <Checkbox id="arrowVisibility" checked={toggleArrowVisibility} onCheckedChange={(checked) => setToggleArrowVisibility(!!checked)} />
          <label htmlFor="arrowVisibility" className="cursor-pointer text-secondary">
            Toggle arrow visibility
          </label>
        </div>
      </div>
      <section>
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="3" className="text-xs/3 font-bold" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="4" className="text-xs/4 font-bold" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="5" className="text-sm/5 font-bold" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="6" className="text-base/6 font-bold" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="7" className="text-lg/7 font-bold" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="8" className="text-xl/8 font-bold" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="8" className="text-2xl/8 font-bold" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="9" className="text-3xl/9 font-bold" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="10" className="text-4xl/10 font-bold" />
      </section>
      <section>
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="3" className="text-xs/3" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="4" className="text-xs/4" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="5" className="text-sm/5" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="6" className="text-base/6" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="7" className="text-lg/7" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="8" className="text-xl/8" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="8" className="text-2xl/8" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="9" className="text-3xl/9" />
        <AnimatedArrowIconController toggleArrowVisibility={toggleArrowVisibility} leading="10" className="text-4xl/10" />
      </section>
    </>
  )
}
