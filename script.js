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
    switch(operator){ 
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
    }
}

const numbers = document.querySelectorAll(".number"); 
const operators = document.querySelectorAll(".operator"); 
const specialBtns = document.querySelectorAll(".special");
const upperScreen = document.querySelector("#upper");
const lowerScreen = document.querySelector("#lower");

let firstNumber = null;
let firstOperator = null;
let secondNumber = null;
let secondOperator = null;

let numbersString = ""; //temporary string that will store the number typed in the calculator

let lastDigitIsNumber;
let lastOperatorAssign;
let lastBtnClickedDelete;
let lastBtnClickedPoint;
let skipAssign = false; /*when you press the equal sign to evaluate an expression, it will reset the
                          first and second operator, as well as the numbers. The skipAssign flag makes possible 
                          that when you press the = the first number of the next operation becomes the result of the
                          previous expression evaluated, making it skin the assignment of the firstNumber from the 
                          numberString*/

numbers.forEach( number => number.addEventListener( "click", () =>{
    lastDigitIsNumber = true;
    lastBtnClickedDelete = false;

    if(!(lastBtnClickedPoint === true && number.getAttribute("id") === ".")){
        upperScreen.textContent += number.textContent;

        numbersString += number.textContent;    //append the current selected number in the string
    }

    if(number.getAttribute("id") === ".")
        lastBtnClickedPoint = true;
    else
        lastBtnClickedPoint = false;

}));

operators.forEach( operator => operator.addEventListener( "click", () =>{
    lastDigitIsNumber = false;
    lastBtnClickedDelete = false;

    //if this is the first operator being selected 
    if (firstOperator === null){
        if(!skipAssign){
            firstNumber = +numbersString;
            numbersString="";
        }
        firstOperator = operator.getAttribute("id");  
    }else{    
        secondNumber = +numbersString;
        numbersString="";     
        secondOperator = operator.getAttribute("id");
    }

    if(firstOperator === "/" && secondNumber === 0)
        lowerScreen.textContent = "Error"
    else if(operator.getAttribute("id") === "=" ){        
        if(secondNumber === null){
            lowerScreen.textContent = "Error"
        }
        else{              
            lowerScreen.textContent = +operate(firstOperator,firstNumber,secondNumber).toFixed(2);

            firstNumber = operate(firstOperator,firstNumber,secondNumber);
            skipAssign = true;
            firstOperator = null;
            secondOperator = null; 
            lastOperatorAssign = true;      
        }
    }
    else if (firstOperator !== null && secondOperator !== null){        
            lowerScreen.textContent = +operate(firstOperator,firstNumber,secondNumber).toFixed(2);

            if(operator.getAttribute("id") === "!" || operator.getAttribute("id") === "^")
                upperScreen.textContent +=operator.getAttribute("id"); 
            else
                upperScreen.textContent +=operator.textContent;

            firstNumber = operate(firstOperator,firstNumber,secondNumber);
            firstOperator = secondOperator; //the operator that was just selected will be the one passed to the operate function later on
    }
    else if(operator.getAttribute("id") === "!" || operator.getAttribute("id") === "^")
        upperScreen.textContent +=operator.getAttribute("id"); 
    else 
        upperScreen.textContent +=operator.textContent; 
}));

//add the event listeners for the special buttons
specialBtns.forEach(btn => btn.addEventListener("click", () =>{
    if(btn.getAttribute("id") === "clear"){
        //reset anything
        numbersString = "";
        firstNumber = null;
        firstOperator = null;
        secondNumber = null;
        secondOperator = null;
        skipAssign = false;

        upperScreen.textContent = "";
        lowerScreen.textContent = "";
    }
    else if (btn.getAttribute("id") === "delete"){
        console.log(lastBtnClickedDelete)
        if(!lastBtnClickedDelete){  //with this condition the user can only delete one digit/operator
            if(lastDigitIsNumber){
                numbersString = numbersString.slice(0,-1)
                upperScreen.textContent = upperScreen.textContent.slice(0,-1)
            
                if(numbersString === " ")
                    lastDigitIsNumber = false;
            }
            else if(firstOperator !== null && secondOperator == null){
                upperScreen.textContent = upperScreen.textContent.slice(0,-1);
                firstOperator = null;
                skipAssign = true;
                lastDigitIsNumber = true;
            }
            else if(firstOperator !== null && secondOperator !== null){
                upperScreen.textContent = upperScreen.textContent.slice(0,-1);
                secondOperator = null;
                firstOperator = null;
                skipAssign = true;
                lastDigitIsNumber = true;
            }
        }
        lastBtnClickedDelete = true;
    }
}));
