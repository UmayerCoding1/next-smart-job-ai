import { cn } from "@/lib/utils";

const Hr = ({className} : {className?: string}) => {
  return <hr className={cn(
    "mt-4 mb-8 border border-neutral-300 rounded-2xl",
    className
  )} />;
};

export default Hr;