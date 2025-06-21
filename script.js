document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const status = document.getElementById("form-status");

  try {
    const response = await fetch("https://formspree.io/f/mgvylpnd", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    const data = await response.json();

    if (response.ok) {
      status.textContent = "✅ Thank you! Your message has been sent.";
      status.style.color = "lightgreen";
      form.reset();
    } else {
      const messages = data.errors?.map(err => err.message).join(", ") || "❌ Submission failed.";
      status.textContent = messages;
      status.style.color = "orange";
    }

  } catch (error) {
    console.error("Form submission error:", error);
    status.textContent = "⚠️ Network or script error. Please try again.";
    status.style.color = "red";
  }
});
