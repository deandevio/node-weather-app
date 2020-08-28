const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express()

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "WEATHER",
        name: 'Dean',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "ABOUT PAGE",
        name: 'Deanos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "HELP PAGE",
        name: 'Dean'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You much provide a proper address'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location} ={}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You much provide a proper search'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'DEANOS',
        error: 'THERE IS NO HELP HERE'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'DEANOS',
        error: 'This is an error page message'
    })
})

const PORT = process.env.port || 3000;

app.listen(PORT , () => {
    console.log('app is running on port ' + PORT)
})