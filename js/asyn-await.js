/*
Invoking API using await/async functions 
@author:Aayush Bhalotia
Project:Gender Probabilty Checker
*/

let url='https://api.genderize.io/?name=';   //API URL

//Varialbles
let a=``;             //input variable
let ring=document.getElementsByClassName("lds-ring")[0]; 
let suBmit=document.getElementsByClassName("button")[0];
let tryAgain=document.getElementsByClassName("tryagain")[0];

//Screen display function
function screen(hide,unhide,message){
  hide.style.display="none";
  unhide.style.display="inline-block";
  document.getElementById("output").innerHTML=message;
}

//try again reset function
tryAgain.addEventListener('click',e=>{         
  e.preventDefault();
  form.reset();
  screen(tryAgain,suBmit,'');   
})

//fetching values from API
async function myFetch() {
    try {
      let response = await fetch(url+a);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);      //if we can't get response from server
        else {
        let data = await response.json();           //parsing the response to json format
        let name=data.name;
        let gen=data.gender;
        let prob=(data.probability)*100;
        let str=`The probability of ${name} is ${gen} is ${prob}%`;
        if(gen==null) screen(ring,tryAgain,"Invalid name")     //if gender is equal to null
        else screen(ring,tryAgain,str);  
      }
    } catch(e) {            //on error
        console.log(e);
        screen(ring,tryAgain,"Some Error Ouccured Please Try Again!");  
    }
  }
  
  //onSubmit Function
function gender(){
  a=document.form.name.value;             //input value
  setTimeout(myFetch,2000);
  screen(suBmit,ring,'');
}