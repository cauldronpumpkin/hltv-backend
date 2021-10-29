const express = require('express')
const { HLTV } = require('hltv')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
  const matches = await HLTV.getMatches()
  res.send(matches)
})

app.listen(PORT)