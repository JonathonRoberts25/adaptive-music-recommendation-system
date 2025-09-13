"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { WeatherWidget } from "@/components/weather-widget"
import { MoodAnalyzer } from "@/components/mood-analyzer"
import { MusicRecommendations } from "@/components/music-recommendations"
import { EnvironmentalFactors } from "@/components/environmental-factors"
import { PlaylistManager } from "@/components/playlist-manager"
import { Music, Cloud, TrendingUp, Calendar, Settings, Play, Pause } from "lucide-react"

interface SystemState {
  isPlaying: boolean
  currentTrack: string
  volume: number
  moodScore: number
  weatherImpact: number
  holidayFactor: number
  isAnalyzing: boolean
  lastUpdated: Date
  recommendations: string[]
  weatherData: any
}

export function MusicRecommendationDashboard() {
  const [systemState, setSystemState] = useState<SystemState>({
    isPlaying: false,
    currentTrack: "Uplifting Ambient - Perfect for Sunny Shopping",
    volume: 75,
    moodScore: 7.2,
    weatherImpact: 8.5,
    holidayFactor: 6.0,
    isAnalyzing: false,
    lastUpdated: new Date(),
    recommendations: [
      "Uplifting Ambient - Perfect for Sunny Shopping",
      "Energetic Pop - Boost Customer Energy",
      "Calm Jazz - Relaxing Shopping Experience",
    ],
    weatherData: null,
  })

  const [activeTab, setActiveTab] = useState("overview")

  const togglePlayback = () => {
    setSystemState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
      lastUpdated: new Date(),
    }))
    console.log("[v0] Toggled playback:", !systemState.isPlaying)
  }

  const refreshRecommendations = () => {
    setSystemState((prev) => ({ ...prev, isAnalyzing: true }))

    // Simulate API call
    setTimeout(() => {
      const newRecommendations = [
        "Dynamic Pop Mix - High Energy Shopping",
        "Seasonal Holiday Blend - Festive Atmosphere",
        "Weather-Adaptive Ambient - Current Conditions",
        "Customer Flow Optimizer - Peak Hours",
      ]

      setSystemState((prev) => ({
        ...prev,
        isAnalyzing: false,
        recommendations: newRecommendations,
        moodScore: Math.random() * 3 + 7, // 7-10 range
        weatherImpact: Math.random() * 2 + 8, // 8-10 range
        holidayFactor: Math.random() * 4 + 6, // 6-10 range
        lastUpdated: new Date(),
      }))
      console.log("[v0] Refreshed recommendations")
    }, 2000)
  }

  const adjustVolume = (newVolume: number) => {
    setSystemState((prev) => ({ ...prev, volume: newVolume }))
    console.log("[v0] Volume adjusted to:", newVolume)
  }

  const selectTrack = (track: string) => {
    setSystemState((prev) => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      lastUpdated: new Date(),
    }))
    console.log("[v0] Selected track:", track)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">RetailTunes AI</h1>
              <p className="text-sm text-muted-foreground">Smart Music for Shopping Environments</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={systemState.isPlaying ? "default" : "outline"}
                size="sm"
                onClick={togglePlayback}
                className="gap-2"
              >
                {systemState.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {systemState.isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshRecommendations}
                disabled={systemState.isAnalyzing}
                className="gap-2 bg-transparent"
              >
                <TrendingUp className="h-4 w-4" />
                {systemState.isAnalyzing ? "Analyzing..." : "Refresh"}
              </Button>
              <Badge variant="secondary" className="gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Live
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-sidebar p-4">
          <nav className="space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("overview")}
            >
              <TrendingUp className="h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "weather" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("weather")}
            >
              <Cloud className="h-4 w-4" />
              Weather Impact
            </Button>
            <Button
              variant={activeTab === "mood" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("mood")}
            >
              <TrendingUp className="h-4 w-4" />
              Mood Analysis
            </Button>
            <Button
              variant={activeTab === "playlists" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("playlists")}
            >
              <Music className="h-4 w-4" />
              Playlists
            </Button>
            <Button
              variant={activeTab === "calendar" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab("calendar")}
            >
              <Calendar className="h-4 w-4" />
              Seasonal Events
            </Button>
          </nav>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Current Status */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Mood Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{systemState.moodScore}/10</div>
                    <Progress value={systemState.moodScore * 10} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Excellent mood enhancement</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Weather Alignment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-secondary">{systemState.weatherImpact}/10</div>
                    <Progress value={systemState.weatherImpact * 10} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Perfect weather match</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Seasonal Factor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">{systemState.holidayFactor}/10</div>
                    <Progress value={systemState.holidayFactor * 10} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Holiday season active</p>
                  </CardContent>
                </Card>
              </div>

              {/* Current Track */}
              <Card>
                <CardHeader>
                  <CardTitle>Now Playing</CardTitle>
                  <CardDescription>
                    AI-selected based on current conditions • Last updated:{" "}
                    {systemState.lastUpdated.toLocaleTimeString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Music className={`h-8 w-8 text-white ${systemState.isPlaying ? "animate-pulse" : ""}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{systemState.currentTrack}</h3>
                      <p className="text-sm text-muted-foreground">Recommended for current weather and mood</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Uplifting</Badge>
                        <Badge variant="outline">Sunny Day</Badge>
                        <Badge variant="outline">High Energy</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-sm text-muted-foreground">Volume:</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={systemState.volume}
                          onChange={(e) => adjustVolume(Number(e.target.value))}
                          className="flex-1 max-w-32"
                        />
                        <span className="text-sm font-medium w-8">{systemState.volume}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Insights */}
              <div className="grid gap-4 md:grid-cols-2">
                <WeatherWidget />
                <MoodAnalyzer />
              </div>

              <MusicRecommendations />
            </div>
          )}

          {activeTab === "weather" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Weather Impact Analysis</h2>
                <Badge variant="secondary">Real-time Data</Badge>
              </div>
              <EnvironmentalFactors />
              <WeatherWidget detailed />
            </div>
          )}

          {activeTab === "mood" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Customer Mood Analysis</h2>
                <Badge variant="secondary">AI Powered</Badge>
              </div>
              <MoodAnalyzer detailed />
            </div>
          )}

          {activeTab === "playlists" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Smart Playlists</h2>
                <Button
                  onClick={() => {
                    const newPlaylist = `Custom Playlist ${Date.now()}`
                    console.log("[v0] Creating playlist:", newPlaylist)
                    alert(`Creating playlist: ${newPlaylist}`)
                  }}
                >
                  Create New Playlist
                </Button>
              </div>
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Recommendations</CardTitle>
                    <CardDescription>Click any track to play</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {systemState.recommendations.map((track, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                            systemState.currentTrack === track ? "bg-primary/10 border-primary" : ""
                          }`}
                          onClick={() => selectTrack(track)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                              <Music className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{track}</span>
                          </div>
                          {systemState.currentTrack === track && systemState.isPlaying && (
                            <Badge variant="default">Playing</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <PlaylistManager />
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Seasonal Events & Holidays</h2>
                <Badge variant="secondary">Auto-Updated</Badge>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events that may affect customer mood and music preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Christmas Season</h4>
                        <p className="text-sm text-muted-foreground">December 1-25</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">New Year Preparation</h4>
                        <p className="text-sm text-muted-foreground">December 26-31</p>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Valentine's Day</h4>
                        <p className="text-sm text-muted-foreground">February 1-14</p>
                      </div>
                      <Badge variant="outline">Future</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
