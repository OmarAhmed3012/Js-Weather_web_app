const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoib21hcndhZmEiLCJhIjoiY2syb3lpNjZzMGE5bzNicHBsZWltdWRoNSJ9.Y2LjHnrFsKucRqdE0eYs3Q&limit=1'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect the weather services', undefined)
        }else if (body.features.length === 0){
            callback('unable to find location', undefined)
        }else{
            callback(undefined, {
                lat: body.features[0].center[0],
                long: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode