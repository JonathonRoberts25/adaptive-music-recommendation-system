"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Clock, BarChart3 } from "lucide-react"

interface MoodAnalyzerProps {
  detailed?: boolean
}

export function MoodAnalyzer({ detailed = false }: MoodAnalyzerProps) {
  const moodData = {
    overallMood: 7.2,
    energyLevel: 6.8,
    stressLevel: 3.2,
    positivity: 8.1,
    customerCount: 45,
    peakHours: "2-4 PM",
    trends: [
      { time: "9 AM", mood: 6.5 },
      { time: "11 AM", mood: 7.0 },
      { time: "1 PM", mood: 7.5 },
      { time: "3 PM", mood: 7.2 },
      { time: "5 PM", mood: 6.8 },
    ],
  }

  if (!detailed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Mood Analysis
          </CardTitle>
          <CardDescription>Real-time customer mood assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Overall Mood</span>
              <span className="text-sm font-medium text-primary">{moodData.overallMood}/10</span>
            </div>
            <Progress value={moodData.overallMood * 10} />

            <div className="flex items-center justify-between">
              <span className="text-sm">Energy Level</span>
              <span className="text-sm font-medium">{moodData.energyLevel}/10</span>
            </div>
            <Progress value={moodData.energyLevel * 10} />

            <div className="pt-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{moodData.customerCount} customers analyzed</span>
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
            <BarChart3 className="h-5 w-5 text-primary" />
            Mood Metrics
          </CardTitle>
          <CardDescription>Current customer emotional state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Mood</span>
                <span>{moodData.overallMood}/10</span>
              </div>
              <Progress value={moodData.overallMood * 10} />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Energy Level</span>
                <span>{moodData.energyLevel}/10</span>
              </div>
              <Progress value={moodData.energyLevel * 10} />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Positivity</span>
                <span>{moodData.positivity}/10</span>
              </div>
              <Progress value={moodData.positivity * 10} />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Stress Level</span>
                <span>{moodData.stressLevel}/10</span>
              </div>
              <Progress value={moodData.stressLevel * 10} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mood Insights</CardTitle>
          <CardDescription>Analysis and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{moodData.customerCount} customers analyzed</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Peak mood: {moodData.peakHours}</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recommended Actions:</h4>
              <div className="space-y-1">
                <Badge variant="secondary" className="text-xs">
                  Maintain upbeat tempo
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Add energizing tracks
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Reduce stress-inducing sounds
                </Badge>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              High positivity detected. Current music selection is effectively enhancing customer mood.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
