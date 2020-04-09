const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


const app = express()

// define path / express config
const pubicDriPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')

// setup handles engine / setup template header footer buat pakai hbs
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)


// setup static directory
app.use(express.static(pubicDriPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Adam'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'In this section will helping you if you need help',
        title: 'Help',
        name: 'Adam'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'adam'
    })
})

app.get('/weather',(req,res)=>{
    // console.log(req.query)
    const address = req.query.address
    if(!address){
        return res.send({
            err: 'Errno, Address cannot be found'
        })
    }
    geoCode(address,(err,{latitude,longtitude,location}={})=>{
        if(err) return res.send({err})
        forecast(latitude,longtitude,(err,forecastData)=>{
            if(err) return res.send({err})
            res.send({
                forecast: forecastData,
                location,
                address : req.query.address
            })
        })
    })
    // res.send('weather')
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'adam',
        errorMassage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    //res.send('Errno 404')
    res.render('404',{
        title: '404',
        name: 'adam',
        errorMassage: 'Page Not found'
    })
})

app.listen(3000,()=>{
    console.log('server lagi jalan di port 3000')
})