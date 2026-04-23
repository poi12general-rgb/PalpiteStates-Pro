import { getTodayGames, getTeamStats } from "../../services/apiFootball"
import { analyzeGame } from "../../utils/analysis"

export default async function handler(req, res) {
  try {
    const fixtures = await getTodayGames()

    const games = await Promise.all(
      fixtures.slice(0, 5).map(async (game) => {
        const homeId = game.teams.home.id
        const awayId = game.teams.away.id
        const league = game.league.id
        const season = game.league.season

        const homeStats = await getTeamStats(homeId, league, season)
        const awayStats = await getTeamStats(awayId, league, season)

        const stats = {
          goalsFor:
            homeStats.goals.for.average.total +
            awayStats.goals.for.average.total,
          goalsAgainst:
            homeStats.goals.against.average.total +
            awayStats.goals.against.average.total
        }

        const analysis = analyzeGame(stats)

        return {
          home: game.teams.home.name,
          away: game.teams.away.name,
          probability: analysis.probability,
          recommendation: analysis.recommendation
        }
      })
    )

    res.status(200).json(games)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar jogos" })
  }
}
