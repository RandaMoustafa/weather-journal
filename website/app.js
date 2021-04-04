/* Global Variables */
//html 
const button = document.getElementById('generate');
//html value
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
//html dynamically
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

//API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '78d6465bceb98ae4852a77009180b953';

    // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+' . '+ d.getDate()+' . '+ d.getFullYear();


//get data

const getWeather= async (baseUrl,zip, apiKey)=>{
    try{
        const response = await fetch( `${baseUrl}?zip=${zip},us&units=metric&APPID=${apiKey}`,);
        const dataResult = await response.json();
          const {
            main: {temp},
          } = dataResult;
         // console.log(dataResult);

          return temp
    }catch(error){
        console.log('error', error);
    }
};
//Posted data

const postData = async (url = '', data= {})=> {
 try {
     await fetch (url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
     })
 } catch(error){
     console.log('error', erorr);
 }
}

// add eventListener
button.addEventListener('click', ()=>{
    getWeather(baseUrl,zip.value, apiKey).then(temp=>{
        return{date:newDate,
         temp,
         content: feelings.value
     }
    })
    .then(data=>{
     postData('/add', data)
     return data;
    })
 
     .then(({temp, date, content}) => updateUI(temp, date, content))
     
     .catch(e=>{
         console.log(e);
     })
  })


// UI Update
const updateUI = async (temperature, newDate, feelings) => {
    date.innerText = `Date: ${newDate}`
    temp.innerText = `Temp: ${temperature}  ْC ` 
    content.innerText = `Content: ${feelings}`
  }
 
  