document.addEventListener("DOMContentLoaded", () => {
  const chatWidget = document.getElementById("chatWidget");
  const chatBox = document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginError = document.getElementById("loginError");
  const authModalTitle = document.getElementById("authModalTitle");
  const authModalDescription = document.getElementById("authModalDescription");
  const signupNameField = document.getElementById("signupNameField");
  const signupConfirmField = document.getElementById("signupConfirmField");
  const signupName = document.getElementById("signupName");
  const signupPasswordConfirm = document.getElementById("signupPasswordConfirm");
  const authSubmitBtn = document.getElementById("authSubmitBtn");
  const loginModeBtn = document.getElementById("loginModeBtn");
  const signupModeBtn = document.getElementById("signupModeBtn");
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");

  const credentials = {
    email: "admin@agenticos.com",
    password: "AgenticOS123"
  };

  let authMode = "login";

  function setAuthMode(mode) {
    authMode = mode;
    if (!authModalTitle || !authModalDescription || !authSubmitBtn || !loginModeBtn || !signupModeBtn) return;

    loginModeBtn.classList.toggle("active", mode === "login");
    signupModeBtn.classList.toggle("active", mode === "signup");
    authSubmitBtn.textContent = mode === "signup" ? "Sign Up" : "Login";
    authModalTitle.textContent = mode === "signup" ? "Create an AgenticOS Account" : "Access AgenticOS";
    authModalDescription.textContent = mode === "signup"
      ? "Create an account to explore the platform and get AI-powered support."
      : "Login to launch the platform assistant and get instant website guidance.";

    if (signupNameField) {
      signupNameField.style.display = mode === "signup" ? "block" : "none";
    }
    if (signupConfirmField) {
      signupConfirmField.style.display = mode === "signup" ? "block" : "none";
    }
    if (loginError) {
      loginError.textContent = "";
      loginError.style.color = "#ef4444";
    }
  }

  function scrollChat() {
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  function addMessage(text, sender) {
    if (!chatBox) return;
    const msg = document.createElement("div");
    msg.className = sender === "ai" ? "ai-message" : "user-message";
    msg.innerText = text;
    chatBox.appendChild(msg);
    scrollChat();
  }

  function generateReply(message) {
    const text = message.toLowerCase();

    if (/login|sign in|password|email/.test(text)) {
      return "To get started, click the login button and use the demo credentials admin@agenticos.com / AgenticOS123. If login fails, I'll inform you exactly what went wrong.";
    }

    if (/about|who are you|what is agenticos/.test(text)) {
      return "AgenticOS is a platform for autonomous multi-agent system orchestration. It helps teams build intelligent workflows, optimize operations, and connect agents for enterprise use cases.";
    }

    if (/technology|tech|architecture/.test(text)) {
      return "Our technology combines specialized agents, automated orchestration, and real-time monitoring to deliver scalable, resilient AI systems.";
    }

    if (/application|use case|industry/.test(text)) {
      return "Our platform supports finance, healthcare, logistics, and manufacturing with intelligent agent solutions for risk, diagnostics, routing, and predictive maintenance.";
    }

    if (/research|paper|whitepaper/.test(text)) {
      return "Explore our research section for publications on multi-agent orchestration, governance, and transparent AI behavior control.";
    }

    if (/contact|reach|support/.test(text)) {
      return "You can reach us at u3063800@uel.ac.uk or use the contact form to send a message. I can also answer questions here instantly.";
    }

    if (/dashboard|analytics|stats/.test(text)) {
      return "The dashboard shows adoption, active developers, and ROI metrics for AgenticOS in real time.";
    }

    if (/demo|start|get started/.test(text)) {
      return "Click the login button to open the welcome form. After login, you can continue chatting with the assistant about the site.";
    }

    if (/hello|hi|hey|greetings/.test(text)) {
      return "Hello! I'm the AgenticOS assistant. Ask me anything about the website, applications, research, or login flow.";
    }

    return "I'm here to help with website details. Ask about AgenticOS features, applications, research, contact info, or how to get started.";
  }

  function openChat() {
    if (!chatWidget) return;
    chatWidget.classList.add("show");
    if (chatBox && chatBox.childElementCount === 0) {
      setTimeout(() => {
        addMessage("Welcome to AgenticOS 🚀 Ask me anything about the website, features, or login process.", "ai");
      }, 250);
    }
  }

  function closeChat() {
    if (!chatWidget) return;
    chatWidget.classList.remove("show");
  }

  function openLoginModal() {
    if (!loginModal) return;
    setAuthMode("login");
    loginModal.classList.add("show");
    closeChat();
  }

  function closeLoginModal() {
    if (!loginModal) return;
    loginModal.classList.remove("show");
    if (loginError) {
      loginError.textContent = "";
    }
  }

  function showLoginError(message, success = false) {
    if (!loginError) return;
    loginError.textContent = message;
    loginError.style.color = success ? "#22c55e" : "#ef4444";
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!loginEmail || !loginPassword) return;

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (authMode === "signup") {
      const name = signupName?.value.trim();
      const confirmPassword = signupPasswordConfirm?.value.trim();

      if (!name || !email || !password || !confirmPassword) {
        showLoginError("Please complete every field to create your new account.");
        return;
      }

      if (!validateEmail(email)) {
        showLoginError("Please enter a valid email address.");
        return;
      }

      if (password !== confirmPassword) {
        showLoginError("Passwords do not match. Please try again.");
        return;
      }

      showLoginError("Account created successfully! Please login with your new credentials.", true);
      setAuthMode("login");
      if (loginEmail) loginEmail.value = email;
      if (loginPassword) loginPassword.value = "";
      if (signupName) signupName.value = "";
      if (signupPasswordConfirm) signupPasswordConfirm.value = "";
      return;
    }

    if (email !== credentials.email && password !== credentials.password) {
      showLoginError("Email and password are both incorrect. Please try again.");
      return;
    }

    if (email !== credentials.email) {
      showLoginError("The email address is not recognized. Please use admin@agenticos.com.");
      return;
    }

    if (password !== credentials.password) {
      showLoginError("The password is incorrect. Please use AgenticOS123.");
      return;
    }

    showLoginError("Login successful! Redirecting to the platform...", true);
    setTimeout(() => {
      closeLoginModal();
      openChat();
      addMessage("Great! You are logged in. How can I help you explore AgenticOS next?", "ai");
    }, 900);
  }

  function validateEmail(address) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
  }

  function submitContactForm(event) {
    event.preventDefault();
    if (!contactForm || !contactStatus) return;

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      contactStatus.textContent = "Please fill in every field before sending.";
      contactStatus.style.color = "#ef4444";
      return;
    }

    if (!validateEmail(email)) {
      contactStatus.textContent = "The email address looks incorrect. Please enter a valid email.";
      contactStatus.style.color = "#ef4444";
      return;
    }

    contactStatus.textContent = "Message sent successfully! We'll contact you soon.";
    contactStatus.style.color = "#22c55e";
    contactForm.reset();
  }

  function sendMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (text === "") return;
    addMessage(text, "user");
    chatInput.value = "";
    setTimeout(() => {
      addMessage(generateReply(text), "ai");
    }, 700);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", submitContactForm);
  }

  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLoginModal();
      closeChat();
    }
  });

  window.openChat = openChat;
  window.closeChat = closeChat;
  window.openLoginModal = openLoginModal;
  window.closeLoginModal = closeLoginModal;
  window.sendMessage = sendMessage;
  window.startChat = openChat;
  window.submitContactForm = submitContactForm;
  window.setAuthMode = setAuthMode;
});