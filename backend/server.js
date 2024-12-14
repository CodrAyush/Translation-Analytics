const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // To serve static files

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/analyticsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Define Schema and Model
const logSchema = new mongoose.Schema({
  language: String,
  apiResponseTime: Number,
  userAction: String,
  timestamp: Date,
});

const Log = mongoose.model('Log', logSchema);

// API Endpoint to Fetch Logs
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await Log.find({});
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// New: API Endpoint to Filter Logs
app.get('/api/logs/filter', async (req, res) => {
  const { language, startDate, endDate } = req.query;

  const filter = {};
  if (language) filter.language = language;
  if (startDate || endDate) {
    filter.timestamp = {};
    if (startDate) filter.timestamp.$gte = new Date(startDate);
    if (endDate) filter.timestamp.$lte = new Date(endDate);
  }

  try {
    const filteredLogs = await Log.find(filter);
    res.json(filteredLogs);
  } catch (error) {
    console.error('Error filtering logs:', error);
    res.status(500).json({ error: 'Failed to filter logs' });
  }
});

// New: API Endpoint for Analytics
app.get('/api/logs/analytics', async (req, res) => {
  try {
    const totalLogs = await Log.countDocuments({});
    const avgResponseTime = await Log.aggregate([
      { $group: { _id: null, avgTime: { $avg: '$apiResponseTime' } } },
    ]);
    const activityFrequency = await Log.aggregate([
      { $group: { _id: '$userAction', count: { $sum: 1 } } },
    ]);

    res.json({
      totalLogs,
      avgResponseTime: avgResponseTime[0]?.avgTime || 0,
      activityFrequency,
    });
  } catch (error) {
    console.error('Error calculating analytics:', error);
    res.status(500).json({ error: 'Failed to calculate analytics' });
  }
});

// Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
