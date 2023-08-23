import { cn } from "@/lib/utils"

export const TNums: React.FC<{ content: string | number; numsOnly?: boolean; className?: string }> = ({ content, numsOnly = true, className }) => {
  const isNumber = (char: string) => !isNaN(Number(char))

  return (
    <span className={cn("inline-flex", className)}>
      {content
        .toString()
        .split("")
        .map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={cn(
              "inline-block text-center",
              char === " " ? "w-[0.4ch] min-w-[0.4ch] max-w-[0.4ch]" : isNumber(char) || !numsOnly ? "w-[1ch] min-w-[1ch] max-w-[1ch]" : ""
            )}
          >
            {char}
          </span>
        ))}
    </span>
  )
}
