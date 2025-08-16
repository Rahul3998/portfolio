(function () {
  document.getElementById("year").textContent = new Date().getFullYear();
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.textContent = "Thanks! Your message has been received.";
      form.reset();
    });
  }
})();