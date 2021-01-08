/*
Invoking API using Promises 
@author:Aayush Bhalotia
Project:Gender Probabilty Checker
*/

let url='https://api.genderize.io/?name=';   //API URL

//Varialbles
let a=``;
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
function find(){
    let mypromise= new Promise((resolve,reject)=>{
        fetch(url+a).then((response)=>{
            if (!response.ok) reject(`status: ${response.status}`);                  //if we can't get response from server
            else resolve(response.json());                                           //parsing the response to json format
        }).catch((e)=>reject(e));
    })
   
    mypromise.then((data)=>{
        let name=data.name;
        let gen=data.gender;
        let prob=(data.probability)*100;
        let str=`The probability of ${name} is ${gen} is ${prob}%`;
        if(gen==null) screen(ring,tryAgain,"Invalid name");                      //if gender is equal to null
        else screen(ring,tryAgain,str);},
        (error)=> {
        console.log(error);
        screen(ring,tryAgain,`Something wrong happen Please try again!`)});
}

//onSubmit Function
function gender(){
    a=document.form.name.value;                                   //input value
    setTimeout(find,2000);
    screen(suBmit,ring,'');
}