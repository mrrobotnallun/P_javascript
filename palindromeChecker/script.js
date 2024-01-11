document.getElementById("check-btn").addEventListener("click", function() {
    const inputText = document.getElementById("text-input").value;
    
    if (!inputText) {
        alert("Please input a value");
        return;
    }

    const isPalindrome = checkPalindrome(inputText);
    const resultText = isPalindrome ? `${inputText} is a palindrome` : `${inputText} is not a palindrome`;
    document.getElementById("result").innerText = resultText;
});

function checkPalindrome(str) {
    const cleanedStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    return cleanedStr === cleanedStr.split("").reverse().join("");
}
