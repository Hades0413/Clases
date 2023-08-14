// SEND
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const from_name = document.getElementById("from_name").value;
    const email_id = document.getElementById("email_id").value;
    const reply_to = document.getElementById("reply_to").value;
    const message = document.getElementById("message").value;

    const btn = document.getElementById("button");

    const formFields = {
      from_name: document.getElementById("from_name"),
      email_id: document.getElementById("email_id"),
      reply_to: document.getElementById("reply_to"),
      message: document.getElementById("message"),
    };

    if (!from_name || !email_id || !reply_to || !message) {
      for (const field in formFields) {
        formFields[field].removeAttribute("required");
      }

      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Por favor, complete correctamente todos los campos...!",
        confirmButtonColor: "rgba(255, 0, 0, 0.8)",
        allowOutsideClick: false,
      }).then(() => {
        for (const field in formFields) {
          formFields[field].setAttribute("required", "");
        }
      });

      return;
    }

    btn.textContent = "Sending...";

    const templateParams = {
      from_name: from_name,
      email_id: email_id,
      message: message,
      reply_to: reply_to,
    };

    emailjs.send("service_dceb20d", "template_8jid9tu", templateParams).then(
      () => {
        btn.textContent = "Send Email";
        Swal.fire({
          icon: "success",
          title: "GOAT!",
          text: "Tu mensaje ha sido enviado!",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        }).then(() => {
          location.reload();
        });
      },
      (err) => {
        btn.textContent = "Send Email";
        console.error("Error al enviar el mensaje:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al enviar el mensaje. Por favor, intenta nuevamente.",
          confirmButtonColor: "rgba(255, 0, 0, 0.8)",
          allowOutsideClick: false,
        });
      }
    );
  });
