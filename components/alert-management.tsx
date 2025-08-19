"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Send, Users, MessageSquare, Radio } from "lucide-react"

interface AlertTemplate {
  id: string
  name: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  channels: string[]
}

const alertTemplates: AlertTemplate[] = [
  {
    id: "typhoon-warning",
    name: "Typhoon Warning",
    type: "Weather",
    severity: "high",
    message: "TYPHOON ALERT: Strong winds and heavy rains expected. Secure loose objects and stay indoors.",
    channels: ["SMS", "App", "Social Media", "Radio"],
  },
  {
    id: "flood-alert",
    name: "Flood Alert",
    type: "Flood",
    severity: "critical",
    message: "FLOOD ALERT: Rising water levels detected. Evacuate to higher ground immediately.",
    channels: ["SMS", "App", "Emergency Broadcast"],
  },
  {
    id: "evacuation-order",
    name: "Evacuation Order",
    type: "Evacuation",
    severity: "critical",
    message: "MANDATORY EVACUATION: Proceed to designated evacuation centers immediately.",
    channels: ["SMS", "App", "Social Media", "Radio", "Emergency Broadcast"],
  },
  {
    id: "all-clear",
    name: "All Clear",
    type: "Safety",
    severity: "low",
    message: "ALL CLEAR: Immediate danger has passed. Continue to monitor official channels for updates.",
    channels: ["SMS", "App", "Social Media"],
  },
]

const barangays = ["All Areas", "Centro", "Norte", "Sur", "Este"]
const channels = ["SMS", "Mobile App", "Social Media", "Radio Broadcast", "Emergency Broadcast", "Public Address"]

export function AlertManagement() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [alertType, setAlertType] = useState<string>("")
  const [severity, setSeverity] = useState<"low" | "medium" | "high" | "critical">("medium")
  const [message, setMessage] = useState<string>("")
  const [targetAreas, setTargetAreas] = useState<string[]>(["All Areas"])
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["SMS", "Mobile App"])
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduleTime, setScheduleTime] = useState<string>("")

  const handleTemplateSelect = (templateId: string) => {
    const template = alertTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setAlertType(template.type)
      setSeverity(template.severity)
      setMessage(template.message)
      setSelectedChannels(template.channels)
    }
  }

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels((prev) => (prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]))
  }

  const handleAreaToggle = (area: string) => {
    if (area === "All Areas") {
      setTargetAreas(["All Areas"])
    } else {
      setTargetAreas((prev) => {
        const filtered = prev.filter((a) => a !== "All Areas")
        return filtered.includes(area) ? filtered.filter((a) => a !== area) : [...filtered, area]
      })
    }
  }

  const handleSendAlert = () => {
    const alertData = {
      type: alertType,
      severity,
      message,
      targetAreas,
      channels: selectedChannels,
      timestamp: new Date().toISOString(),
      scheduled: isScheduled ? scheduleTime : null,
    }

    console.log("Sending alert:", alertData)
    alert(`Alert ${isScheduled ? "scheduled" : "sent"} successfully!`)
  }

  const getEstimatedReach = () => {
    const baseReach = targetAreas.includes("All Areas") ? 50000 : targetAreas.length * 8000
    const channelMultiplier = selectedChannels.length * 0.3 + 0.7
    return Math.round(baseReach * channelMultiplier)
  }

  return (
    <div className="space-y-6">
      {/* Alert Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Quick Alert Templates
          </CardTitle>
          <CardDescription>Pre-configured emergency alerts for rapid deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alertTemplates.map((template) => (
              <Button
                key={template.id}
                variant={selectedTemplate === template.id ? "default" : "outline"}
                className="h-auto p-4 justify-start"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{template.name}</span>
                    <Badge
                      variant={
                        template.severity === "critical"
                          ? "destructive"
                          : template.severity === "high"
                            ? "destructive"
                            : template.severity === "medium"
                              ? "default"
                              : "secondary"
                      }
                    >
                      {template.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{template.type}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Composer */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Compose Alert</CardTitle>
          <CardDescription>Create and customize emergency alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Alert Type</label>
              <Input
                placeholder="e.g., Weather, Flood, Evacuation"
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Severity Level</label>
              <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Alert Message</label>
            <Textarea
              placeholder="Enter your emergency alert message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">{message.length}/160 characters (SMS limit)</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Target Areas</label>
            <div className="flex flex-wrap gap-2">
              {barangays.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={targetAreas.includes(area)}
                    onCheckedChange={() => handleAreaToggle(area)}
                  />
                  <label htmlFor={area} className="text-sm">
                    {area}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Distribution Channels</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {channels.map((channel) => (
                <div key={channel} className="flex items-center space-x-2">
                  <Checkbox
                    id={channel}
                    checked={selectedChannels.includes(channel)}
                    onCheckedChange={() => handleChannelToggle(channel)}
                  />
                  <label htmlFor={channel} className="text-sm">
                    {channel}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
              <label htmlFor="schedule" className="text-sm">
                Schedule for later
              </label>
            </div>
            {isScheduled && (
              <Input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-auto"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alert Preview & Send */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Alert Preview</CardTitle>
          <CardDescription>Review before sending</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border bg-muted/50">
            <div className="flex items-center space-x-2 mb-2">
              <Badge
                variant={
                  severity === "critical"
                    ? "destructive"
                    : severity === "high"
                      ? "destructive"
                      : severity === "medium"
                        ? "default"
                        : "secondary"
                }
              >
                {severity.toUpperCase()}
              </Badge>
              <span className="text-sm font-medium">{alertType}</span>
            </div>
            <p className="text-sm mb-2">{message || "No message entered"}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Areas: {targetAreas.join(", ")}</span>
              <span>Channels: {selectedChannels.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Estimated Reach</p>
                <p className="text-xs text-muted-foreground">{getEstimatedReach().toLocaleString()} people</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Channels</p>
                <p className="text-xs text-muted-foreground">{selectedChannels.length} selected</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Radio className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Delivery Time</p>
                <p className="text-xs text-muted-foreground">~2-5 minutes</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleSendAlert}
              disabled={!message || !alertType}
              className="flex-1"
              variant={severity === "critical" ? "destructive" : "default"}
            >
              <Send className="h-4 w-4 mr-2" />
              {isScheduled ? "Schedule Alert" : "Send Alert Now"}
            </Button>
            <Button variant="outline">Save as Template</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
