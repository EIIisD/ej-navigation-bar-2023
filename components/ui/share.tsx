"use client"

import React, { HTMLAttributes, useCallback, useState, type SVGProps } from "react"

import { type Passenger } from "@/config/booking"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icon } from "@/components/icon"

export const Share = ({ passenger }: { passenger: Passenger }) => {
  const [isShareSupported, setIsShareSupported] = useState(false)
  const [shareError, setShareError] = useState<string | null>(null)

  React.useEffect(() => {
    setIsShareSupported("share" in navigator)
  }, [])

  const handleShare = useCallback(() => {
    if (isShareSupported) {
      navigator
        .share({
          title: `Boarding pass for ${passenger.firstName} ${passenger.lastName}`,
          text: `Here is the boarding pass for ${passenger.firstName} ${passenger.lastName}.`,
          // You can also share URLs or files here
        })
        .catch((error) => {
          setShareError("Error sharing: " + error)
        })
    } else {
      setShareError("Sharing is not supported by your current browser. Please try a different browser or device.")
    }
  }, [passenger, isShareSupported])

  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <button type="button" className="-m-1 flex items-center rounded-full p-1" onClick={handleShare}>
        </button> */}
        <Button size="sm" mode="default" onClick={handleShare}>
          <div>Share this Boarding Pass</div>
          <ShareIcon className="aspect-square h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {shareError ? (
          <>
            <div className="flex items-center">
              <Icon name="warningSolid" className="h-4 w-4 text-red-500" />
              <h3 className="ml-2 font-bold text-red-500">Unable to Share</h3>
            </div>
            <hr className="border-gray-200" />
            <p className="text-secondary">{shareError}</p>
          </>
        ) : (
          <>
            <h3 className="font-bold">Share boarding pass</h3>
            <hr className="border-gray-200" />
            <ul className="list">
              <li>Email</li>
              <li>WhatsApp</li>
              <li>Airdrop</li>
            </ul>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

const ShareIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg className={cn("", className)} viewBox="0 0 24.5508 25.6758" {...props}>
    <g>
      <rect height="25.6758" opacity="0" width="24.5508" x="0" y="0" />
      <path
        d="M14.6719 25.6758C15.5156 25.6758 16.1133 24.9492 16.5469 23.8242L24.2227 3.77344C24.4336 3.23438 24.5508 2.75391 24.5508 2.35547C24.5508 1.59375 24.082 1.125 23.3203 1.125C22.9219 1.125 22.4414 1.24219 21.9023 1.45312L1.74609 9.17578C0.761719 9.55078 0 10.1484 0 11.0039C0 12.082 0.820312 12.4453 1.94531 12.7852L8.27344 14.707C9.02344 14.9414 9.44531 14.918 9.94922 14.4492L22.8047 2.4375C22.957 2.29688 23.1328 2.32031 23.25 2.42578C23.3672 2.54297 23.3789 2.71875 23.2383 2.87109L11.2734 15.7734C10.8164 16.2539 10.7812 16.6523 11.0039 17.4375L12.8672 23.625C13.2188 24.8086 13.582 25.6758 14.6719 25.6758Z"
        fill="currentColor"
      />
    </g>
  </svg>
)

// const ShareIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
//   <svg className={cn("", className)} viewBox="0 0 17.334 26.4746" {...props}>
//     <g>
//       <rect height="26.4746" opacity="0" width="17.334" x="0" y="0" />
//       <path
//         d="M3.06641 23.5352L14.2676 23.5352C16.3086 23.5352 17.334 22.5195 17.334 20.5078L17.334 10.7617C17.334 8.75 16.3086 7.73438 14.2676 7.73438L3.06641 7.73438C1.02539 7.73438 0 8.75 0 10.7617L0 20.5078C0 22.5195 1.02539 23.5352 3.06641 23.5352ZM1.57227 20.4199L1.57227 10.8496C1.57227 9.83398 2.10938 9.30664 3.08594 9.30664L14.2383 9.30664C15.2051 9.30664 15.7617 9.83398 15.7617 10.8496L15.7617 20.4199C15.7617 21.4355 15.2051 21.9629 14.2383 21.9629L3.08594 21.9629C2.10938 21.9629 1.57227 21.4355 1.57227 20.4199Z"
//         className="fill-current stroke-current stroke-[0.3]"
//       />
//       <path
//         d="M11.3281 15.127L11.3281 2.64648C11.3281 1.19141 10.127 0 8.66211 0C7.20703 0 6.00586 1.19141 6.00586 2.64648L6.00586 15.127C6.00586 16.5723 7.20703 17.7734 8.66211 17.7734C10.127 17.7734 11.3281 16.5723 11.3281 15.127Z"
//         className="fill-white stroke-white stroke-[3]"
//       />
//       <path
//         d="M8.66211 15.8887C9.08203 15.8887 9.44336 15.5371 9.44336 15.127L9.44336 5.09766L9.38477 3.63281L10.0391 4.32617L11.5234 5.9082C11.6602 6.06445 11.8555 6.14258 12.0508 6.14258C12.4512 6.14258 12.7637 5.84961 12.7637 5.44922C12.7637 5.24414 12.6758 5.08789 12.5293 4.94141L9.22852 1.75781C9.0332 1.5625 8.86719 1.49414 8.66211 1.49414C8.4668 1.49414 8.30078 1.5625 8.0957 1.75781L4.79492 4.94141C4.64844 5.08789 4.57031 5.24414 4.57031 5.44922C4.57031 5.84961 4.86328 6.14258 5.27344 6.14258C5.45898 6.14258 5.67383 6.06445 5.81055 5.9082L7.28516 4.32617L7.94922 3.63281L7.89062 5.09766L7.89062 15.127C7.89062 15.5371 8.24219 15.8887 8.66211 15.8887Z"
//         className="fill-current stroke-current stroke-[0.3]"
//       />
//     </g>
//   </svg>
// )
