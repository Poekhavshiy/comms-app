"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { FlaskConical, ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <FlaskConical className="h-4 w-4 ml-2 text-zinc-300" />,
  [MemberRole.ADMIN]: <FlaskConical className="h-4 w-4 ml-2 text-[#EF4444]" />
}

export const ServerMember = ({
  member,
  server
}: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-950/50 dark:hover:bg-neutral-950/50 transition mb-1",
        params?.memberId === member.id && "bg-neutral-950 dark:bg-neutral-950"
      )}
    >
      <UserAvatar 
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-300 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id && "text-primary dark:text-zinc-300 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  )
}