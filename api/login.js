const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let conn = null;
const uri = process.env.MONGO_URI;

async function connectToDatabase() {
  if (conn == null) {
    conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return conn;
}

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await connectToDatabase();
  const { email, password } = req.body;
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

  res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
}; 