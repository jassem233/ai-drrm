"use client"

import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Clock } from "lucide-react"

interface RealtimeStatusProps {
  isConnected: boolean
  lastUpdate: Date
  className?: string
}

export function RealtimeStatus({ isConnected, lastUpdate, className = "" }: RealtimeStatusProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-1">
        {isConnected ? <Wifi className="h-4 w-4 text-secondary" /> : <WifiOff className="h-4 w-4 text-destructive" />}
        <Badge variant={isConnected ? "secondary" : "destructive"} className="text-xs">
          {isConnected ? "Live" : "Offline"}
        </Badge>
      </div>
      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Updated {lastUpdate.toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
