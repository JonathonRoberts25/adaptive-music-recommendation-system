"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Edit, Trash2, Copy, MoreHorizontal } from "lucide-react"

export function PlaylistManager() {
  const playlists = [
    {
      id: 1,
      name: "Sunny Day Vibes",
      description: "Upbeat tracks for bright, sunny shopping days",
      tracks: 32,
      duration: "2h 15m",
      lastUsed: "2 hours ago",
      performance: 8.7,
      conditions: ["Sunny", "High Energy", "Daytime"],
      status: "active",
    },
    {
      id: 2,
      name: "Rainy Day Comfort",
      description: "Soothing music for overcast and rainy conditions",
      tracks: 28,
      duration: "1h 52m",
      lastUsed: "3 days ago",
      performance: 7.9,
      conditions: ["Rainy", "Low Energy", "Cozy"],
      status: "inactive",
    },
    {
      id: 3,
      name: "Holiday Magic",
      description: "Festive holiday music for the Christmas season",
      tracks: 45,
      duration: "3h 8m",
      lastUsed: "1 day ago",
      performance: 9.2,
      conditions: ["Christmas", "Festive", "Nostalgic"],
      status: "active",
    },
    {
      id: 4,
      name: "Evening Wind Down",
      description: "Relaxing tracks for late afternoon and evening",
      tracks: 24,
      duration: "1h 38m",
      lastUsed: "5 hours ago",
      performance: 8.1,
      conditions: ["Evening", "Relaxed", "Ambient"],
      status: "scheduled",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "scheduled":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      {playlists.map((playlist) => (
        <Card key={playlist.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {playlist.name}
                  <Badge variant={getStatusColor(playlist.status)}>{playlist.status}</Badge>
                </CardTitle>
                <CardDescription>{playlist.description}</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span>{playlist.tracks} tracks</span>
                  <span>{playlist.duration}</span>
                  <span>Performance: {playlist.performance}/10</span>
                </div>
                <span className="text-muted-foreground">Last used: {playlist.lastUsed}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {playlist.conditions.map((condition) => (
                  <Badge key={condition} variant="outline" className="text-xs">
                    {condition}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" className="gap-1">
                  <Play className="h-3 w-3" />
                  Play Now
                </Button>
                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                  <Copy className="h-3 w-3" />
                  Duplicate
                </Button>
                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
