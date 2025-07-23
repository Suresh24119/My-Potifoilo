
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Simple local JSON file storage
const DATA_FILE = path.join(__dirname, 'contacts.json');

// Initialize local data file
function initDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]');
      console.log('Local data file created successfully');
    } else {
      console.log('Local data file exists, ready to use');
    }
  } catch (err) {
    console.error('Error initializing local data file:', err);
  }
}

// Helper functions for data management
function readContacts() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading contacts:', err);
    return [];
  }
}

function writeContacts(contacts) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing contacts:', err);
    return false;
  }
}

// Routes
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const contacts = readContacts();
    const newContact = {
      id: Date.now(),
      name,
      email,
      message,
      created_at: new Date().toISOString()
    };
    
    contacts.push(newContact);
    
    if (writeContacts(contacts)) {
      console.log(`Contact saved: ${name} (${email}): ${message}`);
      res.status(201).json({
        success: true,
        message: 'Message sent successfully!',
        data: newContact
      });
    } else {
      throw new Error('Failed to save contact');
    }
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save message' 
    });
  }
});

// Get all contacts (for admin purposes)
app.get('/api/contacts', (req, res) => {
  try {
    const contacts = readContacts();
    res.json(contacts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`App available at: http://localhost:${PORT}`);
  initDatabase();
});
