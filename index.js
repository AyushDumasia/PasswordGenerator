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
    passBox.value = passWord;
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

})