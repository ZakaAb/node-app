const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiemFrZnVsbHN0YWNrZGV2IiwiYSI6ImNra3k3Z2JzNTBkdjQyd3Awdmd5YWhrMmMifQ.3PS-PyYT3DOpfqvjKnK9oA`

    request({url, json: true}, (error, { body }) => {
   

        if(error) {
            callback('Unable to connect to weather service!', undefined) // we can leave the second parameter empty
        } else if (body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            const feature = body.features[0]
        
            callback(undefined, {
                latitude: feature.center[1],
                longitude: feature.center[0],
                location: feature.place_name
            })
        }
    
        
    })
}

module.exports = geocode