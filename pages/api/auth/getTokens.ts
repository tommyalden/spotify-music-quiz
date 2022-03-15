import type { NextApiRequest, NextApiResponse } from 'next'
import SpotifyWebApi from 'spotify-web-api-node'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code

  if(code == null || Array.isArray(code)) {
    res.status(400).json(null)
    return
  }

  const api = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    redirectUri: "http://localhost:3000/login"
  })

  try {
    const secret = await api.authorizationCodeGrant(code);

    const tokens = { 
      refresh: secret.body.refresh_token
    }
    
    res.status(200).json(tokens)
  } catch(error) {
    console.log(error)
    
    res.status(400).send(null)
  }
}