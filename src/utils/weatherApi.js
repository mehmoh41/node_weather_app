const OpenWeatherMapHelper = require("openweathermap-node");

const helper = new OpenWeatherMapHelper(
    {
        APPID : 'd14070f98f6d39fc4f31bc9942b35333',
        units : 'metric'
    }
)
const Weather = (longtitude , latitude , callback) => {
    helper.getCurrentWeatherByGeoCoordinates(longtitude,latitude,(err , currentWeather) => {
        if(err) {
                callback("can't connect",undefined)
        }
        else if(currentWeather.weather.length === 0 ){
            callback('not data found',undefined)
        }
        else {
            callback(false , {
                weather     :     currentWeather.weather[0].description,
                temperature :     Math.floor(currentWeather.main.temp-273)+" c"
            })
        }
    })
}
module.exports = Weather;