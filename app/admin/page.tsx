"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RealtimeStatus } from "@/components/realtime-status"
import { LiveNotification } from "@/components/live-notification"
import { AlertManagement } from "@/components/alert-management"
import { AlertHistory } from "@/components/alert-history"
import { useRealtimeData } from "@/hooks/use-realtime-data"
import {
  LayoutDashboard,
  CloudRain,
  Route,
  Package,
  BarChart3,
  Settings,
  Bell,
  Users,
  MapPin,
  AlertTriangle,
  Activity,
  Radio,
} from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CloudRain, label: "Forecast & Warnings" },
  { icon: Route, label: "Evacuation Routes" },
  { icon: Package, label: "Relief & Logistics" },
  { icon: BarChart3, label: "Reports & Analytics" },
  { icon: Settings, label: "Settings" },
]

const typhoonData = {
  name: "Typhoon Maria",
  category: "Category 3",
  windSpeed: "185 km/h",
  expectedLandfall: "Dec 20, 2024 - 14:00",
  affectedBarangays: 12,
  severity: "high",
}

export default function AdminDashboard() {
  const [selectedSidebar, setSelectedSidebar] = useState("Dashboard")
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])

  const { alerts, evacuationCenters, resources, isConnected, lastUpdate, resolveAlert } = useRealtimeData()

  const handleDismissAlert = (id: string) => {
    setDismissedAlerts((prev) => [...prev, id])
  }

  const handleResolveAlert = (id: string) => {
    resolveAlert(id)
    setDismissedAlerts((prev) => [...prev, id])
  }

  const activeNotifications = alerts
    .filter((alert) => !dismissedAlerts.includes(alert.id) && alert.status === "active")
    .slice(0, 3)

  const renderMainContent = () => {
    switch (selectedSidebar) {
      case "Forecast & Warnings":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-3xl mb-2">Alert Management System</h2>
              <p className="text-muted-foreground">Create, manage, and track emergency alerts</p>
            </div>
            <Tabs defaultValue="create" className="space-y-6">
              <TabsList>
                <TabsTrigger value="create">Create Alert</TabsTrigger>
                <TabsTrigger value="history">Alert History</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <AlertManagement />
              </TabsContent>
              <TabsContent value="history">
                <AlertHistory />
              </TabsContent>
            </Tabs>
          </div>
        )
      default:
        return (
          <>
            <div className="mb-6">
              <h2 className="font-heading font-bold text-3xl mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">Monitor disaster risks and manage emergency response</p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Typhoon Forecast Card */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading flex items-center">
                      <CloudRain className="h-5 w-5 mr-2" />
                      Typhoon Forecast
                    </CardTitle>
                    <Badge variant={typhoonData.severity === "high" ? "destructive" : "secondary"}>
                      {typhoonData.category}
                    </Badge>
                  </div>
                  <CardDescription>AI-generated storm path and severity analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Storm Name</p>
                        <p className="font-semibold text-lg">{typhoonData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Wind Speed</p>
                        <p className="font-semibold text-lg text-destructive">{typhoonData.windSpeed}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Landfall</p>
                      <p className="font-semibold">{typhoonData.expectedLandfall}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Affected Barangays</span>
                        <Badge variant="outline">{typhoonData.affectedBarangays} areas</Badge>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => setSelectedSidebar("Forecast & Warnings")}
                    >
                      <Radio className="h-4 w-4 mr-2" />
                      Send Emergency Alert
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Flood Risk Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Flood Risk Zones
                  </CardTitle>
                  <CardDescription>Barangay-level risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">High Risk</span>
                      <Badge variant="destructive">3 areas</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medium Risk</span>
                      <Badge className="bg-accent text-accent-foreground">5 areas</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Low Risk</span>
                      <Badge variant="secondary">8 areas</Badge>
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      View Interactive Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Evacuation Centers and Active Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Evacuation Centers Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Evacuation Centers
                    <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                      Live
                    </Badge>
                  </CardTitle>
                  <CardDescription>Current capacity and availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {evacuationCenters.map((center, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{center.name}</span>
                          <Badge variant={Number.parseInt(center.status) > 80 ? "destructive" : "secondary"}>
                            {center.status} full
                          </Badge>
                        </div>
                        <Progress value={Number.parseInt(center.status)} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {center.occupied}/{center.capacity} occupied
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Alerts Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Active Alerts
                    <Badge variant="destructive" className="ml-2 text-xs animate-pulse">
                      {alerts.filter((a) => a.status === "active").length} Active
                    </Badge>
                  </CardTitle>
                  <CardDescription>Real-time incident reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.slice(0, 4).map((alert, index) => (
                      <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle
                            className={`h-4 w-4 ${
                              alert.priority === "high" || alert.priority === "critical"
                                ? "text-destructive"
                                : alert.priority === "medium"
                                  ? "text-accent"
                                  : "text-muted-foreground"
                            } ${alert.priority === "critical" ? "animate-pulse" : ""}`}
                          />
                          <div>
                            <p className="text-sm font-medium">{alert.type}</p>
                            <p className="text-xs text-muted-foreground">{alert.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                          <Badge
                            variant={
                              alert.priority === "high" || alert.priority === "critical"
                                ? "destructive"
                                : alert.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {alert.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Resource Tracker
                  <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription>Inventory and distribution status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {resources.map((resource, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{resource.item}</h4>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Available:</span>
                          <span className="font-semibold text-secondary">
                            {resource.available} {resource.unit}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Distributed:</span>
                          <span className="font-semibold">
                            {resource.distributed || resource.deployed || 0} {resource.unit}
                          </span>
                        </div>
                        <Progress
                          value={((resource.distributed || resource.deployed || 0) / resource.available) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Live Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
        {activeNotifications.map((alert) => (
          <LiveNotification
            key={alert.id}
            alert={alert}
            onDismiss={handleDismissAlert}
            onResolve={handleResolveAlert}
          />
        ))}
      </div>

      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">AI-DRRM</h1>
                <p className="text-sm text-muted-foreground">Municipality of Sample City</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <RealtimeStatus isConnected={isConnected} lastUpdate={lastUpdate} />
              <Separator orientation="vertical" className="h-8" />
              <div className="text-right">
                <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">{new Date().toLocaleTimeString()}</p>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground text-sm font-medium">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  onClick={() => setSelectedSidebar(item.label)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedSidebar === item.label
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderMainContent()}</main>
      </div>
    </div>
  )
}
