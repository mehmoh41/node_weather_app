const request = require('request');
const geoCode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibW9obWVoZGk0MSIsImEiOiJja2Mxdmd3cncxeGdhMzBxZGIyeHgwdmNvIn0.nDymnu7kPXvpJNp1T0Xq2A"
    request({url:url,json:true},(error , response) => {
        if(error) {
            callback('unable to connect',undefined)
        }
        else if(response.body.features.length === 0 ){
            callback('unable to find location, please provide valid location',undefined)
        }
        else {
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longtitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}
module.exports = geoCode;