"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge 
      
        variant="outline" 
        className="bg-[#DF80FF] text-white border-none"
      >
        Socket off (vercel)
      </Badge>
      
    )
  }

  return (
    <Badge 
      variant="outline" 
      className="bg-[#d1d1d1] text-white border-none"
    >
      Live: Real-time updates
    </Badge>
  )
}