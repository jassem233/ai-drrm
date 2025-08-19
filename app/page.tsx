import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">AI-DRRM</h1>
                <p className="text-sm text-muted-foreground">Disaster Risk Reduction Management</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Municipality of Sample City</p>
              <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl mb-4">AI-Powered Disaster Management System</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive disaster risk reduction and management platform for local government units, NGO rescue teams,
            and citizens.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* LGU Admin Dashboard */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">LGU Admin Dashboard</CardTitle>
                <Badge variant="default">Admin</Badge>
              </div>
              <CardDescription>Monitor risks, send alerts, manage evacuation centers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Typhoon Forecast & Tracking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  Flood Risk Heatmaps
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  Evacuation Center Status
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-destructive rounded-full mr-2"></span>
                  Emergency Alert System
                </li>
              </ul>
              <Link href="/admin">
                <Button className="w-full" size="lg">
                  Access Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* NGO Rescue Interface */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">NGO Rescue Interface</CardTitle>
                <Badge variant="secondary">Rescue</Badge>
              </div>
              <CardDescription>Support rescue missions, track volunteers, manage relief</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Live Incident Mapping
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  Relief Distribution Tracking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  Volunteer Management
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-destructive rounded-full mr-2"></span>
                  Real-time Coordination
                </li>
              </ul>
              <Link href="/ngo">
                <Button variant="secondary" className="w-full" size="lg">
                  Access Rescue Interface
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Citizen Mobile App */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">Citizen Mobile App</CardTitle>
                <Badge variant="outline">Citizen</Badge>
              </div>
              <CardDescription>Receive alerts, find safe routes, request help</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Live Emergency Alerts
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  Safe Route Finder
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  Evacuation Centers
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-destructive rounded-full mr-2"></span>
                  Emergency Help Request
                </li>
              </ul>
              <Link href="/citizen">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Access Mobile App
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="font-heading text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">All Systems Operational</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
