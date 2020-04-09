const request = require('request')

geoCode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGluYTkxIiwiYSI6ImNrNjMzcXU3MTA1dGYzb284NnljajBxa2UifQ.7R69iQr3k8Pgq_sd8AsOPw&limit=1'

    request({url:url,json:true},(err,{ body })=>{ 
        if(err){
            callback('unable to connect to location services',undefined)            
        }else if(body.features.length === 0){
            callback('unable to find location, try another location',undefined)
        }else{
           callback(undefined, {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
           }) 
        }
    })
}

module.exports = geoCode
