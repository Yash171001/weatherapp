const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('forecast')
const geocode = require('geocode')

const app = express()

const paths = path.join(__dirname,'../public')
const viewpaths = path.join(__dirname,'../templates/views')
const partialspaths = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpaths)
hbs.registerPartials(partialspaths)
app.use(express.static(paths))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
})
geocode(req.query.address,(error,{lattitutde,longitude,location})=>{
    if(error)
      return res.send({error})
 
    forecast(lattitutde,longitude,(error,forecastdata)=>{
        if(error)
      return res.send({error})
    })
    
    res.send({
        forecast:forecastdata,
        location,
        address:req.query.address
    })  
})

app.listen(3000,()=>{
    console.log('hello malika i love you')
})