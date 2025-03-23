document.addEventListener("DOMContentLoaded", () => {
  // Prisijungimas
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("submit-login");
  const errorMsg = document.getElementById("login-error");
  const userContainer = document.getElementById("user-container");
  const userEmail = document.getElementById("user-email");
  const logoutBtn = document.getElementById("logout-btn");
  const loginModal = document.getElementById("login-modal");
  const togglePassword = document.getElementById("toggle-password");

  if (loginBtn) {
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showUser(email) {
      userContainer.style.display = "flex";
      loginModal.style.display = "none";
    }
    
    

    function validateForm() {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (isValidEmail(email) && password.length >= 6) {
        errorMsg.style.display = "none";
        localStorage.setItem("userEmail", email);
        showUser(email);
      } else {
        errorMsg.style.display = "block";
      }
    }

    loginBtn.addEventListener("click", validateForm);

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userEmail");
      userContainer.style.display = "none";
      loginModal.style.display = "flex";
      emailInput.value = "";
      passwordInput.value = "";
    });

    togglePassword.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type");
      if (type === "password") {
        passwordInput.setAttribute("type", "text");
        togglePassword.innerHTML = "🙈 Slėpti";
      } else {
        passwordInput.setAttribute("type", "password");
        togglePassword.innerHTML = "👁️ Rodyti";
      }
    });

    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      showUser(savedEmail);
    }
  }

  // Daugiau/Mažiau mygtukai
  const buttons = document.querySelectorAll(".toggle-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const fullText = btn.nextElementSibling;
      fullText.classList.toggle("hidden");
      btn.textContent = fullText.classList.contains("hidden") ? "Daugiau" : "Mažiau";
    });
  });
});
