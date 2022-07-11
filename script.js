function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator, a, b){
    switch(operator){   //operator is a string
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
    }
}

//get the references
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");   //remember to remove ac and clear
const upperScreen = document.querySelector("#upper");
const lowerScreen = document.querySelector("#lower");

let firstNumber = null;
let firstOperator = null;
let secondNumber = null;
let secondOperator = null;

let str = "";

//add the event listeners for the buttons
numbers.forEach( number => number.addEventListener( "click", () =>{
    upperScreen.textContent += number.textContent;

    str += number.textContent;
}))

operators.forEach( operator => operator.addEventListener( "click", () =>{
    
    //if this is the first operator
    if (firstOperator === null){
        firstNumber = +str;
        str="";
        firstOperator = operator.getAttribute("id");      
    }
    else{
        secondNumber = +str;
        str="";
        secondOperator = operator.getAttribute("id");
    }

    //if the operator is an equal
    if (operator.getAttribute("id") === "="){
        console.log(firstNumber,firstOperator,secondNumber,secondOperator)
        lowerScreen.textContent = operate(firstOperator,firstNumber,secondNumber);
    }
    else if(operator.getAttribute("id") === "!" || operator.getAttribute("id") === "^")
        upperScreen.textContent += operator.getAttribute("id");
    else
        upperScreen.textContent += operator.textContent;

}))

