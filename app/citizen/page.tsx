"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRealtimeData } from "@/hooks/use-realtime-data"
import {
  AlertTriangle,
  MapPin,
  Users,
  MessageSquare,
  Package,
  Navigation,
  Phone,
  Wifi,
  WifiOff,
  Clock,
  Shield,
  CheckCircle,
} from "lucide-react"

const typhoonAlert = {
  name: "Typhoon Maria",
  severity: "high",
  category: "Category 3",
  eta: "6 hours",
  windSpeed: "185 km/h",
  instructions: "Stay indoors, secure loose objects, prepare emergency kit",
}

const evacuationCenters = [
  {
    name: "Barangay Hall - Centro",
    distance: "0.8 km",
    capacity: "30% available",
    status: "open",
    walkTime: "10 mins",
  },
  {
    name: "Elementary School - Norte",
    distance: "1.2 km",
    capacity: "37% available",
    status: "open",
    walkTime: "15 mins",
  },
  {
    name: "Community Center - Sur",
    distance: "2.1 km",
    capacity: "8% available",
    status: "nearly full",
    walkTime: "25 mins",
  },
]

const communityUpdates = [
  {
    time: "15:30",
    source: "LGU Official",
    message: "Relief goods distribution at Centro Barangay Hall starting 4PM",
    verified: true,
  },
  {
    time: "15:15",
    source: "Barangay Captain",
    message: "Main road to Norte is now passable. Exercise caution.",
    verified: true,
  },
  {
    time: "14:45",
    source: "Red Cross",
    message: "Medical team stationed at Elementary School evacuation center",
    verified: true,
  },
  {
    time: "14:30",
    source: "MDRRMO",
    message: "Water level in Riverside area decreasing. Continue monitoring.",
    verified: true,
  },
]

const reliefSchedule = [
  { barangay: "Centro", date: "Today", time: "4:00 PM", items: "Food packs, Water", status: "scheduled" },
  { barangay: "Norte", date: "Tomorrow", time: "9:00 AM", items: "Medicine, Blankets", status: "pending" },
  { barangay: "Sur", date: "Tomorrow", time: "2:00 PM", items: "Food packs, Hygiene kits", status: "pending" },
]

export default function CitizenApp() {
  const [isOnline, setIsOnline] = useState(true)
  const [helpLocation, setHelpLocation] = useState("")
  const [helpDescription, setHelpDescription] = useState("")
  const [selectedBarangay, setSelectedBarangay] = useState("Centro")
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([])

  const { alerts, isConnected } = useRealtimeData()

  const currentAlert = alerts.find(
    (alert) =>
      (alert.priority === "critical" || alert.priority === "high") &&
      alert.status === "active" &&
      !acknowledgedAlerts.includes(alert.id),
  ) || {
    id: "typhoon-maria",
    type: "Typhoon Alert",
    priority: "high" as const,
    location: "All Areas",
    time: "Now",
    status: "active" as const,
    description: `${typhoonAlert.name} - ${typhoonAlert.category}. ${typhoonAlert.instructions}`,
  }

  const handleEmergencyHelp = () => {
    alert("Emergency help request sent to LGU and rescue teams!")
  }

  const handleSMSCommand = (command: string) => {
    alert(`SMS sent: ${command}`)
  }

  const handleAcknowledgeAlert = (alertId: string) => {
    setAcknowledgedAlerts((prev) => [...prev, alertId])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg">AI-DRRM</h1>
              <p className="text-xs opacity-90">Citizen Safety App</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="h-5 w-5 text-secondary" />
            ) : (
              <WifiOff className="h-5 w-5 text-destructive" />
            )}
            <span className="text-xs">{isConnected ? "Online" : "Offline"}</span>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4 pb-20">
        <Card className="border-destructive bg-destructive/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-lg flex items-center text-destructive">
                <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
                {currentAlert.type.toUpperCase()}
              </CardTitle>
              <Badge variant="destructive">{currentAlert.priority}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-semibold">{currentAlert.location}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="font-semibold text-destructive">{currentAlert.time}</p>
              </div>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium mb-1">Alert Details:</p>
              <p className="text-sm">{currentAlert.description || typhoonAlert.instructions}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => handleAcknowledgeAlert(currentAlert.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />I Understand
              </Button>
              <Button variant="destructive" size="sm" className="flex-1">
                Share Alert
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button size="lg" className="h-16 flex-col space-y-1" variant="destructive" onClick={handleEmergencyHelp}>
            <Phone className="h-6 w-6" />
            <span className="text-sm font-medium">EMERGENCY HELP</span>
          </Button>
          <Button size="lg" className="h-16 flex-col space-y-1" variant="secondary">
            <Navigation className="h-6 w-6" />
            <span className="text-sm font-medium">SAFE ROUTE</span>
          </Button>
        </div>

        {/* Nearest Evacuation Centers */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Evacuation Centers
            </CardTitle>
            <CardDescription>Find nearest safe locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {evacuationCenters.map((center, index) => (
              <div key={index} className="p-3 rounded-lg border bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{center.name}</h4>
                  <Badge variant={center.status === "open" ? "secondary" : "destructive"}>{center.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{center.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{center.walkTime}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Capacity Available</p>
                  <p className="text-xs font-medium text-secondary">{center.capacity}</p>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                  Get Directions
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Report Help Needed */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Report Help Needed
            </CardTitle>
            <CardDescription>One-tap emergency assistance request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Your Location</label>
              <Input
                placeholder="Auto-detected: Barangay Centro, Sample City"
                value={helpLocation}
                onChange={(e) => setHelpLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Describe the Emergency</label>
              <Textarea
                placeholder="Brief description of help needed..."
                value={helpDescription}
                onChange={(e) => setHelpDescription(e.target.value)}
                rows={3}
              />
            </div>
            <Button className="w-full" size="lg" onClick={handleEmergencyHelp}>
              Send Help Request
            </Button>
          </CardContent>
        </Card>

        {/* Community Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Community Updates
              <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                Live
              </Badge>
            </CardTitle>
            <CardDescription>Verified announcements and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {communityUpdates.map((update, index) => (
              <div key={index} className="p-3 rounded-lg border bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {update.source}
                    </Badge>
                    {update.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{update.time}</span>
                </div>
                <p className="text-sm">{update.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Relief Aid Status */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Relief Aid Schedule
            </CardTitle>
            <CardDescription>Track supply distribution in your area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex space-x-2 mb-3">
              {["Centro", "Norte", "Sur", "Este"].map((barangay) => (
                <Button
                  key={barangay}
                  size="sm"
                  variant={selectedBarangay === barangay ? "default" : "outline"}
                  onClick={() => setSelectedBarangay(barangay)}
                  className="text-xs"
                >
                  {barangay}
                </Button>
              ))}
            </div>
            {reliefSchedule
              .filter((item) => item.barangay === selectedBarangay)
              .map((item, index) => (
                <div key={index} className="p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">Barangay {item.barangay}</h4>
                    <Badge variant={item.status === "scheduled" ? "secondary" : "outline"}>{item.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date & Time</p>
                      <p className="font-medium">
                        {item.date}, {item.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Items</p>
                      <p className="font-medium">{item.items}</p>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Offline/SMS Mode */}
        <Card className="border-accent bg-accent/5">
          <CardHeader>
            <CardTitle className="font-heading flex items-center text-accent">
              <WifiOff className="h-5 w-5 mr-2" />
              Offline/SMS Mode
            </CardTitle>
            <CardDescription>Emergency commands when internet is unavailable</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-3">
              Text these keywords to <strong>0917-DRRM-HELP</strong>:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded border">
                <div>
                  <p className="font-medium text-sm">SAFE</p>
                  <p className="text-xs text-muted-foreground">Get nearest safe route</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleSMSCommand("SAFE")}>
                  Send SMS
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded border">
                <div>
                  <p className="font-medium text-sm">CENTER</p>
                  <p className="text-xs text-muted-foreground">Find evacuation center</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleSMSCommand("CENTER")}>
                  Send SMS
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded border">
                <div>
                  <p className="font-medium text-sm">HELP [location]</p>
                  <p className="text-xs text-muted-foreground">Send distress signal</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleSMSCommand("HELP Centro")}>
                  Send SMS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4">
        <div className="flex justify-center">
          <Button variant="destructive" size="lg" className="w-full max-w-sm" onClick={handleEmergencyHelp}>
            <Phone className="h-5 w-5 mr-2" />
            EMERGENCY CALL
          </Button>
        </div>
      </div>
    </div>
  )
}
