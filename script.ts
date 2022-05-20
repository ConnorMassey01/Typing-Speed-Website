const FONT_SIZE = 25;
let timerId: number = null;
let count: number = 0;
let mistakes: number = 0;
let textInput = document.getElementById("textBox") as HTMLInputElement;
let resetButton = document.querySelector(".reset-button");

//set the message for the user to copy
let message: string = "The quick brown fox jumps over the lazy dog!";

//set the width of the text box to be the same
textInput.style.width = measureText(message, 25).toString() + "px";
textInput.style.fontSize = FONT_SIZE + "px";

window.onload = () => {
    let messageElement = document.querySelector(".text-to-copy");
    messageElement.textContent = message;
}

function startTimer(): void{
    count = 0;
    timerId = setInterval(displayTimer, 10);
}

function displayTimer(): void{
    //increase the count by 1
    count++;
    let seconds: number = Math.floor(count / 100);
    let tenth: number = Math.floor(count / 10) % 10;
    let hundredth: number = count % 10;
    let timerElement = document.querySelector(".timer-count");
    timerElement.innerHTML = seconds + "." + tenth + hundredth;
}

function stopTimer(): void{
    if(timerId != null){
        clearInterval(timerId);
        timerId = null; 
    }
}

function measureText(str: string, fontSize: number) {
    const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,
        0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,
        0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,
        0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,
        0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,
        0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,
        0.2765625,0.584375,0.5828125,0.584375,0.5546875,
        1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,
        0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,
        0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,
        0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,
        0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,
        0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,
        0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,
        0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,
        0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,
        0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
    const avg = 0.5279276315789471
    return str
      .split('')
      .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
      .reduce((cur, acc) => acc + cur) * fontSize
}

//start the timer and compare teh input when the user enters text
textInput.addEventListener('input', (event: InputEvent) => {
    //start the timer if it hasn't been started yet
    if(timerId === null){
        startTimer();
    }
    //get input message and message to copy
    let inputMessage: string = textInput.value;
    let messageElement = document.querySelector(".text-to-copy");
    //start with the message to copy as nothing
    let colouredTextToCopy: string = "";
    //loop through the text that has been entered
    for(let i = 0; i < inputMessage.length; i++){
        if(i >= message.length){
            colouredTextToCopy += '<span style="color: red">x</span>';
            continue;
        }
        if(inputMessage[i] === message[i]){
            colouredTextToCopy += '<span style="color: green">' + message[i] + '</span>';
        }
        else{
            colouredTextToCopy += '<span style="color: red">' + message[i] + '</span>';
            if(event.data != null){
                mistakes++;
            }
        }
    }
    //fill the rest in with regular text
    for(let i = inputMessage.length; i < message.length; i++){
        colouredTextToCopy += message[i];
    }
    messageElement.innerHTML = colouredTextToCopy;
});

//check when the user presses enter
textInput.addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        if(textInput.value === message){
            stopTimer();
            //add analysis on the typing speed
            let analysisSection = document.querySelector(".report");
            //stats to keep track of
            let wordsPerMin: number;
            let numWords: number = 1;
            let charPerSecond: number;

            for(let i = 0; i < message.length; i++){
                if(message[i] === ' '){
                    numWords++;
                }
            }
            wordsPerMin = numWords/(count / (100 * 60));
            charPerSecond = message.length/(count/100);

            analysisSection.innerHTML = "Words per minute: " + wordsPerMin.toFixed(2) + 
                                        "<br>Characters per second: " + charPerSecond.toFixed(2) +
                                        "<br>Number of mistakes: " + mistakes;
        }
    }
});

//check if reset button pressed
resetButton.addEventListener('click', () => {
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
})