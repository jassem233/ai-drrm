"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RealtimeStatus } from "@/components/realtime-status"
import { useRealtimeData } from "@/hooks/use-realtime-data"
import { MapPin, Truck, Users, Camera, CheckSquare, AlertCircle, Clock, Heart } from "lucide-react"

const incidentReports = [
  {
    id: 1,
    type: "Flood",
    location: "Barangay Centro",
    priority: "high",
    time: "14:30",
    status: "active",
    coordinates: "14.5995° N, 120.9842° E",
  },
  {
    id: 2,
    type: "Landslide",
    location: "Barangay Norte",
    priority: "critical",
    time: "14:15",
    status: "responding",
    coordinates: "14.6012° N, 120.9856° E",
  },
  {
    id: 3,
    type: "Stranded Family",
    location: "Riverside Area",
    priority: "medium",
    time: "13:45",
    status: "pending",
    coordinates: "14.5978° N, 120.9834° E",
  },
  {
    id: 4,
    type: "Medical Emergency",
    location: "Evacuation Center",
    priority: "high",
    time: "13:30",
    status: "active",
    coordinates: "14.6001° N, 120.9845° E",
  },
]

const reliefDistribution = [
  { route: "Route A - Centro", status: "completed", delivered: 45, pending: 0, truck: "Truck-001" },
  { route: "Route B - Norte", status: "in-progress", delivered: 28, pending: 17, truck: "Truck-002" },
  { route: "Route C - Sur", status: "pending", delivered: 0, pending: 35, truck: "Truck-003" },
  { route: "Route D - Este", status: "in-progress", delivered: 12, pending: 23, truck: "Truck-004" },
]

const volunteers = [
  {
    name: "Team Alpha",
    members: 6,
    skills: ["Medical", "Search & Rescue"],
    status: "deployed",
    location: "Barangay Norte",
  },
  { name: "Team Bravo", members: 4, skills: ["Relief Distribution"], status: "available", location: "Base Camp" },
  {
    name: "Team Charlie",
    members: 5,
    skills: ["Communications", "Logistics"],
    status: "deployed",
    location: "Barangay Centro",
  },
  { name: "Team Delta", members: 3, skills: ["Medical", "Evacuation"], status: "rest", location: "Base Camp" },
]

const droneFeed = [
  {
    id: "Drone-01",
    location: "Barangay Norte",
    status: "active",
    findings: "Road blocked by debris",
    priority: "high",
  },
  {
    id: "Drone-02",
    location: "Riverside Area",
    status: "active",
    findings: "Stranded residents on rooftop",
    priority: "critical",
  },
  {
    id: "Drone-03",
    location: "Main Highway",
    status: "returning",
    findings: "Bridge partially damaged",
    priority: "medium",
  },
]

const taskQueue = [
  { id: 1, task: "Rescue stranded family - Riverside", priority: "critical", assignedTo: "Team Alpha", eta: "15 mins" },
  { id: 2, task: "Medical supply delivery - Centro", priority: "high", assignedTo: "Team Charlie", eta: "30 mins" },
  { id: 3, task: "Road clearance - Norte Highway", priority: "medium", assignedTo: "Unassigned", eta: "45 mins" },
  { id: 4, task: "Evacuation assistance - Sur Area", priority: "high", assignedTo: "Team Bravo", eta: "20 mins" },
]

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const { incidents, isConnected, lastUpdate, updateIncidentStatus } = useRealtimeData()

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <Heart className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">Rescue Operations</h1>
                <p className="text-sm text-muted-foreground">NGO Emergency Response Center</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <RealtimeStatus isConnected={isConnected} lastUpdate={lastUpdate} />
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center">
                <p className="text-sm font-medium">Operations Today</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-destructive animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-destructive">
                    {incidents.filter((i) => i.status === "active").length} Active Alerts
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {incidents.filter((i) => i.priority === "critical").length} Critical
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Live Map</TabsTrigger>
            <TabsTrigger value="relief">Relief Ops</TabsTrigger>
            <TabsTrigger value="volunteers">Teams</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Incidents</p>
                      <p className="text-2xl font-bold text-destructive">
                        {incidents.filter((i) => i.status === "active").length}
                      </p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Teams Deployed</p>
                      <p className="text-2xl font-bold text-secondary">3/4</p>
                    </div>
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Relief Delivered</p>
                      <p className="text-2xl font-bold text-primary">85</p>
                    </div>
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Drones Active</p>
                      <p className="text-2xl font-bold text-accent">2/3</p>
                    </div>
                    <Camera className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Incident Map */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Incident Map
                  <Badge variant="destructive" className="ml-2 text-xs animate-pulse">
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription>Real-time reports from citizens and drone imagery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive Map View</p>
                    <p className="text-sm text-muted-foreground">Showing {incidents.length} active incidents</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {incidents.slice(0, 4).map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            incident.priority === "critical"
                              ? "bg-destructive animate-pulse"
                              : incident.priority === "high"
                                ? "bg-destructive"
                                : "bg-accent"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">{incident.type}</p>
                          <p className="text-xs text-muted-foreground">{incident.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={incident.status === "active" ? "destructive" : "secondary"}>
                          {incident.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{incident.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Drone Feed Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Drone Feed Analysis
                  <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription>AI-powered damage assessment and reconnaissance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {droneFeed.map((drone) => (
                    <div key={drone.id} className="p-4 rounded-lg border bg-muted/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{drone.id}</h4>
                        <Badge variant={drone.status === "active" ? "secondary" : "outline"}>{drone.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{drone.location}</p>
                      <p className="text-sm font-medium mb-2">{drone.findings}</p>
                      <Badge
                        variant={
                          drone.priority === "critical"
                            ? "destructive"
                            : drone.priority === "high"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {drone.priority} priority
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            {/* Live Incident Map */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Incident Map
                  <Badge variant="destructive" className="ml-2 text-xs animate-pulse">
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription>Real-time reports from citizens and drone imagery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive Map View</p>
                    <p className="text-sm text-muted-foreground">Showing {incidents.length} active incidents</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {incidents.slice(0, 4).map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            incident.priority === "critical"
                              ? "bg-destructive animate-pulse"
                              : incident.priority === "high"
                                ? "bg-destructive"
                                : "bg-accent"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">{incident.type}</p>
                          <p className="text-xs text-muted-foreground">{incident.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={incident.status === "active" ? "destructive" : "secondary"}>
                          {incident.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{incident.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relief" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Relief Distribution Tracker
                </CardTitle>
                <CardDescription>Monitor delivery routes and distribution progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reliefDistribution.map((route, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{route.route}</h4>
                          <p className="text-sm text-muted-foreground">{route.truck}</p>
                        </div>
                        <Badge
                          variant={
                            route.status === "completed"
                              ? "secondary"
                              : route.status === "in-progress"
                                ? "default"
                                : "outline"
                          }
                        >
                          {route.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Delivered</p>
                          <p className="font-semibold text-secondary">{route.delivered} packages</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="font-semibold text-accent">{route.pending} packages</p>
                        </div>
                      </div>
                      <Progress value={(route.delivered / (route.delivered + route.pending)) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Volunteer Team Status
                </CardTitle>
                <CardDescription>Available teams, skills, and deployment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {volunteers.map((team, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{team.name}</h4>
                        <Badge
                          variant={
                            team.status === "deployed"
                              ? "default"
                              : team.status === "available"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {team.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Members:</span>
                          <span className="font-medium">{team.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Location:</span>
                          <span className="font-medium">{team.location}</span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {team.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <CheckSquare className="h-5 w-5 mr-2" />
                  Task Queue
                </CardTitle>
                <CardDescription>AI-prioritized rescue assignments and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {taskQueue.map((task) => (
                    <div key={task.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{task.task}</h4>
                        <Badge
                          variant={
                            task.priority === "critical"
                              ? "destructive"
                              : task.priority === "high"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <span className="font-medium">{task.assignedTo}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">ETA: {task.eta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
