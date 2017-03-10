function getBinary(anInteger){
    var result = ""
    var shortResult = ""
    for(var i = 1;i < 33;i ++){
        if(anInteger & 1 == 1){
            result = "1" + result
            shortResult = result
        }else{
            result = "0" +result
        }
        anInteger = anInteger >> 1
        console.log(anInteger+" "+result+" "+shortResult);
    }
    return (shortResult)
}


function Clock(hours, minutes){
    this.hours = hours;
    this.minutes = minutes;
    this.setTime = setTime;
    this.displayTime = displayTime;
}

function setTime(hours, minutes){
    this.hours = hours;
    this.minutes = minutes;
}

function displayTime(){
    var line = this.hours + " : " + this.minutes;
    document.writeln("<HR>Time of clock: "+line);
}


function fsearch (aForm){
    alert("Sorry, search function not yet impelemented");
}

function foptions (aForm){
    alert("Sorry, no options available");
}


function checkFields(){
    var num = document.form1.elements.length
    var validFlag = true
    for(var i = 0;i < num;i ++){
        if((document.form1.elements[i].value == null || document.form1.elements[i].value == "") && (typeof document.form1.elements[i] != 'submit' || typeof document.form1.elements[i] != 'reset')){
            validFlag = false
            alert("The" + document.form1.elements[i].name+"field is blank.Please enter a value.")

        }
    }
}



function printLanguages(Languages){
    document.write("<hr>");
    for(var key in Languages){
        if(typeof Languages[key] === 'string'){
            document.write("<br>" + languages[key]);
        }
    }
}


function calidateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if(x == ""){
        alert("Name must be filled out");
        return false;
    }
}


function myFunction(p1, p2) {
    return p1 * p2;
}



function CheckFunction() {
    var inpObj= document.getElementById("id1");
    if(inpObj.checkValidity() == false){
        document.getElementById("demo").innerHTML = inpObj.validationMessage;
    }else{
        document.getElementById("demo").innerHTML = "Input OK";
    }
}

function promptFunction(){
    var person = prompt("Please enter your name","Hogan");
    if(person != null){
        document.getElementById("prompt").innerHTML = "Hello " + person + "! How are you tosay?"
    }
}

function animateMove(){
    var elem = document.getElementById("animate");
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame(){
        if(pos == 350){
            clearInterval(id);
        }else{
            pos++;
            elem.style.top = pos + 'px'; 
            elem.style.left = pos + 'px'; 
        }
    }
}

