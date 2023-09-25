// import React from "react"
// import { type Story, type StoryDefault } from "@ladle/react"

// import { generateBoardingPass, type IBoardingPass } from "@/lib/boarding-pass"
// import { Ticket, type TicketProps } from "@/components/boarding-pass/ticket"

// export default {
//   meta: { withBg: false, withShade: true, pageWidth: true },
// } satisfies StoryDefault

// const Template: Story<TicketProps> = ({ bp: initialBp }) => {
//   const [bp, setBp] = React.useState<IBoardingPass>(initialBp)

//   React.useEffect(() => {
//     function handleKeyDown(event: KeyboardEvent) {
//       if (event.key === "e") {
//         setBp(generateBoardingPass())
//       }
//     }

//     window.addEventListener("keydown", handleKeyDown)

//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, [])

//   return (
//     <div className="@container/pass">
//       <Ticket bp={bp} />
//     </div>
//   )
// }

// export const Default: Story<TicketProps> = Template.bind({})
// Default.args = {
//   bp: generateBoardingPass(),
// }
