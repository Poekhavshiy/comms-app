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
        Connecting
      </Badge>
      
    )
  }

  return (
    <Badge 
      variant="outline" 
      className="bg-[#C3FC5E] text-white border-none"
    >
      Live: Real-time updates
    </Badge>
  )
}