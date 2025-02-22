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
