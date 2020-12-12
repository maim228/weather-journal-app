/*
*code and comments are written by Mohammed Abdallah
*Second nanodegree project
*/
/* Global Variables */
const baseUrl ="http://api.openweathermap.org/data/2.5/weather?zip=";
//my api in openweathermap and Fahrenheit unit
const api = "&appid=7999eef62e341c7e066bedadbb868785&units=imperial"
//generate button 
const generate = document.getElementById("generate");

//add event listener to the button
generate.addEventListener("click",doAction);


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//doAction function that will work for every click
function doAction(e){
    //get new zip code and feelings for every click
    zipCode = document.getElementById("zip").value;
    feelings = document.getElementById("feelings").value;
    weather(baseUrl,zipCode,api)
       .then(function(data){
           console.log(data);
           postData('/add',{date:newDate,temp:data.main.temp,content:feelings})
           update();
       });
}

//get weather function 
const weather = async (baseUrl,zipCode,api) =>{
      const res = await fetch(baseUrl+zipCode+api)
      try{
         const data = await res.json();
         return data;
      }catch(error){
          console.log("error",error);
      }
};

//post data function
const postData = async (url='',data={})=>{
    console.log(data);
    const response = await fetch (url,{
        method:'post',
        credentials:'same-origin',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    }) 
try{
    const newData = await response.json();
    console.log(newData);
    return newData;
}catch(error){
 console.log("error",error)
}
}

const update = async()=>{
    const request = await fetch ("/all");
    try{
        const allData = await request.json();
        //enter the data to entery squre
        document.getElementById("date").innerHTML=`Date ${allData.date}`;
        document.getElementById("temp").innerHTML=`temp ${allData.temp}`;
        document.getElementById("content").innerHTML=`feelings ${allData.content}`;
    }catch(error){
        console.log("error",error)
    }
}
