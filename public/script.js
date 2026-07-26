const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        };

        const response = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(result.message);

        form.reset();

    });

}
function checkLocation() {

    alert("Button clicked!");

    const location =
        document.getElementById("locationInput")
        .value
        .toLowerCase();

    const serviceAreas = [
        "east london",
        "beacon bay",
        "gonubie",
        "nahoon",
        "berea"
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