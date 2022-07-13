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
function power(a,b){
    return Math.pow(a,b);
}

function factorial(a,b){

    if (a === 0)
        return (b+1);
    else
        return a*factorial(a-1,b);
}

function operate(operator, a, b){
    switch(operator){ 
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
        case "^": return power(a,b);
        case "!": return factorial(a,b);
    }
}

function manageDigit(number, isNode){
    if(!mathError){
    if(!lastDigitIsNumber)
        dotIsPresent = false;
                        
    if (lastDigitIsDot)
        dotIsPresent = true;
                        
    lastDigitIsNumber = true;
    lastBtnClickedDelete = false;
                          
    if(dotIsPresent === true)
        decimals++;
                    
    //number is a DOM node
    if(isNode){
        if(dotIsPresent === true && number.getAttribute("id") === "."){
        }
        else if(dotIsPresent === false || dotIsPresent === true && decimals <= 1 ){
            upperScreen.textContent += number.textContent;
            numbersString += number.textContent;  
        }
                        
        if(number.getAttribute("id") === "."){
            dotIsPresent = true;
            decimals = 0;
        }
    }else{
        if(dotIsPresent === true && number.key === "."){
        }
        else if(dotIsPresent === false || dotIsPresent === true && decimals <= 1 ){
            upperScreen.textContent += number.key;
            numbersString += number.key
        }

        if(number.key === "."){
            dotIsPresent = true;
            decimals = 0;
        }
    }
}
}

function manageOperator (operator, isNode){
    if(!mathError){
    lastDigitIsNumber = false;
    lastBtnClickedDelete = false;
    lastDigitIsDot = false;

    if (firstOperator === null){
        if(!skipAssign){    
            firstNumber = +numbersString;
            numbersString="";
        }
        if(isNode)
            firstOperator = operator.getAttribute("id");  
        else
            firstOperator = operator.key;

        if(firstOperator === "!")   /*this is done because the factorial needs to be called by operate which always
                                      take in 2 parameters. The 0 number will be useful in the factorial function*/
            secondNumber = 0;
    }else{    
        secondNumber = +numbersString;
        numbersString="";    

        if(isNode) 
            secondOperator = operator.getAttribute("id");
        else
            secondOperator = operator.key;
    }

    if(firstOperator === "/" && secondNumber === 0){
        lowerScreen.textContent = "Math error";
        mathError = true;
    }
    else if( firstOperator === "=" && secondNumber === null || secondOperator === "=" && secondNumber !== null){        
        if(secondNumber === null){
            lowerScreen.textContent = firstNumber;
            firstOperator = null;
            skipAssign = true;
        }
        else{              
            lowerScreen.textContent = +operate(firstOperator,firstNumber,secondNumber).toFixed(2);

            firstNumber = operate(firstOperator,firstNumber,secondNumber);
            secondNumber = null;
            skipAssign = true;

            firstOperator = null;
            secondOperator = null; 
            lastOperatorAssign = true;      /*we just can't do, like in line 129, firstOperator = secondOperator, because we can't pass to the operate function the =
                                              operator. We need to reset both operators and wait for the user to input the first operator and the second operator again. 
                                              It's like we will start from fresh with the previous resulting number*/
        }
    }
    else if (firstOperator !== null && secondOperator !== null){        
            lowerScreen.textContent = +operate(firstOperator,firstNumber,secondNumber).toFixed(2);

            if(isNode){
                if(operator.getAttribute("id") === "!" || operator.getAttribute("id") === "^")
                    upperScreen.textContent +=operator.getAttribute("id"); 
                else
                    upperScreen.textContent +=operator.textContent;
            }
            else
                upperScreen.textContent += operator.key;

            firstNumber = operate(firstOperator,firstNumber,secondNumber);
            firstOperator = secondOperator; //when the user inputs a second operator different from =, that operator can be saved and used for the next operation        
    }
    else if(firstOperator === "!" && secondOperator === null || lastOperatorAssign && firstOperator === "!"){

        lowerScreen.textContent = +operate(firstOperator,firstNumber,secondNumber).toFixed(2);
        
        if(isNode)
            upperScreen.textContent +=operator.getAttribute("id"); 
        else
            upperScreen.textContent += operator.key
    }
    else if(isNode){
            if(operator.getAttribute("id") === "!" || operator.getAttribute("id") === "^")
                upperScreen.textContent +=operator.getAttribute("id");
            else
                upperScreen.textContent +=operator.textContent;
    }
    else 
        upperScreen.textContent += operator.key;
}
}

function manageDelete(btn, isNode){
    if(isNode){
        if(btn.getAttribute("id") === "clear"){
            //reset anything
            numbersString = "";
            firstNumber = null;
            firstOperator = null;
            secondNumber = null;
            secondOperator = null;
            skipAssign = false;
            lastOperatorAssign = false;
            dotIsPresent = false;
            lastBtnClickedDelete = false;
            lastDigitIsDot = false;
            mathError = false;

            upperScreen.textContent = "";
            lowerScreen.textContent = "";
        }
        else{
            if(!lastBtnClickedDelete){  //with this condition the user can only delete one digit/operator
                if(lastDigitIsNumber){
                    numbersString = numbersString.slice(0,-1)
                    upperScreen.textContent = upperScreen.textContent.slice(0,-1)
                
                    if(numbersString === " " || numbersString.includes(".")){
                        lastDigitIsNumber = false;
                        decimals = 0;
                        lastDigitIsDot= true;
                    }
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
            mathError = false;
        }
    }
    else{
        if(btn.key === "clear"){
        //reset anything
        numbersString = "";
        firstNumber = null;
        firstOperator = null;
        secondNumber = null;
        secondOperator = null;
        skipAssign = false;
        lastOperatorAssign = false;
        dotIsPresent = false;
        lastBtnClickedDelete = false;
        lastDigitIsDot = false;

        upperScreen.textContent = "";
        lowerScreen.textContent = "";
        }
        else{
            if(!lastBtnClickedDelete){  //with this condition the user can only delete one digit/operator
                if(lastDigitIsNumber){
                    numbersString = numbersString.slice(0,-1)
                    upperScreen.textContent = upperScreen.textContent.slice(0,-1)
                
                    if(numbersString === " " || numbersString.includes(".")){
                        lastDigitIsNumber = false;
                        decimals = 0;
                        lastDigitIsDot= true;
                    }
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
    }
}

function manageKeys(e){
    if(e.key>=0 && e.key<=9 || e.key === ".")
        manageDigit(e,false)
    if(e.key === "=" || e.key === "-" || e.key === "+" || e.key === "*" ||
            e.key === "/" || e.key === "!" || e.key === "^")
        manageOperator(e,false)
    if(e.key === "Backspace" || e.key === "Clear")
        manageDelete(e,false)
}

//main
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

let lastDigitIsDot = false;
let mathError = false;
let decimals;
let lastDigitIsNumber = false; 
let lastOperatorAssign = false; 
let lastBtnClickedDelete = false;  
let dotIsPresent = false;
let skipAssign = false; /*when you press the equal sign to evaluate an expression, it will reset the
                          first and second operator, as well as the numbers. The skipAssign flag makes possible 
                          that when you press the = the first number of the next operation becomes the result of the
                          previous expression evaluated, making it skip the assignment of the firstNumber from the 
                          numberString*/

numbers.forEach( number => number.addEventListener("click", manageDigit.bind(this,number,true)));

operators.forEach( operator => operator.addEventListener( "click", manageOperator.bind(this,operator,true)));

specialBtns.forEach(btn => btn.addEventListener("click", manageDelete.bind(this,btn,true)));

window.addEventListener("keydown", manageKeys.bind(this));

