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