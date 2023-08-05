import React from "react"
import { type Story, type StoryDefault } from "@ladle/react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Icon } from "@/components/icon"

export default {
  meta: { withBg: true },
} satisfies StoryDefault

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default: Story = Template.bind({})
Default.args = {
  autoFocus: true,
  children: "Button",
}

export const Variants: Story = () => {
  return (
    <>
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
    </>
  )
}

export const Modes: Story = () => (
  <>
    <section>
      <Button mode="default" autoFocus>
        Default
      </Button>
      <Button mode="outline">Outline</Button>
      <Button mode="ghost">Ghost</Button>
    </section>
  </>
)

export const Sizes: Story = () => (
  <>
    <section>
      <Button size="sm" autoFocus>
        Small
      </Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </section>
  </>
)
