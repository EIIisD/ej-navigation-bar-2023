import { type Story, type StoryDefault } from "@ladle/react"

import { Button, ButtonProps } from "@/components/ui/button"

export default {} satisfies StoryDefault

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default: Story = Template.bind({})
Default.args = {
  children: "Button",
}

export const Variants: Story = () => (
  <>
    <Button>Default</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="reversed">Reversed</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="linkReversed">Link Reversed</Button>
  </>
)

export const Sizes: Story = () => (
  <>
    <Button size="text">Text</Button>
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
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
    </Button>
  </>
)
