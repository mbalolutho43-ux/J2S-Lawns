const nodemailer = require("nodemailer");
const express = require("express");
const fs = require("fs");

const app = express();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.use(express.json());
app.use(express.static("public"));

app.post("/contact", (req, res) => {

    const enquiry = req.body;

    let enquiries = [];

    if (fs.existsSync("enquiries.json")) {
        enquiries = JSON.parse(
            fs.readFileSync("enquiries.json")
        );
    }

    enquiries.push(enquiry);

    console.log("Saving enquiry...");

    fs.writeFileSync(
        "enquiries.json",
        JSON.stringify(enquiries, null, 2)
    );

    console.log("Enquiry saved!");

    // Respond to the website immediately
    res.json({
        message: "✅ Thank you! Your enquiry has been received. We will contact you soon."
    });

    // Send email in the background
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New J2S Lawns Enquiry",
        text: `
Name: ${enquiry.name}
Email: ${enquiry.email}
Phone: ${enquiry.phone}

Message:
${enquiry.message}
`
    })
    .then(() => {
        console.log("Email sent successfully!");
    })
    .catch((error) => {
        console.error("Email sending failed:", error);
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});