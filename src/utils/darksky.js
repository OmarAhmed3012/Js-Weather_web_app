const request = require('request')

const darksky = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/e3c594f6003270ddb9e68b13410ef496/+'+lat+','+long

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect the weather services')
        }else if (body.error){
            callback('unable to find location')
        }else{
            callback(undefined, body.timezone +' '+ body.daily.data[0].summary +  " it is currentlly " + body.currently.temperature + " fahrenheit degrees out and there is a " + body.currently.precipProbability + " % chance of rain")
        }
    })
}

module.exports = darksky