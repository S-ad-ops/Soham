# Soham
# A Virtual assistant which can follow some of the commands 

# !HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luna - Virtual Assistant</title>
    <link rel="shortcut icon" href="avatar.png.jpeg" type="image/x-icon">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">   
</head>
<body>
    <section class="main">
        <div class="image-container">
            <div class="image">
                <img src="giphy.jpg.png" alt="image">
            </div>
            <h1>L U N A</h1>
            <p>I'm a Virtual Assistant LUNA, How may i help you?</p>
        </div>
        <div class="input">
            <button class="talk"><i class="fas fa-microphone-alt"></i></button>
            <h1 class="content"> Click here to speak</h1>
        </div>
    </section>
    <script src="app.js"></script>
</body>
</html>

# !CSS
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

/* General Styling */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

/* Background - Starry Night */
body {
    background: #010a43;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    position: relative;
}

/* Stars Animation */
body::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('https://www.transparenttextures.com/patterns/stardust.png');
    opacity: 0.5;
}

/* Centered Main Section */
.main {
    text-align: center;
    z-index: 1;
    padding: 20px;
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
    width: 400px;
}

/* Avatar Image */
.image-container {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
    transition: transform 0.3s ease-in-out;
}

/* Hover Effect on Image */
.image-container:hover {
    transform: scale(1.1);
}

/* Glowing Image */
.image-container img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

/* Assistant Name */
h1 {
    font-size: 32px;
    font-weight: 600;
    color: cyan;
    text-shadow: 0 0 10px cyan;
    margin-top: 15px;
}

/* Description */
p {
    font-size: 16px;
    color: #b3eaff;
    margin-top: 10px;
}

/* Microphone Button */
.talk {
    background: cyan;
    border: none;
    padding: 15px;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 0 15px cyan;
}

.talk:hover {
    background: #00ffff;
    box-shadow: 0 0 25px cyan;
}

/* Speech Output */
.content {
    font-size: 18px;
    color: white;
    margin-top: 15px;
    padding: 10px;
    background: rgba(0, 255, 255, 0.2);
    border-radius: 8px;
    display: inline-block;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
}

/* Speaking Animation */
.speaking-animation {
    animation: glow 1s infinite alternate;
}

@keyframes glow {
    0% {
        box-shadow: 0 0 15px cyan;
    }
    100% {
        box-shadow: 0 0 30px cyan;
    }
}

# !JS
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const imageContainer = document.querySelector('.image-container');

const synth = window.speechSynthesis;
let isSpeaking = false;

// Function to get a Female Voice
function getVoice() {
    let voices = synth.getVoices();
    return voices.find(voice => voice.name.includes("Female") || voice.name.includes("Google UK English Female")) || voices[0];
}

// Function to Make LUNA Speak with Animation
function speak(text, callback) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.voice = getVoice();
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    // Add Animation While Speaking
    imageContainer.classList.add('speaking-animation');
    isSpeaking = true;

    text_speak.onend = () => {
        imageContainer.classList.remove('speaking-animation');
        isSpeaking = false;
        if (callback) callback(); // Execute next command after speaking
    };

    synth.speak(text_speak);
}

// Function for Greetings
function wishMe() {
    let hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning, I am LUNA!");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon, I am LUNA!");
    } else {
        speak("Good Evening, I am LUNA!");
    }
}

// Ensure Voices are Loaded Before Speaking
window.speechSynthesis.onvoiceschanged = function () {
    speak("Initializing LUNA...", () => {
        wishMe();
    });
};

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-US";

// Start Recognition Automatically
recognition.start();

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    console.log("Heard:", transcript);

    if (transcript.includes("luna")) {
        speak("Yes, I am listening!", () => {
            content.textContent = "LUNA is ready!";
        });
    } else {
        takeCommand(transcript);
    }
};

// Button Click to Manually Activate
btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Function to Open and Close Websites
function openApp(appName) {
    let websites = {
        "google": "https://www.google.com",
        "youtube": "https://www.youtube.com",
        "facebook": "https://www.facebook.com",
        "twitter": "https://www.twitter.com",
        "instagram": "https://www.instagram.com",
        "github": "https://www.github.com",
        "linkedin": "https://www.linkedin.com",
        "amazon": "https://www.amazon.in",
        "flipkart": "https://www.flipkart.com",
        "netflix": "https://www.netflix.com",
        "spotify": "https://open.spotify.com",
        "discord": "https://www.discord.com",
        "whatsapp": "https://web.whatsapp.com",
        "chatgpt": "https://chat.openai.com",
        "wikipedia": "https://www.wikipedia.org",
        "gmail": "https://mail.google.com",
        "maps": "https://www.google.com/maps",
        "drive": "https://drive.google.com",
        "calendar": "https://calendar.google.com",
        "photos": "https://photos.google.com",
        "telegram": "https://web.telegram.org",
        "reddit": "https://www.reddit.com",
        "snapchat": "https://www.snapchat.com"
    };

    if (websites[appName]) {
        speak(`Opening ${appName}`, () => {
            window.open(websites[appName], "_blank");
        });
    } else {
        speak("I am sorry, I cannot open that application.");
    }
}

function closeApp() {
    speak("Closing this tab", () => {
        window.close();
    });
}
// Function to process commands
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello') || message.includes('hi')) {
        speak("Hello! How may I assist you?");
    } else if (message.includes('goodbye') || message.includes('bye')) {
        speak("Goodbye! Have a great day!");
    } else if (message.includes('who is your founder')) {
        speak("My founder is Soham Pawar a developer who created me to assist with tasks and answer questions.");
    } else if (message.includes('who is your co founder') || message.includes('who is your co-founder')) {
        speak("My co-founder is Sahitya Yadav.");
    }else if (message.includes('who is your ceo') || message.includes('who is your CEO')) {
        speak("My ceo is Sanskar Yadav.");
    } else if (message.includes('what is your name')) {
        speak("My name is LUNA. I am your AI assistant.");
    } else if (message.includes('who are you')) {
        speak("I am LUNA, your AI assistant. I can help you with various tasks.");
    }else if (message.includes('how r u')) {
        speak("I am doing well, thank you for asking. How may I assist you today?");
    }else if (message.includes('today day')) {
        speak("Today is " + new Date().toDateString());
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com", "_blank");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com", "_blank");
    } else if (message.includes("open spotify")) {
        speak("Opening Spotify...");
        window.open("https://open.spotify.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com", "_blank");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        const query = message.replace(/ /g, "+");
        speak("Searching the web for " + message);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else if (message.includes('wikipedia')) {
        const query = message.replace("wikipedia", "").trim();
        speak("Searching Wikipedia for " + query);
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric" });
        speak("Today's date is " + date);
    } else {
        speak("Searching Google for " + message);
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
    }
}

