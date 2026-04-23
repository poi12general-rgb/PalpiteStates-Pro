export function analyzeGame(stats) {
  const { goalsFor, goalsAgainst } = stats

  const avgGoals = (goalsFor + goalsAgainst) / 2

  let probability = 0

  if (avgGoals >= 3) probability = 75
  else if (avgGoals >= 2.5) probability = 65
  else if (avgGoals >= 2) probability = 55
  else probability = 45

  return {
    probability,
    recommendation: probability >= 65 ? "Over 2.5 ✅" : "Evitar ❌"
  }
}
