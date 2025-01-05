// api/sendmail.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    if (req.method === "POST") {
        const { name, email, message } = req.body;

        // Настроим транспортер для отправки почты через Gmail или другой сервис
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your_email@gmail.com', // Твой email
                pass: 'your_email_password',   // Пароль или приложение для доступа
            },
        });

        const mailOptions = {
            from: email,
            to: "your_email@example.com", // Твой email, куда будут приходить письма
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
