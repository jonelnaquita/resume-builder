import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-20 w-full rounded-lg border-2 bg-white/50 backdrop-blur-sm px-4 py-3 text-base shadow-sm transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm leading-relaxed",
        "hover:border-blue-300 hover:bg-white hover:shadow-md",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/20 focus-visible:ring-4 focus-visible:bg-white focus-visible:shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
