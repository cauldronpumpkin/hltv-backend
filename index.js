const express = require('express')
const { HLTV } = require('hltv')

const app = express()
const ws = require('express-ws')(app)

const PORT = process.env.PORT || 3000

app.get('/live_matches', async (_, res) => {
     const matches = await HLTV.getMatches()
     res.send(matches.filter(match => {
          return match.live
     }))
})

app.get('/all_matches', async (_, res) => {
     const matches = await HLTV.getMatches()
     res.send(matches)
})

app.get('/match_info/:match_id', async (req, res) => {
     const match = await HLTV.getMatch({ id: parseInt(req.params.match_id) })
     res.send(match)
})

app.ws('/live_score/:match_id', (s, req) => {
     HLTV.connectToScorebot({
          id: req.params.match_id,
          onScoreboardUpdate: (data, _) => {
               s.send(JSON.stringify(data))
          }
     })
});

app.listen(PORT)