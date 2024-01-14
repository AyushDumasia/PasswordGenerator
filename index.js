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
    if(!upperInput.checked && !lowerInput.checked && !numberInput.checked && !symbolInput.checked){
        return 0;
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
    passBox.value = intialInput.value + passWord;
    console.log(passBox.value);
    showLength();
    let numberOfCheckedCheckboxes = checkCheckBox();
    checkStrength(numberOfCheckedCheckboxes);
    showHistory();
    if(passBox.type == "password"){
        passBox.type = "text";
        hideBtn.classList.add("fa-eye");
        hideBtn.classList.remove("fa-eye-slash");
    }
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
    passBox.value = `` ;
    range2.innerText= "0";
    passStrength.innerText = "";
    intialInput.value = "";
    hideBtn.classList.add("fa-eye");
    hideBtn.classList.remove("fa-eye-slash");
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
    if(checkCheckBox === 0 ){
        passStrength.innerText = "Enter a Generate Button";
        passStrength.style.color = "red";
    }
    else if(checkCheckBox === 1){
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
}

//for counting checkbox
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

//Showing history
let historyValue = [];
let isHis = true;
let hisBox = document.querySelector(".history-box");
function showHistory(){
    if(isHis == true){
        hisBox.innerHTML = ``;
        isHis = false;
    }
    let addHisBox = document.createElement("div");
    addHisBox.classList.add("boxes");
    historyValue.push(passBox.value);
    addHisBox.innerHTML = 
        `<div class = "add-history-box">
            <p class="history-para">${passBox.value}</p>
            <i class="fa-regular fa-copy fa-copy-btn"></i>
        </div>
        `;
    hisBox.prepend(addHisBox);
}


//Delete Button 
let deleteBtn = document.querySelector("#deleteBtn");
deleteBtn.addEventListener("click",function(){
    if(historyValue == ""){
        alert("Press a Generate Button");
    }
    else{
        hisBox.innerHTML = `
        <p class="afterdelete">History has been deleted</p>
    `;
    }
    
    historyValue = [];
    isHis = true;
})


let hideBtn = document.querySelector(".fa-eye");

hideBtn.addEventListener("click",function(){
    if(passBox.type == "text"){
        passBox.type = "password";
        hideBtn.classList.remove("fa-eye");
        hideBtn.classList.add("fa-eye-slash");
    }
    else{
        passBox.type = "text";
        hideBtn.classList.add("fa-eye");
        hideBtn.classList.remove("fa-eye-slash");
    }
})


hisBox.addEventListener("click", function(e) {
    if (e.target.classList.contains("fa-copy-btn")) {
        let preHistory = e.target.previousElementSibling;
        if (preHistory) {
            let passwordToCopy = preHistory.textContent;
            copyToClipboard(passwordToCopy);
        }
    }
});

// Function to copy text to clipboard
function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
