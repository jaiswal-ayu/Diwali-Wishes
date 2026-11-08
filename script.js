
// ========================================
// DIWALI 2026 - MAIN JAVASCRIPT
// ========================================

// 1. LANGUAGE SWITCH

let currentLanguage = "en";

const languageBtn = document.getElementById("languageBtn");

languageBtn.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "hi" : "en";

    document.querySelectorAll("[data-en][data-hi]").forEach(element => {
        element.textContent = element.dataset[currentLanguage];
    });

    languageBtn.textContent = currentLanguage === "en" ? "हिंदी" : "English";
    document.documentElement.lang = currentLanguage;

    document.getElementById("countdown").querySelectorAll("span").forEach((el, i) => {
        el.textContent = currentLanguage === "en"
            ? ["Days", "Hours", "Minutes", "Seconds"][i]
            : ["दिन", "घंटे", "मिनट", "सेकंड"][i];
    });
});


// 2. MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });
});


// 3. DIWALI COUNTDOWN

// Diwali 2026: November 8, 2026.
// Countdown uses the visitor's local timezone.
const diwaliDate = new Date(2026, 10, 8, 23, 59, 59).getTime();

function updateCountdown() {
    const now = Date.now();
    const difference = diwaliDate - now;

    if (difference <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach(id => {
            document.getElementById(id).textContent = "00";
        });

        document.getElementById("countdownMessage").textContent =
            currentLanguage === "en"
                ? "🪔 Happy Diwali! Let the celebration begin!"
                : "🪔 शुभ दीपावली! उत्सव शुरू करें!";

        return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// 4. FIREWORKS ANIMATION

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = true;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createFirework(x, y) {
    const colors = ["#ffd700", "#ff6600", "#ff00cc", "#00e5ff", "#ffffff"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 65; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;

        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 100,
            size: Math.random() * 3 + 1,
            color
        });
    }

    // Prevent excessive memory usage.
    if (particles.length > 1800) {
        particles.splice(0, particles.length - 1800);
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.vx *= 0.99;
        p.life -= 1.5;

        ctx.globalAlpha = Math.max(0, p.life / 100);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;

    if (animationRunning) {
        requestAnimationFrame(animateFireworks);
    }
}

animateFireworks();

document.getElementById("fireworkBtn").addEventListener("click", () => {
    for (let i = 0; i < 4; i++) {
        createFirework(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight * 0.55
        );
    }
});

// Click anywhere to launch fireworks.
document.addEventListener("click", event => {
    if (event.target.closest("button, a, input, textarea, .generator-form")) {
        return;
    }

    createFirework(event.clientX, event.clientY);
});

// Automatic fireworks, less frequently to avoid overloading.
setInterval(() => {
    if (document.visibilityState === "visible" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        createFirework(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight * 0.5
        );
    }
}, 4500);


// 5. INTERACTIVE DIYAS

const diyas = document.querySelectorAll(".interactive-diya");
const diyaMessage = document.getElementById("diyaMessage");

diyas.forEach(diya => {
    diya.addEventListener("click", () => {
        diya.classList.toggle("lit");

        const litCount = document.querySelectorAll(".interactive-diya.lit").length;

        diyaMessage.textContent = currentLanguage === "en"
            ? `✨ ${litCount} of ${diyas.length} diyas are glowing!`
            : `✨ ${diyas.length} में से ${litCount} दीपक जल रहे हैं!`;

        createFirework(
            diya.getBoundingClientRect().left + 35,
            diya.getBoundingClientRect().top + 35
        );
    });
});


// 6. PERSONALIZED GREETING GENERATOR

const senderInput = document.getElementById("senderName");
const receiverInput = document.getElementById("receiverName");
const wishInput = document.getElementById("wishMessage");

const cardTitle = document.getElementById("cardTitle");
const cardReceiver = document.getElementById("cardReceiver");
const cardMessage = document.getElementById("cardMessage");
const cardSender = document.getElementById("cardSender");

function generateGreeting() {
    const sender = senderInput.value.trim() || "Your Name";
    const receiver = receiverInput.value.trim();
    const message = wishInput.value.trim() ||
        "Wishing you a wonderful Diwali filled with happiness and prosperity!";

    cardTitle.textContent = currentLanguage === "en"
        ? "Happy Diwali"
        : "शुभ दीपावली";

    cardReceiver.textContent = receiver
        ? (currentLanguage === "en" ? `Dear ${receiver}` : `प्रिय ${receiver}`)
        : (currentLanguage === "en" ? "Wishing You & Your Family" : "आपको और आपके परिवार को शुभकामनाएं");

    cardMessage.textContent = message;
    cardSender.textContent = sender;
}

document.getElementById("generateBtn").addEventListener("click", () => {
    generateGreeting();

    document.getElementById("actionMessage").textContent =
        currentLanguage === "en"
            ? "✨ Your greeting card is ready!"
            : "✨ आपका शुभकामना कार्ड तैयार है!";

    document.getElementById("greetingCard").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});


// 7. GREETING TEXT

function getGreetingText() {
    const sender = senderInput.value.trim() || "Your Name";
    const receiver = receiverInput.value.trim();
    const message = wishInput.value.trim();

    if (currentLanguage === "hi") {
        return `🪔 शुभ दीपावली 2026! 🪔

${receiver ? "प्रिय " + receiver + "," : ""}

${message}

आपके जीवन में सुख, शांति और समृद्धि बनी रहे।

सप्रेम शुभकामनाएं,
${sender}`;
    }

    return `🪔 Happy Diwali 2026! 🪔

${receiver ? "Dear " + receiver + "," : ""}

${message}

May your life shine with happiness, peace and prosperity.

With best wishes,
${sender}`;
}


// 8. COPY GREETING

document.getElementById("copyBtn").addEventListener("click", async () => {
    const text = getGreetingText();

    try {
        await navigator.clipboard.writeText(text);

        document.getElementById("actionMessage").textContent =
            currentLanguage === "en"
                ? "✅ Greeting copied successfully!"
                : "✅ शुभकामना कॉपी हो गई!";
    } catch (error) {
        const temp = document.createElement("textarea");
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();

        const copied = document.execCommand("copy");
        temp.remove();

        document.getElementById("actionMessage").textContent = copied
            ? "✅ Greeting copied!"
            : "Please select and copy the greeting manually.";
    }
});


// 9. WHATSAPP SHARING

document.getElementById("whatsappBtn").addEventListener("click", () => {
    const message = getGreetingText();
    const whatsappURL = "https://wa.me/?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});


// 10. DOWNLOAD GREETING CARD AS PNG

document.getElementById("downloadBtn").addEventListener("click", () => {
    generateGreeting();

    const cardCanvas = document.createElement("canvas");
    const cardCtx = cardCanvas.getContext("2d");

    cardCanvas.width = 1200;
    cardCanvas.height = 1200;

    // Background.
    const gradient = cardCtx.createLinearGradient(0, 0, 1200, 1200);
    gradient.addColorStop(0, "#180b2c");
    gradient.addColorStop(0.5, "#64234f");
    gradient.addColorStop(1, "#160b2b");

    cardCtx.fillStyle = gradient;
    cardCtx.fillRect(0, 0, 1200, 1200);

    // Decorative border.
    cardCtx.strokeStyle = "#ffd700";
    cardCtx.lineWidth = 9;
    cardCtx.strokeRect(35, 35, 1130, 1130);

    cardCtx.lineWidth = 2;
    cardCtx.strokeRect(55, 55, 1090, 1090);

    // Gold decorations.
    cardCtx.fillStyle = "#ffd700";
    cardCtx.textAlign = "center";
    cardCtx.font = "45px serif";
    cardCtx.fillText("✦   ✧   ✦   ✧   ✦", 600, 125);

    // Diya.
    cardCtx.font = "100px serif";
    cardCtx.fillText("🪔", 600, 285);

    // Heading.
    cardCtx.fillStyle = "#ffd700";
    cardCtx.font = "bold 42px sans-serif";
    cardCtx.fillText("THE FESTIVAL OF LIGHTS", 600, 370);

    cardCtx.font = "110px cursive";
    cardCtx.fillStyle = "#ffe58a";
    cardCtx.fillText(
        currentLanguage === "en" ? "Happy Diwali" : "शुभ दीपावली",
        600, 520
    );

    cardCtx.font = "65px sans-serif";
    cardCtx.fillStyle = "#ffbd54";
    cardCtx.fillText("2026", 600, 615);

    cardCtx.font = "42px sans-serif";
    cardCtx.fillStyle = "#fff2bf";

    const receiver = receiverInput.value.trim();
    const receiverText = receiver
        ? (currentLanguage === "en" ? `Dear ${receiver}` : `प्रिय ${receiver}`)
        : (currentLanguage === "en" ? "Wishing You & Your Family" : "आपको और आपके परिवार को शुभकामनाएं");

    cardCtx.fillText(receiverText, 600, 710);

    // Wrap message.
    const message = wishInput.value.trim() ||
        "Wishing you a wonderful Diwali filled with happiness!";

    cardCtx.font = "29px sans-serif";
    const words = message.split(/\s+/);
    let line = "";
    let y = 790;
    const maxWidth = 900;

    words.forEach(word => {
        const testLine = line + word + " ";

        if (cardCtx.measureText(testLine).width > maxWidth && line) {
            cardCtx.fillText(line.trim(), 600, y);
            line = word + " ";
            y += 48;
        } else {
            line = testLine;
        }
    });

    if (line) {
        cardCtx.fillText(line.trim(), 600, y);
    }

    // Sender.
    cardCtx.fillStyle = "#ffd700";
    cardCtx.font = "bold 32px sans-serif";
    cardCtx.fillText(
        (currentLanguage === "en" ? "With love, " : "सप्रेम, ") +
        (senderInput.value.trim() || "Your Name"),
        600, 1030
    );

    cardCtx.font = "40px serif";
    cardCtx.fillText("✦   ✧   ✦   ✧   ✦", 600, 1100);

    // Download.
    const link = document.createElement("a");
    link.download = "Happy-Diwali-2026.png";
    link.href = cardCanvas.toDataURL("image/png");
    link.click();

    document.getElementById("actionMessage").textContent =
        currentLanguage === "en"
            ? "✅ Your greeting card has been downloaded!"
            : "✅ आपका ग्रीटिंग कार्ड डाउनलोड हो गया!";
});



// REAL DIWALI BACKGROUND MUSIC

const audio = document.getElementById("diwaliAudio");
const musicBtn = document.getElementById("musicBtn");
const volumeControl = document.getElementById("volumeControl");

audio.volume = 0.5;

musicBtn.addEventListener("click", async () => {
    if (audio.paused) {
        try {
            await audio.play();
            musicBtn.textContent = "⏸ Pause Music";
        } catch (error) {
            musicBtn.textContent = "▶ Play Music";
            alert("Music could not play. Check your MP3 file.");
        }
    } else {
        audio.pause();
        musicBtn.textContent = "▶ Play Music";
    }
});

volumeControl.addEventListener("input", () => {
    audio.volume = Number(volumeControl.value);
});

audio.addEventListener("ended", () => {
    musicBtn.textContent = "▶ Play Music";
});



// 12. INITIAL GREETING

generateGreeting();

console.log("🪔 Happy Diwali 2026 website loaded successfully!");



// INTERACTIVE DIWALI CRACKERS
const crackerEffects = document.getElementById("crackerEffects");

function crackerBurst(x, y, count = 35, colors = ["#ffd700", "#ff4500", "#00ffff", "#ff00ff"]) {
    for (let i = 0; i < count; i++) {
        const spark = document.createElement("div");
        spark.className = "cracker-spark";

        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 170;

        spark.style.left = x + "px";
        spark.style.top = y + "px";
        spark.style.setProperty("--dx", Math.cos(angle) * distance + "px");
        spark.style.setProperty("--dy", Math.sin(angle) * distance + "px");
        spark.style.setProperty("--spark-color", colors[Math.floor(Math.random() * colors.length)]);

        crackerEffects.appendChild(spark);
        spark.addEventListener("animationend", () => spark.remove());
    }
}

document.querySelectorAll(".cracker-btn").forEach(button => {
    button.addEventListener("click", () => {
        const type = button.dataset.cracker;
        const rect = button.getBoundingClientRect();

        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        if (type === "rocket") {
            const rocket = document.createElement("div");
            rocket.className = "cracker-rocket";
            rocket.textContent = "🚀";
            rocket.style.left = x + "px";
            rocket.style.top = y + "px";
            crackerEffects.appendChild(rocket);

            rocket.addEventListener("animationend", () => {
                rocket.remove();
                crackerBurst(x, Math.max(80, y - 300), 65);
            });
        }

        if (type === "anar") {
            crackerBurst(x, y, 55, ["#ffd700", "#ff4500", "#ffffff"]);
            crackerBurst(x, y - 100, 35, ["#ffd700", "#ff8800"]);
        }

        if (type === "chakri") {
            const ring = document.createElement("div");
            ring.className = "cracker-ring";
            ring.style.left = (x - 45) + "px";
            ring.style.top = (y - 45) + "px";
            crackerEffects.appendChild(ring);

            crackerBurst(x, y, 30, ["#00ffff", "#ffffff", "#ffd700"]);
            ring.addEventListener("animationend", () => ring.remove());
        }

        if (type === "flower") {
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    crackerBurst(x, y - i * 45, 25, ["#ff00ff", "#ffd700", "#ff4500"]);
                }, i * 120);
            }
        }

        if (type === "burst") {
            const flash = document.createElement("div");
            flash.className = "cracker-flash";
            flash.style.left = (x - 2) + "px";
            flash.style.top = (y - 2) + "px";
            crackerEffects.appendChild(flash);

            crackerBurst(x, y, 90);
            flash.addEventListener("animationend", () => flash.remove());
        }

        if (type === "rain") {
            for (let i = 0; i < 65; i++) {
                const spark = document.createElement("div");
                spark.className = "cracker-spark";
                spark.style.left = (x - 100 + Math.random() * 200) + "px";
                spark.style.top = (y - 100) + "px";
                spark.style.setProperty("--dx", (Math.random() * 100 - 50) + "px");
                spark.style.setProperty("--dy", (100 + Math.random() * 220) + "px");
                spark.style.setProperty("--spark-color", "#ffd700");
                crackerEffects.appendChild(spark);
                spark.addEventListener("animationend", () => spark.remove());
            }
        }
    });
});