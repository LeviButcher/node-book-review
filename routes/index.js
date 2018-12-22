const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('test', { title: 'Test' })
})

router.get('/pug', (req, res) => {
  res.json({ pug: 'are okay' })
})

module.exports = router
