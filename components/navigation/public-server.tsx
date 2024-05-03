"use client"

import { FlaskConical, Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const PublicServer = () => {
const { onOpen } = useModal();

    return ( 
        <div>
            <ActionTooltip 
            side="right"
            align="center"
            label="Join public test server"
            >
            <button 
              onClick={() => {
                window.open('http://localhost:3000/invite/808337f9-1941-4d91-aa49-c6046bc1783b');
              }}
              className="group flex items-center">
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-950 group-hover:bg-lime-300">
                    <FlaskConical
                    className="group-hover:text-black transtion text-lime-300"
                    size={36}
                    />
                </div>

            </button>
            </ActionTooltip>
        </div>
     );
}
 
export default PublicServer;