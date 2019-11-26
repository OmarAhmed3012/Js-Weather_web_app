const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const darksky = require('./utils/darksky.js')


const app = express()
const port = process.env.PORT || 3000

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handelbars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static dir. to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'omar ahmed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'omar ahmed'
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'help page',
        name: 'omar ahmed abd elfatah'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
        error: 'must provide an address'
        })
    }
    
geocode(req.query.address, (error, {lat, long, location} = {}) => {
    if(error){
        return res.send({ error })
    }
    
    darksky(lat,long, (error, darkdata) => {
        if(error){
            return res.send({ error })
        }
       
    res.send({
        forecast: darkdata,
        location: location,
        address: req.query.address
    })
    })
    })
    })

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'must provide search'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorname: "page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})

