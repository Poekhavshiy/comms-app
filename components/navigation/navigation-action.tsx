"use client"

import { CircleFadingPlus, Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
const { onOpen } = useModal();

    return ( 
        <div>
            <ActionTooltip 
            side="right"
            align="center"
            label="Create a Server"
            >
            <button 
              onClick={() => onOpen("createServer")}
              className="group flex items-center">
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-950 group-hover:bg-zinc-300">
                    <CircleFadingPlus
                    className="group-hover:text-black transtion text-zinc-300"
                    size={36}
                    />
                </div>

            </button>
            </ActionTooltip>
        </div>
     );
}
 
export default NavigationAction;