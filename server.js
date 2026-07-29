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

app.post("/contact", async (req, res) => {

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
    console.log("EMAIL FEATURE ACTIVE");

try {
    console.log("Attempting to send email...");
    await transporter.sendMail({
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
    });

    console.log("Email sent successfully!");
} catch (error) {
    console.error("Email sending failed:", error);
}

res.json({ 
    message: "Thank you for your enquiry! We will get back to you soon." });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});