alert("Contact JS Loaded");
document.getElementById("contactForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    let text =
`Assalam o Alaikum!

New Contact Form Message

👤 Name: ${name}

📧 Email: ${email}

📞 Phone: ${phone}

💬 Message:
${message}`;

    let whatsappURL =
    "https://wa.me/923497422079?text=" + encodeURIComponent(text);

    window.open(whatsappURL, "_blank");

});