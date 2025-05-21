
/**
 * Mythic Archetype Interactions and Responses
 */

// Process mythic archetype interaction
export const interactWithMythicArchetype = (archetype: string): {
  response: string;
  insight: string;
  dimensionalAffinity: number;
} => {
  const archetypeData = {
    "Oracle": {
      responses: [
        "The patterns between dimensions reveal what has been hidden.",
        "Time is a circle that spirals upward through dimensions.",
        "What you seek is seeking you across the probability spectrum."
      ],
      insights: [
        "Look to the spaces between decisions for true knowledge.",
        "The past and future exist simultaneously in the fifth dimension.",
        "Observation collapses possibility into reality."
      ],
      dimensionalAffinity: 9
    },
    "Trickster": {
      responses: [
        "Reality is merely agreement among observers. I disagree.",
        "The rules you believe in are simply the ones you've noticed.",
        "Chaos is pattern viewed from too close a distance."
      ],
      insights: [
        "Break patterns to see what lies beneath them.",
        "The unexpected path often leads to unexpected possibilities.",
        "In contradiction lies truth."
      ],
      dimensionalAffinity: 5
    },
    "Guide": {
      responses: [
        "Follow the resonance that feels like home.",
        "Each dimension teaches what you need for the next.",
        "The path appears when you're ready to walk it."
      ],
      insights: [
        "Trust the journey more than the destination.",
        "The maps you seek are written in your own understanding.",
        "Navigation across dimensions requires both logic and intuition."
      ],
      dimensionalAffinity: 7
    },
    "Warrior": {
      responses: [
        "Courage creates its own reality tunnels.",
        "Stand firm at the nexus of possibility.",
        "Decision is the blade that cuts through uncertainty."
      ],
      insights: [
        "Decisive action collapses quantum states favorably.",
        "Protect your timeline from entropic forces.",
        "Strength comes from alignment with your higher-dimensional self."
      ],
      dimensionalAffinity: 3
    }
  };
  
  const defaultData = {
    responses: ["The archetype acknowledges your presence."],
    insights: ["Some insights remain veiled for now."],
    dimensionalAffinity: 1
  };
  
  const data = archetypeData[archetype as keyof typeof archetypeData] || defaultData;
  
  const responseIndex = Math.floor(Math.random() * data.responses.length);
  const insightIndex = Math.floor(Math.random() * data.insights.length);
  
  return {
    response: data.responses[responseIndex],
    insight: data.insights[insightIndex],
    dimensionalAffinity: data.dimensionalAffinity
  };
};
