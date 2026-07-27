import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

// __dirname polyfill for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Simple file-based storage as a reliable fallback
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'contacts.json');

function ensureDataFile() {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]', 'utf-8');
  } catch (err) {
    console.error('Failed to ensure data directory/file:', err);
  }
}

function readContacts() {
  try {
    const raw = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read contacts:', err);
    return [];
  }
}

function writeContacts(contacts) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write contacts:', err);
  }
}

ensureDataFile();

// Optional email transporter (only if credentials provided)
let transporter = null;
try {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (user && pass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
    // Verify config in background
    transporter.verify().catch(() => {});
  }
} catch (err) {
  console.error('Failed to configure email transporter:', err);
}

async function sendEmailNotification(name, email, message) {
  if (!transporter) return false;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'patrisureshkumar67338@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This email was sent from your portfolio contact form.</small></p>
      `,
    });
    return true;
  } catch (err) {
    console.error('Error sending email:', err);
    return false;
  }
}

// API routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const record = {
    id: Date.now(),
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    created_at: new Date().toISOString(),
  };

  // Persist to file
  const contacts = readContacts();
  contacts.unshift(record);
  writeContacts(contacts);

  // Try email notification (optional)
  await sendEmailNotification(record.name, record.email, record.message);

  return res.status(201).json({ success: true, message: 'Message sent successfully!', data: record });
});

app.get('/api/contacts', (req, res) => {
  const contacts = readContacts();
  return res.json(contacts);
});

// Serve contacts page (optional; adjust to your build output if needed)
app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
