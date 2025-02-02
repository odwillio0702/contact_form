const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    if (req.method === "POST") {
        const { name, email, message } = req.body;

      
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,  
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.MAIL_TO,  
            subject: "New Contact Form Submission",
            html: `
                <h2>New Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: "Message sent successfully!" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to send message." });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
};
