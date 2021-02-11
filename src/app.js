const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const app = express()


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'zakaria',
        title: 'Weather',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'zakaria',
        title: 'About',
    })
})

app.get('/help', (req, res) => {
    res.render('help',  {
        name: 'zakaria',
        title: 'Help',
    })
})
app.get('/weather', (req, res) => {
    const { address } = req.query

    if (!address) {
        return res.send({
            error: 'You should provide an address!'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
       
        
        forcast(latitude,longitude,  (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address
             })
            
        })
    })
   
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'zakaria',
        message: 'Help article not found',

    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'zakaria',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})