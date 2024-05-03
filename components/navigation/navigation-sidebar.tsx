import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import NavigationAction from "./navigation-action";
import PublicServer from "./public-server";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }
    
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div
          className="space-y-4 flex flex-col items-center h-full text-primary -full dark:bg-[#191919] py-3">
            <NavigationAction/>
            <PublicServer/>
            <Separator
              className="h-[2px] bg-neutral-700 dark:bg-neutral-700 rounded-md w-10 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                   <div key={server.id} className="mb-4">
                    <NavigationItem 
                    id={server.id}
                    name={server.name}
                    imageUrl={server.imageUrl}/>
                   </div> 
                ))}
            </ScrollArea>
        </div>
    )
}