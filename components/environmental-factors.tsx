"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, TrendingUp } from "lucide-react"

export function EnvironmentalFactors() {
  const factors = [
    {
      name: "Time of Day",
      value: "Afternoon Peak",
      impact: 7.5,
      description: "2:30 PM - High shopping activity period",
      recommendation: "Maintain moderate energy, avoid overstimulation",
      icon: Clock,
    },
    {
      name: "Day of Week",
      value: "Saturday",
      impact: 8.2,
      description: "Weekend shopping - families and leisure shoppers",
      recommendation: "Family-friendly, upbeat but not aggressive",
      icon: Calendar,
    },
    {
      name: "Location Context",
      value: "Suburban Mall",
      impact: 6.8,
      description: "Mixed demographics, family-oriented",
      recommendation: "Broad appeal, avoid niche genres",
      icon: MapPin,
    },
    {
      name: "Seasonal Factor",
      value: "Holiday Season",
      impact: 9.1,
      description: "Christmas shopping period - high emotional engagement",
      recommendation: "Mix holiday classics with contemporary favorites",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {factors.map((factor) => {
        const Icon = factor.icon
        return (
          <Card key={factor.name}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Icon className="h-4 w-4 text-primary" />
                {factor.name}
              </CardTitle>
              <CardDescription>{factor.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{factor.value}</span>
                  <Badge variant="secondary">{factor.impact}/10 impact</Badge>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Influence Level</span>
                    <span>{factor.impact}/10</span>
                  </div>
                  <Progress value={factor.impact * 10} />
                </div>

                <div className="text-xs text-muted-foreground">
                  <strong>Recommendation:</strong> {factor.recommendation}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
