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
        case "+": add(a,b);
                    break;
        case "-": subtract(a,b);
                    break;
        case "*": multiply(a,b);
                    break;
        case "/": divide(a,b);
                    break;
    }
}

//get the references
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const upperScreen = document.querySelector("#upper");



