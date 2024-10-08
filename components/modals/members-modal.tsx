"use client";

import axios from "axios";
import qs from "query-string";
import {
  Check,
  Shovel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Router,
  FlaskConicalOff,
  FlaskConical,
  Beaker
} from "lucide-react";
import { useState } from "react";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <FlaskConical className="h-4 w-4 ml-2 text-[#d1d1d1]" />,
  "ADMIN": <FlaskConical className="h-4 w-4 ml-2 text-[#EF4444]" />,
};

export const MembersModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }

  const onRoleChange = async (memberId: string, role:MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        }
      })
      
      const response = await axios.patch(url, { role })

      router.refresh();
      onOpen("members", { server: response.data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-950 text-[#d1d1d1] overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Server members
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-400">
            {server?.members?.length} users
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-neutral-500">
                  {member.profile.id}
                </p>
              </div>
              {server.profileId !== member.profileId && loadingId !== member.id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-5 w-5 text-[#d1d1d1]"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                        className="flex items-center">
                          <ShieldQuestion 
                          className="w-4 h-4 mr-2 text-[#d1d1d1]" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem 
                            onClick={() => onRoleChange(member.id, "GUEST")}
                            >
                              <Beaker className="h-4 w-4 mr-2 text-zinc-300"/>
                              Guest
                              {member.role === "GUEST" && (
                                <Check 
                                className="h-4 w-4 ml-auto text-zinc-300" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                            onClick={() => onRoleChange(member.id, "MODERATOR")}
                            >
                              <FlaskConical className="h-4 w-4 mr-2 text-zinc-300"/>
                              Admin
                              {member.role === "MODERATOR" && (
                                <Check 
                                className="h-4 w-4 ml-auto text-zinc-300" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                      onClick={() => onKick(member.id)}
                      >
                        <FlaskConicalOff className="h-4 w-4 mr-2 text-red-500" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === member.id && (
                <Loader2 
                className="animate-spin text-zinc-300 ml-auto w-4 h-4"/>
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
