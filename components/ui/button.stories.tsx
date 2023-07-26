import { type Story, type StoryDefault } from "@ladle/react"

import { Button, ButtonProps } from "@/components/ui/button"

export default {} satisfies StoryDefault

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default: Story = Template.bind({})
Default.args = {
  children: "Off",
}
