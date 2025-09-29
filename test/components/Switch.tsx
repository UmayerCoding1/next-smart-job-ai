// "use client";

// import React, { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";

// interface CustomSwitchProps {
//  onChsange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
//   className?: string;
//   disabled?: boolean;
// }

// const CustomSwitch: React.FC<CustomSwitchProps> = ({

//   className,
//   disabled = false,
// }) => {
//      const [enabled, setEnabled] = useState(false);


     



//      useEffect(() => {
//         const toggleSwitch =() => {

//             console.log(enabled);
//         }

//         toggleSwitch();
//      },[enabled])
//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={enabled}
//       disabled={disabled}
//       onClick={() => setEnabled(!enabled)}
//       className={cn(
//         "relative inline-flex h-6 w-12 items-center rounded-full transition-colors",
//         "focus:outline-none  ",
//         enabled ? "bg-primary" : "bg-gray-300 dark:bg-gray-600",
//         disabled && "opacity-50 cursor-not-allowed outline-none",
//         className
//       )}
//     >
//       <span
//         className={cn(
//           "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
//           enabled ? "translate-x-6" : "translate-x-1 outline-none"
//         )}
//       />
//     </button>
//   );
// };

// export default CustomSwitch;
