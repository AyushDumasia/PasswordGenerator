let upperSet = "ABCDEFGHIJKKLMNOPQRSTVWXYZ";
let lowerSet = "abcdefghijklmnopqrstvwxyz";
let numberSet = "0123456789";
let symbolSet = "!@#$%^&*(){}[]+-=_``~/><\\|";
let passWord = "";


let range = document.querySelector("#total-char");
let upperInput = document.querySelector("#upper-case");
let lowerInput = document.querySelector("#lower-case");
let numberInput = document.querySelector("#numbers");
let symbolInput = document.querySelector("#symbols");
let intialInput = document.querySelector("#intial-input");

//For Generating Random Numbers
function getRandomNum(dataset){
    return dataset[Math.floor(Math.random()*dataset.length)];
}


//For Generating PassWord
function passwordGenerate() {
    if (upperInput.checked) {
        passWord += getRandomNum(upperSet);
    }
    if (lowerInput.checked) {
        passWord += getRandomNum(lowerSet);
    }
    if (numberInput.checked) {
        passWord += getRandomNum(numberSet);
    }
    if (symbolInput.checked) {
        passWord += getRandomNum(symbolSet);
    }
    if(passWord.length < range.value){
        return passwordGenerate();
    }
}


//For Generate Button
let btn = document.querySelector("#btn");
let passBox = document.querySelector("#pass-box");
btn.addEventListener("click", function() {
    passWord = "";
    passwordGenerate();
    console.log(passWord);
    passBox.value = intialInput.value + passWord;
    showLength();
    let numberOfCheckedCheckboxes = checkCheckBox();
    checkStrength(numberOfCheckedCheckboxes);
});


//for Copy Button
let copyBtn = document.querySelector("#copy");
copyBtn.addEventListener("click",function(){
    if(passWord == ""){
        alert("Enter a Generate Button");
    }
    else{
        passBox.select();
        document.execCommand("Copy");
    }
})


//For Reset Button
let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click",function(){
    passWord = "";
    passBox.value = `Generate a Password` ;
    range2.innerText= "0";
    passStrength.innerText = "";
    intialInput.value = "";
});

//showing length
let range2 = document.querySelector("#range2");
function showLength(){
    let sum = intialInput.value.length+ +range.value;
    range2.innerText= sum;
}

//showing strength of password
let passStrength = document.querySelector("#pass-strength");
function checkStrength(checkCheckBox){
    if(checkCheckBox === 1){
        passStrength.innerText = "Very Weak";
        passStrength.style.color = "red";
    }
    else if(checkCheckBox === 2){
        passStrength.innerText = "Weak";
        passStrength.style.color = "yellow";
    }
    else if(checkCheckBox === 3){
        passStrength.innerText = "Medium";
        passStrength.style.color = "blue";
    }
    else if(checkCheckBox === 4){
        passStrength.innerText = "Strong";
        passStrength.style.color = "green";
    }
    else if(checkCheckBox === undefined || checkCheckBox === null){
        passStrength.innerText = "Enter a Generate Button";
    }
}

//for checkbox
function checkCheckBox(){
    let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    let countCheck = 0;

    checkBoxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            countCheck++;
        }
    });

    return countCheck;
}

