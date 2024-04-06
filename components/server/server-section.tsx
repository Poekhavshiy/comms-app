"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings, Wrench } from "lucide-react";

import { ServerWithMembersWithProfiles } from "@/types";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
};

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-neutral-200 dark:text-neutral-200">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-[#C3FC5E] hover:text-neutral-950 hover:bg-[#C3FC5E] dark:text-[#C3FC5E] dark:hover:text-neutral-950 dark:hover:bg-[#C3FC5E] transition rounded-full"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-[#C3FC5E] hover:text-red-500 dark:text-[#C3FC5E] dark:hover:text-red-500 transition"
          >
            <Wrench className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}