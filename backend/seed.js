const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/analyticsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Schema and Model
const logSchema = new mongoose.Schema({
  language: String,
  apiResponseTime: Number,
  timestamp: Date,
});

const Log = mongoose.model('Log', logSchema);

// Mock Data
const mockData = [
  { language: 'English', apiResponseTime: 120, timestamp: new Date() },
  { language: 'Spanish', apiResponseTime: 95, timestamp: new Date() },
  { language: 'French', apiResponseTime: 80, timestamp: new Date() },
  { language: 'German', apiResponseTime: 100, timestamp: new Date() },

];

// Insert Data into MongoDB
async function seedData() {
  try {
    await Log.insertMany(mockData);
    console.log('Mock data inserted successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting mock data:', error);
  }
}

seedData();
