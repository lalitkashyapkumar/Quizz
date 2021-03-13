function hider(){

    document.body.style.backgroundImage = "url('back.png')"; 
    document.getElementById("instruction").style.border = "thick solid #0000FF"; 
    document.getElementById("main").style.background = "rgba(76, 175, 80, 0.3)";
    let startButton = document.createElement('button');
    startButton.id = "startBtn";
    startButton.className = "btn btn-primary d-grid mx-auto";
    startButton.setAttribute("type", "submit");
    startButton.innerHTML = "Start";
    startButton.onclick = function(){
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        console.log(email);

        if(validateEmail(email) && password ){
            document.getElementById("instruction").remove();
            document.getElementById("main").style.display = "block";
            startTest(660000);
        }else{
            window.alert("Please enter your credential");
        }
        
    };

    document.getElementById('instruction').appendChild(startButton);

    let h2Heading = document.createElement('h2');
    h2Heading.innerHTML = "Instructions";
    h2Heading.className = "text-center mt-5";
    document.getElementById("instruction").appendChild(h2Heading);

    let ul = document.createElement('ul');
    ul.id = "insUl";
    ul.className = "mb-4";
    document.getElementById('instruction').appendChild(ul);
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");
    let li4 = document.createElement("li");
    let li5 = document.createElement("li");
    let t1 = document.createTextNode("There is total 11 question in test.");
    let t2 = document.createTextNode("You have total 11 minute for the question.");
    let t3 = document.createTextNode("After 11 minute your test will automatically submitted");
    let t4 = document.createTextNode("When you click on start button you test will start");
    let t5 = document.createTextNode("After finishing test you will get the result");
    li1.appendChild(t1);
    li2.appendChild(t2);
    li3.appendChild(t3);
    li4.appendChild(t4);
    li5.appendChild(t5);
    
    document.getElementById('insUl').appendChild(li1);
    document.getElementById('insUl').appendChild(li2);
    document.getElementById('insUl').appendChild(li3);
    document.getElementById('insUl').appendChild(li4);
    document.getElementById('insUl').appendChild(li5);
}

function validateEmail(emailID) {
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
       return false;
    }
    return( true );
  }


var i=0;
var res=0;
var data=null;
var result=[];
fetch("./question.json")
.then(response => {
   return response.json();
})
.then(obj => {
    onStart(obj, i),
    data = obj
}
);
function onStart(data, i){
    if(i==0){
        document.getElementById("prevBtn").style.visibility = 'hidden';
    }else{
        document.getElementById("prevBtn").style.visibility = 'visible';
    
    }
    if(i==11){
        document.getElementById("nextBtn").innerText = "Submit";
    }
    if(i==12){
        return computeRes();
    }
    document.getElementById("Question").innerText = "Que "+(i+1)+". "+data.questions[i].question;
    let mcq = data.questions[i].answers;
    mcq.forEach((element, i) => {
        if(document.getElementById("option"+i) != null){
            document.getElementById("option"+i).remove();
        }
        
        var divOption = document.createElement('div');
        divOption.className = "inputform-check";
        divOption.id = "option"+i;

        var labelVal = document.createElement('label');
        labelVal.innerHTML = element;
        labelVal.className = "fs-5";
        labelVal.setAttribute("for", "op"+i);

        var input = document.createElement('input');
        input.type = "radio";
        input.name = "option";
        input.className = "mt-2"
        input.value = i;
        input.id = "op"+i;
        document.getElementById("options").appendChild(divOption);
        document.getElementById("option"+i).appendChild(input);
        document.getElementById("option"+i).appendChild(labelVal);
        
    });
}


function computeRes(){
    console.log("Hey done");
    for (let index = 0; index < result.length; index++) {
        if(data.questions[index].correctIndex == result[index]){
            res++;
        }   
    }
    document.getElementById("main").remove();
    document.getElementById("timer").remove();
    let h1= document.createElement('h1');
    h1.innerHTML = "Final Result";
    h1.className = "text-center mt-5";
    document.getElementById("final").appendChild(h1);
    let h2Heading = document.createElement('h2');
    h2Heading.innerHTML = "Total correct answer is "+res+"/11";
    h2Heading.className = "text-center mt-5";
    document.getElementById("final").appendChild(h2Heading);

    console.log("Total correct answer is " +res);
    
}
function next(){
    let opt = document.getElementsByName('option');
    opt.forEach(element => {
        if(element.checked){
            result.push(element.value);
            console.log("ans is"+element.value);
            i++;
            onStart(data, i)
        }
    });
    console.log(i);
    
}

function prev(){
    i--;
    result.pop();
    onStart(data, i)
    console.log(i);
}

// const data = require('./employees.json');
// var distance  = 660000;

function startTest(distance){
    var x = setInterval(function() {
        distance -=1000; 
        // console.log(distance); 
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s "; 
        if (distance < 0) {
          clearInterval(x);
          computeRes();
        }
      }, 1000);
}
// Update the count down every 1 second