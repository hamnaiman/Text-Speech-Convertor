const textOutput = document.getElementById("text-output");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const copyBtn = document.getElementById("copy-btn");

let recognition;

// Set initial placeholder text
textOutput.value = "Press Start Button to Start";

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        textOutput.value = "Listening...";
    };

    recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        textOutput.value = transcript;
    };

    recognition.onend = () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    startBtn.addEventListener("click", () => {
        recognition.start();
        Swal.fire({
            title: "Voice Recognition Started",
            text: "Speak now...",
            icon: "info",
            timer: 1500,
            showConfirmButton: false
        });
    });

    stopBtn.addEventListener("click", () => {
        recognition.stop();
        Swal.fire({
            title: "Voice Recognition Stopped",
            text: "You can start again anytime!",
            icon: "warning",
            timer: 1500,
            showConfirmButton: false
        });
    });

    resetBtn.addEventListener("click", () => {
        textOutput.value = "Press Start Button to Start";
        Swal.fire({
            title: "Reset",
            text: "Text cleared successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
    });

    copyBtn.addEventListener("click", () => {
        textOutput.select();
        document.execCommand("copy");
        Swal.fire({
            title: "Copied!",
            text: "Text copied to clipboard!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
    });

} else {
    Swal.fire({
        title: "Error",
        text: "Sorry, your browser does not support speech recognition.",
        icon: "error"
    });
}
