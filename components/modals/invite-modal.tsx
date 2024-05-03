"use client";

import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog"

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";


export const InviteModal = ()=> {
    const { onOpen, isOpen, onClose, type, data} = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const { server } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
    
        setTimeout(() => {
          setCopied(false);
        }, 1600);
      };

      const onNew = async () => {
        try {
          setIsLoading(true);
          const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
    
          onOpen("invite", { server: response.data });
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-neutral-950 text-zinc-300 p-0 overflow-hidden">
              <DialogHeader className="pt-8 px-6">
                <DialogTitle className='text-2xl text-center font-bold'>
                Server Invite Link
                </DialogTitle>
              </DialogHeader>
              <div className="p-6"> 
                <div className="flex items-center m-2 gap-x-2">
                    <Input 
                    disabled={isLoading}
                    className="bg-neutral-900/50 border-0 focus-visible:ring-0 text-lim-300 focus-visible:ring-offset-0" 
                    value= {inviteUrl}
                    />
                    <Button 
                    disabled={isLoading}
                    onClick={onCopy} 
                    className= "bg-zinc-300 text-neutral-950 hover:bg-neutral-900 hover:text-zinc-300" 
                    size="icon">
                        {copied 
                        ? <Check className="w-4 h-4" />
                        :<Copy className="w-4 h-4" /> }
                    </Button>
                </div>
                <Button 
                onClick={onNew}
                disabled={isLoading}

                size="sm"
                className="text-xs text-zinc-300 bg-neutral-900 hover:bg-zinc-300 hover:text-neutral-950 ml-2 mt-2">
                    Genereate a new link
                    <RefreshCw className="w-4 h-4 ml-2"/>
                </Button>
              </div>
            </DialogContent>
        </Dialog>
    )
}