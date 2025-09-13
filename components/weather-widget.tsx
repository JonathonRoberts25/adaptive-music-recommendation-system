"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sun, Droplets, Wind } from "lucide-react"

interface WeatherWidgetProps {
  detailed?: boolean
}

export function WeatherWidget({ detailed = false }: WeatherWidgetProps) {
  const weatherData = {
    condition: "Sunny",
    temperature: 72,
    humidity: 45,
    windSpeed: 8,
    moodImpact: 8.5,
    musicRecommendation: "Upbeat, energetic tracks",
    icon: Sun,
  }

  const WeatherIcon = weatherData.icon

  if (!detailed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WeatherIcon className="h-5 w-5 text-yellow-500" />
            Weather Impact
          </CardTitle>
          <CardDescription>Current conditions affecting customer mood</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Condition</span>
              <Badge variant="secondary">{weatherData.condition}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Temperature</span>
              <span className="text-sm font-medium">{weatherData.temperature}°F</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mood Impact</span>
              <span className="text-sm font-medium text-primary">{weatherData.moodImpact}/10</span>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">Recommendation: {weatherData.musicRecommendation}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WeatherIcon className="h-5 w-5 text-yellow-500" />
            Current Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{weatherData.temperature}°F</div>
              <p className="text-muted-foreground">{weatherData.condition}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{weatherData.humidity}%</p>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{weatherData.windSpeed} mph</p>
                  <p className="text-xs text-muted-foreground">Wind</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weather-Music Correlation</CardTitle>
          <CardDescription>How current weather affects music selection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mood Enhancement</span>
                <span>{weatherData.moodImpact}/10</span>
              </div>
              <Progress value={weatherData.moodImpact * 10} />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recommended Music Types:</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Upbeat Pop</Badge>
                <Badge variant="outline">Energetic</Badge>
                <Badge variant="outline">Feel-Good</Badge>
                <Badge variant="outline">Motivational</Badge>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Sunny weather increases serotonin levels, making customers more likely to respond positively to upbeat,
              energetic music.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
