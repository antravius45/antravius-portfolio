document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // DOM interaction: accessible mobile navigation
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // DOM interaction: project filtering
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const filterStatus = document.querySelector("#filter-status");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((item) => item.classList.remove("active-filter"));
      button.classList.add("active-filter");

      projectCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.hidden = !matches;
        if (matches) visibleCount++;
      });

      if (filterStatus) {
        filterStatus.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown.`;
      }
    });
  });

  // Form validation interaction
  const form = document.querySelector("#contact-form");

  if (form) {
    const fields = {
      name: {
        input: document.querySelector("#name"),
        error: document.querySelector("#name-error"),
        message: "Please enter your name."
      },
      email: {
        input: document.querySelector("#email"),
        error: document.querySelector("#email-error"),
        message: "Please enter a valid email address."
      },
      message: {
        input: document.querySelector("#message"),
        error: document.querySelector("#message-error"),
        message: "Please enter a message."
      }
    };

    const clearError = (field) => {
      field.input.classList.remove("input-error");
      field.input.removeAttribute("aria-invalid");
      field.error.textContent = "";
    };

    const showError = (field, message) => {
      field.input.classList.add("input-error");
      field.input.setAttribute("aria-invalid", "true");
      field.error.textContent = message;
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      Object.values(fields).forEach(clearError);

      let valid = true;

      if (!fields.name.input.value.trim()) {
        showError(fields.name, fields.name.message);
        valid = false;
      }

      const emailValue = fields.email.input.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailValue)) {
        showError(fields.email, fields.email.message);
        valid = false;
      }

      if (!fields.message.input.value.trim()) {
        showError(fields.message, fields.message.message);
        valid = false;
      }

      const status = document.querySelector("#form-status");

      if (!valid) {
        status.textContent = "Please correct the highlighted fields and try again.";
        const firstInvalid = form.querySelector(".input-error");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      status.textContent = "Thanks! Your message passed validation. This demo form is ready to connect to a form service.";
      form.reset();
    });
  }
});
