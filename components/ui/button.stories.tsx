import React from "react"
import { type Story, type StoryDefault } from "@ladle/react"

import { Button, type ButtonProps } from "@/components/ui/button"

export default {} satisfies StoryDefault

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default: Story = Template.bind({})
Default.args = {
  children: "Button",
}

const ExampleIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
)

export const FocusStyles: Story = () => {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <>
      <div className="relative flex h-full w-full items-center justify-center border border-black py-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full bg-white" />
          <div className="h-full w-4 bg-gray-200" />
          <div className="h-full w-full bg-orange" />
        </div>
        <div className="relative flex flex-col items-center justify-center gap-3">
          <>
            <Button size="default" variant="default" ref={ref}>
              Default Default
            </Button>
            <Button size="default" variant="outline">
              Default Outline
            </Button>
            <Button size="default" variant="ghost">
              Default Ghost
            </Button>
          </>
          <div className="h-12" />
          <>
            <Button size="sm" variant="default">
              Small Default
            </Button>
            <Button size="sm" variant="outline">
              Small Outline
            </Button>
            <Button size="sm" variant="ghost">
              Small Ghost
            </Button>
          </>
          <div className="h-12" />
          <>
            <Button size="lg" variant="default">
              Large Default
            </Button>
            <Button size="lg" variant="outline">
              Large Outline
            </Button>
            <Button size="lg" variant="ghost">
              Large Ghost
            </Button>
          </>
          <div className="h-12" />
          <>
            <Button size="icon" variant="default">
              <ExampleIcon />
            </Button>
            <Button size="icon" variant="outline">
              <ExampleIcon />
            </Button>
            <Button size="icon" variant="ghost">
              <ExampleIcon />
            </Button>
          </>
        </div>
      </div>
    </>
  )
}

export const Variants: Story = () => (
  <>
    <Button variant="default">Default</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
  </>
)

export const Sizes: Story = () => (
  <>
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
      <ExampleIcon />
    </Button>
  </>
)
