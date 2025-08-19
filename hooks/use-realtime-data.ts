"use client"

import { useState, useEffect, useCallback } from "react"

export interface RealtimeAlert {
  id: string
  time: string
  type: string
  location: string
  priority: "low" | "medium" | "high" | "critical"
  status: "active" | "resolved" | "pending"
  description?: string
}

export interface RealtimeEvacuationCenter {
  name: string
  capacity: number
  occupied: number
  status: string
  lastUpdated: string
}

export interface RealtimeResource {
  item: string
  available: number
  distributed: number
  deployed?: number
  unit: string
  lastUpdated: string
}

export interface RealtimeIncident {
  id: number
  type: string
  location: string
  priority: "low" | "medium" | "high" | "critical"
  time: string
  status: "active" | "responding" | "pending" | "resolved"
  coordinates: string
}

export function useRealtimeData() {
  const [alerts, setAlerts] = useState<RealtimeAlert[]>([
    { id: "1", time: "14:30", type: "Flood", location: "Barangay Centro", priority: "high", status: "active" },
    {
      id: "2",
      time: "14:15",
      type: "Landslide Risk",
      location: "Barangay Norte",
      priority: "medium",
      status: "active",
    },
    { id: "3", time: "13:45", type: "Power Outage", location: "Barangay Sur", priority: "low", status: "active" },
    { id: "4", time: "13:30", type: "Road Blocked", location: "Main Highway", priority: "high", status: "active" },
  ])

  const [evacuationCenters, setEvacuationCenters] = useState<RealtimeEvacuationCenter[]>([
    {
      name: "Barangay Hall - Centro",
      capacity: 200,
      occupied: 140,
      status: "70%",
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Elementary School - Norte",
      capacity: 150,
      occupied: 95,
      status: "63%",
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Community Center - Sur",
      capacity: 180,
      occupied: 165,
      status: "92%",
      lastUpdated: new Date().toISOString(),
    },
    { name: "High School - Este", capacity: 250, occupied: 180, status: "72%", lastUpdated: new Date().toISOString() },
  ])

  const [resources, setResources] = useState<RealtimeResource[]>([
    { item: "Food Packs", available: 850, distributed: 320, unit: "packs", lastUpdated: new Date().toISOString() },
    {
      item: "Water Bottles",
      available: 1200,
      distributed: 680,
      unit: "bottles",
      lastUpdated: new Date().toISOString(),
    },
    { item: "Medicine Kits", available: 45, distributed: 28, unit: "kits", lastUpdated: new Date().toISOString() },
    { item: "Relief Trucks", available: 8, deployed: 5, unit: "trucks", lastUpdated: new Date().toISOString() },
  ])

  const [incidents, setIncidents] = useState<RealtimeIncident[]>([
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
  ])

  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())

      // Simulate random updates
      if (Math.random() > 0.7) {
        // Update evacuation center occupancy
        setEvacuationCenters((prev) =>
          prev.map((center) => {
            const change = Math.floor(Math.random() * 10) - 5
            const newOccupied = Math.max(0, Math.min(center.capacity, center.occupied + change))
            const newStatus = `${Math.round((newOccupied / center.capacity) * 100)}%`

            return {
              ...center,
              occupied: newOccupied,
              status: newStatus,
              lastUpdated: new Date().toISOString(),
            }
          }),
        )
      }

      if (Math.random() > 0.8) {
        // Update resource distribution
        setResources((prev) =>
          prev.map((resource) => {
            const change = Math.floor(Math.random() * 5)
            const newDistributed = Math.min(resource.available, (resource.distributed || 0) + change)

            return {
              ...resource,
              distributed: newDistributed,
              deployed: resource.deployed
                ? Math.min(resource.available, resource.deployed + Math.floor(change / 2))
                : undefined,
              lastUpdated: new Date().toISOString(),
            }
          }),
        )
      }

      if (Math.random() > 0.9) {
        // Add new alert
        const alertTypes = ["Flood", "Landslide", "Power Outage", "Road Blocked", "Medical Emergency"]
        const locations = ["Barangay Centro", "Barangay Norte", "Barangay Sur", "Barangay Este"]
        const priorities: ("low" | "medium" | "high" | "critical")[] = ["low", "medium", "high", "critical"]

        const newAlert: RealtimeAlert = {
          id: Date.now().toString(),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          priority: priorities[Math.floor(Math.random() * priorities.length)],
          status: "active",
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]) // Keep only 10 most recent
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Simulate connection status
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      setIsConnected((prev) => (Math.random() > 0.05 ? true : prev)) // 95% uptime
    }, 10000)

    return () => clearInterval(connectionInterval)
  }, [])

  const addAlert = useCallback((alert: Omit<RealtimeAlert, "id">) => {
    const newAlert: RealtimeAlert = {
      ...alert,
      id: Date.now().toString(),
    }
    setAlerts((prev) => [newAlert, ...prev])
  }, [])

  const updateIncidentStatus = useCallback((id: number, status: RealtimeIncident["status"]) => {
    setIncidents((prev) => prev.map((incident) => (incident.id === id ? { ...incident, status } : incident)))
  }, [])

  const resolveAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, status: "resolved" } : alert)))
  }, [])

  return {
    alerts,
    evacuationCenters,
    resources,
    incidents,
    isConnected,
    lastUpdate,
    addAlert,
    updateIncidentStatus,
    resolveAlert,
  }
}
