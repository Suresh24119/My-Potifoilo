const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // You'll need to set this in Secrets
    pass: process.env.EMAIL_PASS || 'your-app-password'     // You'll need to set this in Secrets
  }
});

// Initialize database table
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    console.log('Continuing without database...');
  }
}

// Function to send email notification
async function sendEmailNotification(name, email, message) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'patelsureshkumar67338@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This email was sent from your portfolio contact form.</small></p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
// API Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    // Send email notification
    await sendEmailNotification(name, email, message);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error saving contact:', err);
    // Fallback: just log the message and return success
    console.log(`Contact form submission: ${name} (${email}): ${message}`);
    res.status(201).json({
      success: true,
      message: 'Message received successfully!',
      data: { name, email, message, created_at: new Date() }
    });
  }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    // Return empty array as fallback
    res.json([]);
  }
});

// Serve contacts page
app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});