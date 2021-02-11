const request = require('request')




const forcast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2c2f19f8e5b4eeeaecb9a0e6de524e92&query=${lat},${lon}&units=f`
 

    request({ url, json: true} ,(error, { body }) => {
        
    
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            const { current } = body
            callback(undefined, `${current.weather_descriptions[0]}. It is currenty ${current.temperature} degress out. It feels like ${current.feelslike} degress out. The humidity is ${current.humidity}% period. `)
        }
       
    })

}

module.exports = forcast