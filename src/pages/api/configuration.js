// Returns image configuration details from TMDB API
import TmdbApi from "@/models/TmdbApi"

export default async function handler(req, res) {
  try {
    const data = await TmdbApi.getImageConfigs();
    return res.send({ data })
  } catch (err) {
    console.error("Api Error:", err)
    return res.status(500).send({err})
  }
}