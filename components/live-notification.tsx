"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, AlertTriangle, Info, CheckCircle } from "lucide-react"
import type { RealtimeAlert } from "@/hooks/use-realtime-data"

interface LiveNotificationProps {
  alert: RealtimeAlert
  onDismiss: (id: string) => void
  onResolve: (id: string) => void
}

export function LiveNotification({ alert, onDismiss, onResolve }: LiveNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      if (alert.priority === "low") {
        onDismiss(alert.id)
      }
    }, 10000) // Auto-dismiss low priority alerts after 10 seconds

    return () => clearTimeout(timer)
  }, [alert.id, alert.priority, onDismiss])

  const getIcon = () => {
    switch (alert.priority) {
      case "critical":
      case "high":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "medium":
        return <Info className="h-5 w-5 text-accent" />
      default:
        return <CheckCircle className="h-5 w-5 text-secondary" />
    }
  }

  const getBorderColor = () => {
    switch (alert.priority) {
      case "critical":
        return "border-destructive"
      case "high":
        return "border-destructive"
      case "medium":
        return "border-accent"
      default:
        return "border-secondary"
    }
  }

  if (!isVisible) return null

  return (
    <Card className={`${getBorderColor()} border-2 animate-in slide-in-from-right-full duration-300`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {getIcon()}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-sm">{alert.type}</h4>
                <Badge
                  variant={
                    alert.priority === "critical" || alert.priority === "high"
                      ? "destructive"
                      : alert.priority === "medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {alert.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.location}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              {alert.description && <p className="text-sm mt-2">{alert.description}</p>}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button size="sm" variant="outline" onClick={() => onResolve(alert.id)} className="text-xs">
              Resolve
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDismiss(alert.id)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
