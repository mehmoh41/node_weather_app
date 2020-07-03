// const path = require('path')
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const port = process.env.PORT || 3000
const Weather = require('./utils/weatherApi')
const geoCode = require('./utils/geocode')
// define path for express config
const dire = path.join(__dirname , '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')
//telling express which template engine to use
// set up handlebars engine and views location
app.set('view engine','hbs') // used when all our hbs are inside view folder
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(dire))

app.get('' , (req ,res) => {
    res.render('index',{
        title : 'this is wednesday',
        name : 'mehdi mohammadi'
    })
})
// bootstrap and jquery
// app.get('/about',(req,res)=> {
//     res.render('about',{
//         title : 'the is the about page',
//         name : 'ali'
//     })
// })
// app.get('/contact' , (req ,res) => {
//     res.render('contact' , {
//         title : 'Contact Page',
//         message : 'please fill all fields',
//         name : 'mehdi mohammadi'
//     })
// })
app.get('/weather' , (req , res) => {
    if(!req.query.address) {
         res.send({
            error : 'no address given'
        })
    }else {
        geoCode(req.query.address,(error,data)=>{
            if(error) {
                res.send({error})
            }
            Weather(data.latitude,data.longtitude , (error,weatherData) => {
                if(error){
                    return res.send({
                      error
                    })
                }
                res.send({
                    location : data.location,
                    weather : weatherData.weather,
                    temp   : weatherData.temperature,
                    address : req.query.address
                })
            })
        }) 
    }
})

//practice
// app.get('/products' , (req , res) => {
//     if(!req.query.search) {
//      return res.send('url not found')   
//     }
//     res.send(req.query);
// })

// app.get('/help/*' , (req , res) => {
//     res.render('404' , {
//         title : 'article you are searching for is not found'
//     })
// })
app.get('*' , (req , res) => {
    res.render('404',{
        title : 'page not found',
    })
})

app.listen(port , () => {
    console.log('the server is running on port'+port)
}); // runs the server