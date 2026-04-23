import axios from "axios"

const API_URL = "https://v3.football.api-sports.io"

export async function getTodayGames() {
  const response = await axios.get(`${API_URL}/fixtures`, {
    params: {
      date: new Date().toISOString().split("T")[0]
    },
    headers: {
      "x-apisports-key": process.env.API_FOOTBALL_KEY
    }
  })

  return response.data.response
}

export async function getTeamStats(teamId, league, season) {
  const response = await axios.get(`${API_URL}/teams/statistics`, {
    params: {
      team: teamId,
      league,
      season
    },
    headers: {
      "x-apisports-key": process.env.API_FOOTBALL_KEY
    }
  })

  return response.data.response
}
