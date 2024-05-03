"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu";

  import { 
    ChevronDown, 
    LogOut, 
    PlusCircle, 
    Settings, 
    Trash, 
    UserPlus,
    Users
  } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles
    role?: MemberRole;
  };

  export const ServerHeader = ({
    server,
    role
  }: ServerHeaderProps) => {

    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none"
            asChild>
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-zinc-300 dark:border-zinc-300 border-b-2 hover: bg-neutral-950 dark:hover: bg-neutral-900/1 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-zinc-300 dark:text-zinc-300 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("invite",{ server })}
                    className="text-zinc-300 dark:text-zinc-300 px-3 py-2 text-sm cursor-pointer">
                        Invite Friends
                        <UserPlus className="h-4 w-43 ml-auto"/>
                    </DropdownMenuItem>
                    
                    
                )}

{isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Server Settings
            <Settings className="h-4 w-43 ml-auto" />
          </DropdownMenuItem>
        )}

                {isAdmin && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("members", { server})}
                    className="px-3 py-2 text-sm cursor-pointer">
                        Edit Members
                        <Users className="h-4 w-43 ml-auto"/>
                    </DropdownMenuItem>
                    
                    
                )}

                {isModerator && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("createChannel")}
                    className="px-3 py-2 text-sm cursor-pointer">
                        Create Channel
                        <PlusCircle className="h-4 w-43 ml-auto"/>
                    </DropdownMenuItem>
                    
                    
                )}

                {isModerator && (
                    <DropdownMenuSeparator />
                )}

                {isAdmin && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("deleteServer", { server })} 
                    className="text-red-500 px-3 py-2 text-sm cursor-pointer">
                        Delete Server
                        <Trash className="h-4 w-43 ml-auto"/>
                    </DropdownMenuItem>
                    
                    
                )}

                {!isAdmin && (
                    <DropdownMenuItem 
                    onClick={() => onOpen("leaveServer", { server })} 
                    className="text-red-500 px-3 py-2 text-sm cursor-pointer">
                        Leave Server
                        <LogOut className="h-4 w-43 ml-auto"/>
                    </DropdownMenuItem>
                    
                    
                )}
            </DropdownMenuContent>

        </DropdownMenu>
    )
  }