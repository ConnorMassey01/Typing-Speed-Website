var FONT_SIZE = 25;
var timerId = null;
var count = 0;
var mistakes = 0;
var textInput = document.getElementById("textBox");
var resetButton = document.querySelector(".reset-button");
//set the message for the user to copy
var message = "The quick brown fox jumps over the lazy dog!";
//set the width of the text box to be the same
textInput.style.width = measureText(message, 25).toString() + "px";
textInput.style.fontSize = FONT_SIZE + "px";
window.onload = function () {
    var messageElement = document.querySelector(".text-to-copy");
    messageElement.textContent = message;
};
function startTimer() {
    count = 0;
    timerId = setInterval(displayTimer, 10);
}
function displayTimer() {
    //increase the count by 1
    count++;
    var seconds = Math.floor(count / 100);
    var tenth = Math.floor(count / 10) % 10;
    var hundredth = count % 10;
    var timerElement = document.querySelector(".timer-count");
    timerElement.innerHTML = seconds + "." + tenth + hundredth;
}
function stopTimer() {
    if (timerId != null) {
        clearInterval(timerId);
        timerId = null;
    }
}
function measureText(str, fontSize) {
    var widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2796875,
        0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625,
        0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125,
        0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875,
        0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
        0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.2765625,
        0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875,
        1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625,
        0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625,
        0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625,
        0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375,
        0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625,
        0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5,
        0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875,
        0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875,
        0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875,
        0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625];
    var avg = 0.5279276315789471;
    return str
        .split('')
        .map(function (c) { return c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg; })
        .reduce(function (cur, acc) { return acc + cur; }) * fontSize;
}
//start the timer and compare teh input when the user enters text
textInput.addEventListener('input', function (event) {
    //start the timer if it hasn't been started yet
    if (timerId === null) {
        startTimer();
    }
    //get input message and message to copy
    var inputMessage = textInput.value;
    var messageElement = document.querySelector(".text-to-copy");
    //start with the message to copy as nothing
    var colouredTextToCopy = "";
    //loop through the text that has been entered
    for (var i = 0; i < inputMessage.length; i++) {
        if (i >= message.length) {
            colouredTextToCopy += '<span style="color: red">x</span>';
            continue;
        }
        if (inputMessage[i] === message[i]) {
            colouredTextToCopy += '<span style="color: green">' + message[i] + '</span>';
        }
        else {
            colouredTextToCopy += '<span style="color: red">' + message[i] + '</span>';
            if (event.data != null) {
                mistakes++;
            }
        }
    }
    //fill the rest in with regular text
    for (var i = inputMessage.length; i < message.length; i++) {
        colouredTextToCopy += message[i];
    }
    messageElement.innerHTML = colouredTextToCopy;
});
//check when the user presses enter
textInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        if (textInput.value === message) {
            stopTimer();
            //add analysis on the typing speed
            var analysisSection = document.querySelector(".report");
            //stats to keep track of
            var wordsPerMin = void 0;
            var numWords = 1;
            var charPerSecond = void 0;
            for (var i = 0; i < message.length; i++) {
                if (message[i] === ' ') {
                    numWords++;
                }
            }
            wordsPerMin = numWords / (count / (100 * 60));
            charPerSecond = message.length / (count / 100);
            analysisSection.innerHTML = "Words per minute: " + wordsPerMin.toFixed(2) +
                "<br>Characters per second: " + charPerSecond.toFixed(2) +
                "<br>Number of mistakes: " + mistakes;
        }
    }
});
//check if reset button pressed
resetButton.addEventListener('click', function () {
    //clear text input
    textInput.value = "";
    //reset the message to copy to not have colour
    document.querySelector(".text-to-copy").innerHTML = message;
    //reset number of mistakes to zero
    mistakes = 0;
    //stop the timer
    stopTimer();
    //display the start time as 0
    count = 0;
    document.querySelector(".timer-count").innerHTML = "0.00";
    //clear the analysis section
    document.querySelector(".report").innerHTML = "";
});
//# sourceMappingURL=script.js.map