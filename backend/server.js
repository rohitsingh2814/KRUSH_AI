const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URi, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  preferences: {
    age: String,
    colorTone: String,
    events: [String],
  },
});
const User = mongoose.model('User', userSchema);

// Email validation helper
function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format' });
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.json({ message: 'Signup successful' });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const bcrypt = require('bcryptjs');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

  // Return full user object (excluding password)
  res.json({
    message: 'Login successful',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences || {},
    }
  });
});

// PUT /api/users/:id - update name and preferences only
app.put('/api/users/:id', async (req, res) => {
  const { name, preferences } = req.body;
  const update = {};
  if (name) update.name = name;
  if (preferences) {
    update.preferences = {};
    if (preferences.age !== undefined) update.preferences.age = preferences.age;
    if (preferences.colorTone !== undefined) update.preferences.colorTone = preferences.colorTone;
    if (preferences.events !== undefined) update.preferences.events = preferences.events;
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true, fields: { password: 0 } }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences || {},
    });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// POST /api/recommendations - get clothing recommendations based on questionnaire answers
app.post('/api/recommendations', async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Mock AI response - in a real app, this would call an AI service
    const mockRecommendations = {
      products: [
        {
          name: "Elegant Evening Dress",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
          link: "https://example.com/product1",
          description: "Perfect for your body type and occasion"
        },
        {
          name: "Casual Summer Blouse",
          price: 45.99,
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
          link: "https://example.com/product2",
          description: "Complements your skin tone beautifully"
        },
        {
          name: "Professional Work Suit",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
          link: "https://example.com/product3",
          description: "Tailored for your measurements"
        },
        {
          name: "Date Night Cocktail Dress",
          price: 75.99,
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
          link: "https://example.com/product4",
          description: "Flattering for your body shape"
        },
        {
          name: "Comfortable Casual Jeans",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
          link: "https://example.com/product5",
          description: "Perfect fit for your measurements"
        },
        {
          name: "Formal Business Attire",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
          link: "https://example.com/product6",
          description: "Professional and stylish"
        }
      ]
    };

    // Simulate AI processing delay
    setTimeout(() => {
      res.json(mockRecommendations);
    }, 1000);
    
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
