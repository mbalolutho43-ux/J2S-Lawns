const express = require("express");
const fs = require("fs");

const app = express();

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

    res.json({
        message: "Thank you! Your message has been received."
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});