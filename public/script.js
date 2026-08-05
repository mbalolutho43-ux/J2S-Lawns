alert("SCRIPT LOADED");
console.log("SCRIPT LOADED");
const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async (e) => {
        console.log("Submit button clicked!");

    e.preventDefault();

    console.log("Submit button clicked!");

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    };

    console.log(data);

    try {

        const response = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log("Response status:", response.status);

        const result = await response.json();

        document.getElementById("formMessage").textContent = result.message;

        form.reset();

    } catch (err) {

        console.error("Fetch error:", err);

        document.getElementById("formMessage").textContent =
            "Error sending enquiry.";

    }

});

}
function checkLocation() {

    const location =
        document.getElementById("locationInput")
        .value
        .toLowerCase();

    const serviceAreas = [
    "mthatha",
    "east london",
    "libode",
    "ngqeleni",
    "port st johns"
];
    

    const result =
        document.getElementById("locationResult");

    if(serviceAreas.includes(location)) {

        result.textContent =
            "✅ Great news! J2S Lawns services your area.";

    } else {

        result.textContent =
            "❌ Please contact us to confirm availability.";

    }

}
function calculateQuote(){

    const size =
        Number(document.getElementById("lawnSize").value);

    const pricePerSquareMeter = 2;

    const total = size * pricePerSquareMeter;

    document.getElementById("quoteResult")
        .textContent =
        `Estimated Price: R${total}`;
}