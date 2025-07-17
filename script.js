const output = document.getElementById("output");
const startButton = document.getElementById("startButton");
let finalTranscript = '';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-hi';
recognition.interimResults = true;
startButton.addEventListener("click", () => {
    finalTranscript = '';
    output.textContent = '';
    recognition.start();
    startButton.textContent = "listening...";
});
recognition.addEventListener("result", (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0].transcript )
        .join('');
        if (event.results[0].isFinal) {
            finalTranscript += transcript + ' ';
            output.innerHTML = finalTranscript;
        }
        
});

recognition.addEventListener("end", () => {
    startButton.textContent = "startButton";
    recognition.start();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter,Escape") {
        if (recognition.recognizing) {
            recognition.stop();
            startButton.textContent = "startButton";
        } else {
            recognition.start();
            startButton.textContent = "STOP";
        }
    }
});
