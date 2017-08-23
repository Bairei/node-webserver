const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Unable to append the server log')
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(path.join(__dirname, '/public')))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>')
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my page',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
})

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Portfolio page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request :('
  })
})

app.listen(port, () => {
  console.log('The server is up on port 3000')
})
