"""
Music Recommendation Engine for Retail Environments
Based on research findings about weather, mood, and shopping behavior
"""

import json
import datetime
from typing import Dict, List, Tuple
from dataclasses import dataclass
from enum import Enum

class WeatherCondition(Enum):
    SUNNY = "sunny"
    CLOUDY = "cloudy"
    RAINY = "rainy"
    SNOWY = "snowy"
    STORMY = "stormy"

class MoodState(Enum):
    HIGH_ENERGY = "high_energy"
    MODERATE_ENERGY = "moderate_energy"
    LOW_ENERGY = "low_energy"
    RELAXED = "relaxed"
    STRESSED = "stressed"

class SeasonalEvent(Enum):
    CHRISTMAS = "christmas"
    NEW_YEAR = "new_year"
    VALENTINES = "valentines"
    SPRING = "spring"
    SUMMER = "summer"
    FALL = "fall"
    WINTER = "winter"
    BACK_TO_SCHOOL = "back_to_school"

@dataclass
class EnvironmentalFactors:
    weather: WeatherCondition
    temperature: float
    humidity: float
    time_of_day: int  # 0-23 hour format
    day_of_week: int  # 0-6, Monday=0
    seasonal_event: SeasonalEvent = None
    customer_count: int = 0
    avg_age_group: str = "mixed"  # young, middle, senior, mixed

@dataclass
class MusicTrack:
    title: str
    artist: str
    genre: str
    tempo: int  # BPM
    energy_level: float  # 0-10
    mood_tags: List[str]
    weather_suitability: List[WeatherCondition]
    seasonal_relevance: List[SeasonalEvent]
    duration: int  # seconds

class MusicRecommendationEngine:
    def __init__(self):
        self.music_database = self._initialize_music_database()
        self.weather_mood_mapping = self._create_weather_mood_mapping()
        self.time_energy_mapping = self._create_time_energy_mapping()
        
    def _initialize_music_database(self) -> List[MusicTrack]:
        """Initialize with sample music tracks based on research findings"""
        return [
            # Sunny day tracks - Research shows sunny weather increases spending by 11.9%
            MusicTrack("Good Vibes", "Artist A", "Pop", 120, 8.5, 
                      ["upbeat", "energetic", "positive"], 
                      [WeatherCondition.SUNNY], [SeasonalEvent.SUMMER]),
            
            MusicTrack("Sunshine Melody", "Artist B", "Indie Pop", 115, 8.0,
                      ["feel-good", "optimistic", "bright"],
                      [WeatherCondition.SUNNY], [SeasonalEvent.SPRING, SeasonalEvent.SUMMER]),
            
            # Rainy day tracks - Research shows 9.7% less spending on rainy days
            MusicTrack("Cozy Afternoon", "Artist C", "Ambient", 80, 5.5,
                      ["relaxing", "soothing", "comfortable"],
                      [WeatherCondition.RAINY, WeatherCondition.CLOUDY], [SeasonalEvent.FALL]),
            
            MusicTrack("Gentle Rain", "Artist D", "Acoustic", 75, 4.8,
                      ["calm", "peaceful", "introspective"],
                      [WeatherCondition.RAINY], [SeasonalEvent.FALL, SeasonalEvent.WINTER]),
            
            # Holiday tracks - 75% of shoppers report holiday music enhances experience
            MusicTrack("Jingle Bell Rock", "Traditional", "Holiday", 130, 7.5,
                      ["festive", "nostalgic", "joyful"],
                      [WeatherCondition.SNOWY, WeatherCondition.CLOUDY], [SeasonalEvent.CHRISTMAS]),
            
            MusicTrack("Winter Wonderland", "Traditional", "Holiday", 110, 6.8,
                      ["magical", "cozy", "traditional"],
                      [WeatherCondition.SNOWY], [SeasonalEvent.CHRISTMAS]),
            
            # High energy tracks for peak hours
            MusicTrack("Energy Boost", "Artist E", "Electronic Pop", 128, 9.0,
                      ["energetic", "motivating", "dynamic"],
                      [WeatherCondition.SUNNY, WeatherCondition.CLOUDY], [SeasonalEvent.SUMMER]),
            
            # Low energy tracks for stress reduction
            MusicTrack("Peaceful Moments", "Artist F", "New Age", 65, 3.5,
                      ["calming", "meditative", "stress-relief"],
                      [WeatherCondition.CLOUDY, WeatherCondition.RAINY], [SeasonalEvent.WINTER])
        ]
    
    def _create_weather_mood_mapping(self) -> Dict[WeatherCondition, Dict]:
        """Map weather conditions to mood impacts based on research"""
        return {
            WeatherCondition.SUNNY: {
                "mood_boost": 8.5,
                "energy_increase": 7.8,
                "spending_impact": 1.119,  # 11.9% increase
                "preferred_tempo": (110, 140),
                "preferred_energy": (7.0, 9.5)
            },
            WeatherCondition.CLOUDY: {
                "mood_boost": 5.5,
                "energy_increase": 5.2,
                "spending_impact": 0.95,
                "preferred_tempo": (90, 120),
                "preferred_energy": (5.0, 7.5)
            },
            WeatherCondition.RAINY: {
                "mood_boost": 4.2,
                "energy_increase": 3.8,
                "spending_impact": 0.903,  # 9.7% decrease
                "preferred_tempo": (70, 100),
                "preferred_energy": (3.0, 6.0)
            },
            WeatherCondition.SNOWY: {
                "mood_boost": 6.0,
                "energy_increase": 4.5,
                "spending_impact": 0.92,
                "preferred_tempo": (80, 110),
                "preferred_energy": (4.0, 7.0)
            }
        }
    
    def _create_time_energy_mapping(self) -> Dict[int, float]:
        """Map time of day to optimal energy levels based on shopping patterns"""
        return {
            9: 6.0,   # Morning opening - moderate energy
            10: 6.5,  # Building energy
            11: 7.0,  # Pre-lunch peak
            12: 7.5,  # Lunch hour - high energy
            13: 8.0,  # Afternoon peak
            14: 8.2,  # Peak shopping hours (research shows 2-4 PM peak)
            15: 8.0,  # Continued peak
            16: 7.5,  # Slight decline
            17: 7.0,  # Evening shoppers
            18: 6.5,  # Dinner time
            19: 6.0,  # Evening wind down
            20: 5.5,  # Closing preparation
            21: 5.0   # Late evening
        }
    
    def calculate_mood_score(self, factors: EnvironmentalFactors) -> float:
        """Calculate overall mood score based on environmental factors"""
        base_score = 5.0
        
        # Weather impact
        weather_data = self.weather_mood_mapping.get(factors.weather, {})
        weather_boost = weather_data.get("mood_boost", 5.0)
        
        # Temperature impact (research shows moderate temps = higher mood)
        temp_score = 5.0
        if 65 <= factors.temperature <= 75:  # Optimal temperature range
            temp_score = 8.0
        elif 60 <= factors.temperature <= 80:
            temp_score = 7.0
        elif factors.temperature < 50 or factors.temperature > 85:
            temp_score = 4.0
        
        # Time of day impact
        time_energy = self.time_energy_mapping.get(factors.time_of_day, 5.0)
        
        # Day of week impact (weekends typically higher mood)
        day_boost = 1.2 if factors.day_of_week in [5, 6] else 1.0  # Saturday, Sunday
        
        # Seasonal event boost
        seasonal_boost = 1.0
        if factors.seasonal_event == SeasonalEvent.CHRISTMAS:
            seasonal_boost = 1.3  # Research shows significant holiday mood boost
        elif factors.seasonal_event in [SeasonalEvent.VALENTINES, SeasonalEvent.NEW_YEAR]:
            seasonal_boost = 1.15
        
        # Calculate weighted score
        mood_score = (
            (weather_boost * 0.3) +
            (temp_score * 0.2) +
            (time_energy * 0.25) +
            (base_score * 0.25)
        ) * day_boost * seasonal_boost
        
        return min(10.0, max(1.0, mood_score))
    
    def get_recommendations(self, factors: EnvironmentalFactors, num_tracks: int = 5) -> List[Tuple[MusicTrack, float]]:
        """Get music recommendations with confidence scores"""
        mood_score = self.calculate_mood_score(factors)
        weather_data = self.weather_mood_mapping.get(factors.weather, {})
        
        recommendations = []
        
        for track in self.music_database:
            confidence = self._calculate_track_confidence(track, factors, mood_score, weather_data)
            recommendations.append((track, confidence))
        
        # Sort by confidence and return top recommendations
        recommendations.sort(key=lambda x: x[1], reverse=True)
        return recommendations[:num_tracks]
    
    def _calculate_track_confidence(self, track: MusicTrack, factors: EnvironmentalFactors, 
                                  mood_score: float, weather_data: Dict) -> float:
        """Calculate confidence score for a track recommendation"""
        confidence = 0.0
        
        # Weather suitability
        if factors.weather in track.weather_suitability:
            confidence += 3.0
        
        # Seasonal relevance
        if factors.seasonal_event and factors.seasonal_event in track.seasonal_relevance:
            confidence += 2.5
        
        # Tempo matching
        preferred_tempo = weather_data.get("preferred_tempo", (80, 120))
        if preferred_tempo[0] <= track.tempo <= preferred_tempo[1]:
            confidence += 2.0
        
        # Energy level matching
        preferred_energy = weather_data.get("preferred_energy", (4.0, 7.0))
        if preferred_energy[0] <= track.energy_level <= preferred_energy[1]:
            confidence += 2.0
        
        # Time of day appropriateness
        time_energy = self.time_energy_mapping.get(factors.time_of_day, 5.0)
        energy_diff = abs(track.energy_level - time_energy)
        if energy_diff <= 1.0:
            confidence += 1.5
        elif energy_diff <= 2.0:
            confidence += 1.0
        
        return confidence
    
    def generate_playlist(self, factors: EnvironmentalFactors, duration_minutes: int = 60) -> Dict:
        """Generate a complete playlist for given conditions"""
        target_duration = duration_minutes * 60  # Convert to seconds
        current_duration = 0
        playlist = []
        
        # Get recommendations
        recommendations = self.get_recommendations(factors, num_tracks=20)
        
        # Build playlist to target duration
        for track, confidence in recommendations:
            if current_duration + track.duration <= target_duration:
                playlist.append({
                    "track": track,
                    "confidence": confidence,
                    "reason": self._generate_reason(track, factors)
                })
                current_duration += track.duration
            
            if current_duration >= target_duration * 0.9:  # 90% of target duration
                break
        
        mood_score = self.calculate_mood_score(factors)
        
        return {
            "playlist": playlist,
            "total_duration": current_duration,
            "mood_score": mood_score,
            "weather_impact": self.weather_mood_mapping.get(factors.weather, {}).get("spending_impact", 1.0),
            "optimization_summary": self._generate_optimization_summary(factors, mood_score)
        }
    
    def _generate_reason(self, track: MusicTrack, factors: EnvironmentalFactors) -> str:
        """Generate human-readable reason for track selection"""
        reasons = []
        
        if factors.weather in track.weather_suitability:
            reasons.append(f"Perfect for {factors.weather.value} weather")
        
        if factors.seasonal_event and factors.seasonal_event in track.seasonal_relevance:
            reasons.append(f"Ideal for {factors.seasonal_event.value} season")
        
        if track.energy_level >= 7.0:
            reasons.append("High energy to boost customer mood")
        elif track.energy_level <= 4.0:
            reasons.append("Calming effect to reduce stress")
        
        return "; ".join(reasons) if reasons else "Good general fit for current conditions"
    
    def _generate_optimization_summary(self, factors: EnvironmentalFactors, mood_score: float) -> str:
        """Generate summary of optimization strategy"""
        weather_impact = self.weather_mood_mapping.get(factors.weather, {}).get("spending_impact", 1.0)
        
        summary = f"Mood optimization score: {mood_score:.1f}/10. "
        
        if weather_impact > 1.05:
            summary += "Weather conditions favor increased spending - using energetic, upbeat tracks. "
        elif weather_impact < 0.95:
            summary += "Weather may reduce spending - using comforting, mood-lifting tracks. "
        
        if factors.seasonal_event == SeasonalEvent.CHRISTMAS:
            summary += "Holiday season active - incorporating festive elements to enhance nostalgia and generosity. "
        
        time_energy = self.time_energy_mapping.get(factors.time_of_day, 5.0)
        if time_energy >= 7.5:
            summary += "Peak shopping hours - maintaining high energy without overstimulation."
        elif time_energy <= 5.0:
            summary += "Low energy period - using gentle, ambient tracks to create comfortable atmosphere."
        
        return summary

# Example usage and testing
def main():
    engine = MusicRecommendationEngine()
    
    # Test scenario 1: Sunny Saturday afternoon during Christmas season
    factors1 = EnvironmentalFactors(
        weather=WeatherCondition.SUNNY,
        temperature=68,
        humidity=45,
        time_of_day=14,  # 2 PM
        day_of_week=5,   # Saturday
        seasonal_event=SeasonalEvent.CHRISTMAS,
        customer_count=45
    )
    
    print("=== Scenario 1: Sunny Saturday Afternoon, Christmas Season ===")
    playlist1 = engine.generate_playlist(factors1, duration_minutes=90)
    print(f"Mood Score: {playlist1['mood_score']:.1f}/10")
    print(f"Weather Impact: {playlist1['weather_impact']:.1%}")
    print(f"Optimization: {playlist1['optimization_summary']}")
    print("\nRecommended Tracks:")
    for i, item in enumerate(playlist1['playlist'][:5], 1):
        track = item['track']
        print(f"{i}. {track.title} by {track.artist} (Confidence: {item['confidence']:.1f})")
        print(f"   Reason: {item['reason']}")
    
    print("\n" + "="*60 + "\n")
    
    # Test scenario 2: Rainy Tuesday evening
    factors2 = EnvironmentalFactors(
        weather=WeatherCondition.RAINY,
        temperature=55,
        humidity=75,
        time_of_day=18,  # 6 PM
        day_of_week=1,   # Tuesday
        customer_count=12
    )
    
    print("=== Scenario 2: Rainy Tuesday Evening ===")
    playlist2 = engine.generate_playlist(factors2, duration_minutes=60)
    print(f"Mood Score: {playlist2['mood_score']:.1f}/10")
    print(f"Weather Impact: {playlist2['weather_impact']:.1%}")
    print(f"Optimization: {playlist2['optimization_summary']}")
    print("\nRecommended Tracks:")
    for i, item in enumerate(playlist2['playlist'][:5], 1):
        track = item['track']
        print(f"{i}. {track.title} by {track.artist} (Confidence: {item['confidence']:.1f})")
        print(f"   Reason: {item['reason']}")

if __name__ == "__main__":
    main()
