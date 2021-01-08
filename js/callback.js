/* 
Invoking API using Callback
@author:Aayush Bhalotia
Project:Gender Probabilty Checker
*/

let url='https://api.genderize.io/?name=';//API URL

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
function find(callback){
    setTimeout(()=>{
    fetch(url+a).then(res=>res.json())              //parsing the response to json format
    .then(data=>{
    let name=data.name;                          //if gender is equal to null
    let gen=data.gender;
    let prob=(data.probability)*100;
    var str=`The probability of ${name} is ${gen} is ${prob}%`;
    if(gen==null) callback(ring,tryAgain,"Invalid name")
    else callback(ring,tryAgain,str);
    })
    .catch((e)=> {
        screen(ring,tryAgain,"Something wrong happen Please Try Again!") //if we can't get response from server
        console.log(e)});  
    },2000);
}

//onSubmit Function
function gender(){
    a=document.form.name.value;               //input value
    find(screen);
    screen(suBmit,ring,'');  
}

