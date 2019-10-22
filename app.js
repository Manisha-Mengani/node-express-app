// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security

// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way



app.get('/', function (req, res) {
  res.send('Welcome to the North west Missouri State University!  <br> <br>' +
    'Lets Try going to different URIs which are the courses offered at ACS by adding these at the end: <br> <br>' +
    '/ACS <br>' +
    '/Web <br>' +
    '/node js <br>' +
    '/name <br>' +
    '/college_id/Snumber <br>' +
   
    '/fortune <br>' +
    '/fullname/?first=Manisha&last=Mengani <br>' +
    '/refer_websites'+
    '<br> <br>' +
    'Fork the source code from <a href="https://github.com/denisecase/node-express-app">https://github.com/denisecase/node-express-app</a>'
  )
})

// or use the new arrow function syntax
// respond with text
app.get('/ACS', (req, res) => {
  res.send('Applied Computer Science')
})

// or respond with html
app.get('/Web', (req, res) => {
  res.send('<h1><em>Its fun learning web apps!</em></h1>')
})

// or respond with JSON
app.get('/node js', (req, res) => {
  res.send('{"name" : "Node.js"}')
})

app.get('/name', (req, res) => {
  res.send('{"name" : "Manisha"}')
})
// :name indicates a parameter at this location in the URI
app.get('/college_id/:id', (req, res) => {
  res.send(`Hello! The id provided was ${req.params.id}.`)
})

// combine your skills and get creative


// provide multiple query parameters (named first and last) with ? and &
app.get('/fullname', (req, res) => {
  const first = req.query.first
  const last = req.query.last
  res.send(`Hello ${first} ${last}!`)
})

app.get('/refer_websites', function (req, res) {
  res.send('Welcome to the North west Missouri State University! <br> <br>' +
    'Below are some useful links for BearCats  <br> <br>' +
    '<ul>'+
    '<li>'+
    '<a href="https://www.nwmissouri.edu/login/">Northwest online</a>'+
    '</li>'+
    
    '</ul>'+
    '<hr>'
  )
})
let fortunes = ['blue.', 'green.', 'yellow.', 'voilet.',
'cream.', 'red', 'purple', 'pink.', 'black.', 'orange.',
'white.']

// Implements a Magic 8 Ball service
app.get('/favorite_colour', (req,res) => {
  if(isEmpty(req.query)){
    res.send('<h2>You wish to know your favourite color?</h2>' +
             '<p>Ask a question in the query string, e.g., http://localhost:3002/favorite_colour?Whats my favourite color? <br/>' +
             '<p>The Magic color Ball will answer!</p>')
  } else {
    res.send(`The favourite color  is ... wait for it ... ${fortunes[randomInt(0, fortunes.length)]}`)
  }
})

// Use middleware to handle all non-managed routes (e.g. /xyz)
// https://expressjs.com/en/api.html#req.originalUrl
app.use((req, res, next) => {
  res.status(404).send(`status 404 - ${req.originalUrl} was not found`);
})

// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /hello`)
  console.log(`   Try /big`)
  console.log(`   Try /json`)
  console.log(`   Try /fortune`)
  console.log(`   Try /greeting/yourname`)
  console.log(`   Try /yo/Dr.Rogers`)
  console.log(`   Try /fancy/?first=Denise&last=Case`)
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})

// Utility to see if an object is empty or not

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// generates a random value in [low,high) 
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}