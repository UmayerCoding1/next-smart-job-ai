import { cn } from "@/lib/utils"

const Heading = ({children, className} : {children: React.ReactNode, className?: string}) => {
    return (
        <h1 className={cn("text-xl font-semibold tracking-tight flex items-center gap-2 my-2", className)}>
        {children}
      </h1>
    )
}

export default  Heading;