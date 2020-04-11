const request = require('request')

// const url = 'https://api.darksky.net/forecast/2e6b2801e9b458889d1dd970e9f8bd0a/37.8267,-123'

// request({url:url,json:true},(err,res)=>{
//     // const data = JSON.parse(res.body)
//     // console.log(data.currently)
//     //console.log(res.body.currently)

//     if(err){
//         console.log('Internet not connected')
//     }else if(res.body.error){
//         console.log('location not found')
//     }else{
//         console.log(res.body.daily.data[0].summary,'it is currently', res.body.currently.temperature,'degrees out, there is a',res.body.currently.precipProbability,'% chance of rain.')
//     }
// })

const forecast = (latitude,longitude,callback) => {
    //const url = 'https://api.darksky.net/forecast/2e6b2801e9b458889d1dd970e9f8bd0a/'+latitude+','+longitude+''
    const url = `https://api.darksky.net/forecast/2e6b2801e9b458889d1dd970e9f8bd0a/${latitude},${longitude}`
    request({url:url,json:true},(err,res)=>{
        const {error,summary,temperature:tmp,precipProbability,windSpeed,pressure} = (res.body,res.body.currently)
        //const {error} = res.body
        if(err){
            callback('no internet connection',undefined)
        }else if(error){
            callback('location not found',undefined)
        }else{
            // const summary = res.body.currently.summary
            // const tmp = res.body.currently.temperature
            // const precipProbability = res.body.currently.precipProbability
            
            callback(undefined, `${summary} ,the temperature ${tmp} degree out and ${precipProbability}% chance of rain with the wind speed is ${windSpeed} and the current pressure is ${pressure}`)
            // callback(undefined,{
            //     summary,
            //     tmp, 
            //     precipProbability
            // })
        }
    })
}

module.exports = forecast