"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Star } from "lucide-react"

export function MusicRecommendations() {
  const recommendations = [
    {
      id: 1,
      title: "Sunny Day Shopping Mix",
      description: "Perfect for bright, energetic shopping atmosphere",
      tracks: 24,
      duration: "1h 32m",
      moodMatch: 9.2,
      weatherMatch: 9.5,
      tags: ["Upbeat", "Energetic", "Feel-Good"],
      reason: "Sunny weather + high customer energy",
    },
    {
      id: 2,
      title: "Holiday Cheer Collection",
      description: "Festive music to enhance holiday shopping",
      tracks: 18,
      duration: "1h 15m",
      moodMatch: 8.7,
      weatherMatch: 7.2,
      tags: ["Holiday", "Festive", "Nostalgic"],
      reason: "Christmas season + positive mood",
    },
    {
      id: 3,
      title: "Afternoon Energy Boost",
      description: "Combat afternoon lull with motivating tracks",
      tracks: 20,
      duration: "1h 28m",
      moodMatch: 8.1,
      weatherMatch: 8.0,
      tags: ["Motivational", "Pop", "Uplifting"],
      reason: "Time of day + energy level optimization",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Music Recommendations</CardTitle>
        <CardDescription>Curated playlists based on current conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((playlist) => (
            <div key={playlist.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{playlist.title}</h3>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{playlist.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{playlist.tracks} tracks</span>
                    <span>{playlist.duration}</span>
                    <span>Mood: {playlist.moodMatch}/10</span>
                    <span>Weather: {playlist.weatherMatch}/10</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {playlist.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    <strong>Why recommended:</strong> {playlist.reason}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button size="sm" className="gap-1">
                    <Play className="h-3 w-3" />
                    Play
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                    <Plus className="h-3 w-3" />
                    Queue
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
