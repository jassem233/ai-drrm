"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, MessageSquare, BarChart3, Eye } from "lucide-react"

interface AlertHistoryItem {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  timestamp: string
  targetAreas: string[]
  channels: string[]
  status: "sent" | "scheduled" | "failed"
  reach: number
  acknowledged: number
}

const alertHistory: AlertHistoryItem[] = [
  {
    id: "alert-001",
    type: "Typhoon Warning",
    severity: "high",
    message: "TYPHOON ALERT: Strong winds and heavy rains expected. Secure loose objects and stay indoors.",
    timestamp: "2024-12-20T14:30:00Z",
    targetAreas: ["All Areas"],
    channels: ["SMS", "Mobile App", "Radio Broadcast"],
    status: "sent",
    reach: 45000,
    acknowledged: 38000,
  },
  {
    id: "alert-002",
    type: "Flood Alert",
    severity: "critical",
    message: "FLOOD ALERT: Rising water levels in Centro area. Evacuate immediately.",
    timestamp: "2024-12-20T13:15:00Z",
    targetAreas: ["Centro"],
    channels: ["SMS", "Mobile App", "Emergency Broadcast"],
    status: "sent",
    reach: 8500,
    acknowledged: 7200,
  },
  {
    id: "alert-003",
    type: "Road Closure",
    severity: "medium",
    message: "TRAFFIC ALERT: Main highway blocked due to fallen tree. Use alternate routes.",
    timestamp: "2024-12-20T12:00:00Z",
    targetAreas: ["Norte", "Sur"],
    channels: ["Mobile App", "Social Media"],
    status: "sent",
    reach: 15000,
    acknowledged: 12000,
  },
  {
    id: "alert-004",
    type: "Evacuation Order",
    severity: "critical",
    message: "MANDATORY EVACUATION: All residents in flood-prone areas must evacuate now.",
    timestamp: "2024-12-20T15:00:00Z",
    targetAreas: ["Centro", "Norte"],
    channels: ["SMS", "Mobile App", "Radio Broadcast", "Emergency Broadcast"],
    status: "scheduled",
    reach: 0,
    acknowledged: 0,
  },
]

export function AlertHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredAlerts = alertHistory.filter((alert) => {
    const matchesSearch =
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const getAcknowledgmentRate = (alert: AlertHistoryItem) => {
    if (alert.reach === 0) return 0
    return Math.round((alert.acknowledged / alert.reach) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Alert History & Analytics
          </CardTitle>
          <CardDescription>Track sent alerts and their effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-1/3"
            />
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="md:w-1/4">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="md:w-1/4">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      alert.severity === "critical"
                        ? "destructive"
                        : alert.severity === "high"
                          ? "destructive"
                          : alert.severity === "medium"
                            ? "default"
                            : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{alert.type}</h4>
                    <p className="text-sm text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      alert.status === "sent" ? "secondary" : alert.status === "scheduled" ? "default" : "destructive"
                    }
                  >
                    {alert.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm mb-3 p-3 bg-muted rounded-lg">{alert.message}</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Reach</p>
                    <p className="text-muted-foreground">{alert.reach.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Acknowledged</p>
                    <p className="text-muted-foreground">{alert.acknowledged.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Response Rate</p>
                    <p className="text-muted-foreground">{getAcknowledgmentRate(alert)}%</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Areas</p>
                  <p className="text-muted-foreground">{alert.targetAreas.join(", ")}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {alert.channels.map((channel) => (
                  <Badge key={channel} variant="outline" className="text-xs">
                    {channel}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
