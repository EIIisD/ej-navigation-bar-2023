import React from "react"
import { type Story, type StoryDefault } from "@ladle/react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Icon } from "@/components/icon"

export default {} satisfies StoryDefault

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default: Story = Template.bind({})
Default.args = {
  children: "Button",
}

const SectionsContainer: React.FC<React.PropsWithChildren & { withBg?: boolean }> = ({ children, withBg }) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center border border-black py-4">
      {withBg && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full bg-white" />
          <div className="h-full w-4 bg-gray-200" />
          <div className="h-full w-full bg-orange" />
        </div>
      )}
      <div className="relative flex flex-col items-center justify-center gap-12 py-12 [&>section]:flex [&>section]:flex-col [&>section]:items-center [&>section]:justify-center [&>section]:gap-3">
        {children}
      </div>
    </div>
  )
}

export const Variants: Story = () => {
  return (
    <SectionsContainer withBg>
      <section>
        <Button size="sm" mode="default" autoFocus>
          Small Default
        </Button>
        <Button size="sm" mode="outline">
          Small Outline
        </Button>
        <Button size="sm" mode="ghost">
          Small Ghost
        </Button>
      </section>
      <section>
        <Button size="default" mode="default">
          Default Default
        </Button>
        <Button size="default" mode="outline">
          Default Outline
        </Button>
        <Button size="default" mode="ghost">
          Default Ghost
        </Button>
      </section>
      <section>
        <Button size="lg" mode="default">
          Large Default
        </Button>
        <Button size="lg" mode="outline">
          Large Outline
        </Button>
        <Button size="lg" mode="ghost">
          Large Ghost
        </Button>
      </section>
      <section>
        <Button size="sm" mode="default" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
        <Button size="sm" mode="outline" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
        <Button size="sm" mode="ghost" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
      </section>
      <section>
        <Button size="default" mode="default" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
        <Button size="default" mode="outline" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
        <Button size="default" mode="ghost" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
      </section>
      <section>
        <Button size="lg" mode="default" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
        <Button size="lg" mode="outline" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
        <Button size="lg" mode="ghost" variant="icon">
          <Icon name="arrowRight" className="aspect-square h-6 w-auto" />
        </Button>
      </section>
    </SectionsContainer>
  )
}

export const Modes: Story = () => (
  <SectionsContainer withBg>
    <section>
      <Button mode="default" autoFocus>
        Default
      </Button>
      <Button mode="outline">Outline</Button>
      <Button mode="ghost">Ghost</Button>
    </section>
  </SectionsContainer>
)

export const Sizes: Story = () => (
  <SectionsContainer withBg>
    <section>
      <Button size="sm" autoFocus>
        Small
      </Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </section>
  </SectionsContainer>
)
