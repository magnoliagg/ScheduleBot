const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all schedules
app.get('/api/schedules', (req, res) => {
    db.all('SELECT * FROM schedules ORDER BY date, time', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Add new schedule
app.post('/api/schedules', (req, res) => {
    const { title, description, date, time } = req.body;

    if (!title || !date || !time) {
        return res.status(400).json({ error: 'Title, date, and time are required' });
    }

    if (title.trim().length === 0) {
        return res.status(400).json({ error: 'Title cannot be empty' });
    }

    db.run('INSERT INTO schedules (title, description, date, time) VALUES (?, ?, ?, ?)',
        [title.trim(), description ? description.trim() : '', date, time], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID, title: title.trim(), description: description ? description.trim() : '', date, time });
            }
        });
});

// Delete schedule
app.delete('/api/schedules/:id', (req, res) => {
    const id = req.params.id;

    db.run('DELETE FROM schedules WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ deleted: this.changes });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});