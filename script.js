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
const operators = document.querySelectorAll(".operator"); 
const upperScreen = document.querySelector("#upper");
const lowerScreen = document.querySelector("#lower");

let firstNumber = null;
let firstOperator = null;
let secondNumber = null;
let secondOperator = null;

let numbersString = "";

//add the event listeners for the numbers
numbers.forEach( number => number.addEventListener( "click", () =>{
    upperScreen.textContent += number.textContent;

    numbersString += number.textContent;    //append the current selected number in the string
}));

let skip;

//add the event listeners for the operators
operators.forEach( operator => operator.addEventListener( "click", () =>{
    
    //if this is the first operator being selected 
    if (firstOperator === null){
        if(!skip){
            firstNumber = +numbersString;
            numbersString="";
        }
            firstOperator = operator.getAttribute("id");      
    }
    else{    
            secondNumber = +numbersString;
            numbersString="";     
        secondOperator = operator.getAttribute("id");
    }

    if (operator.getAttribute("id") === "=") {
        
        //if the second number does not exist do nothing
        if (secondNumber === null){
            
        }
        else{              
            lowerScreen.textContent = +operate(firstOperator,firstNumber,secondNumber).toFixed(2);

            firstNumber = operate(firstOperator,firstNumber,secondNumber);
            skip = true;
            firstOperator = null;
            secondOperator = null;
            
            //at this point you can do nothing and just wait for the next operator to be clicked
        }
    }
    //if the two operators are both assigned, this means that the expression has to be evaluated but no = was provided
    else if (firstOperator !== null && secondOperator !== null){        
            lowerScreen.textContent = +operate(firstOperator,firstNumber,secondNumber).toFixed(2);

            if(operator.getAttribute("id") === "!" || operator.getAttribute("id") === "^")
                upperScreen.textContent +=" " + operator.getAttribute("id")+ " "; 
            else
                upperScreen.textContent +=" " + operator.textContent +" ";

            firstNumber = operate(firstOperator,firstNumber,secondNumber);
            firstOperator = secondOperator; //the operator that was just selected will be the one passed to the operate function
    }
    else if(operator.getAttribute("id") === "!" || operator.getAttribute("id") === "^")
        upperScreen.textContent += " " + operator.getAttribute("id") +  " "; 
    else 
        upperScreen.textContent += " " + operator.textContent + " ";

}));

