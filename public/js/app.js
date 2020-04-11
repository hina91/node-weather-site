
// 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')




weatherForm.addEventListener('submit',(e)=>{
	e.preventDefault()

	const location = search.value
    
    message1.textContent = 'Loading....'
    message2.textContent = ''
    
    // console.log(location)
    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if(data.err){ 
                console.log(data.err)
                message1.textContent = data.err
                message2.textContent = ''
            
            }else{
                message1.textContent = data.location
                message2.textContent = data.forecast

                // console.log(data.location)
                // console.log(data.forecast)
            }
    	})
	})
})
