const { connectToDatabase, User, isValidEmail } = require('./_db');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await connectToDatabase();
  const { name, email, password } = req.body;
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format' });
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.json({ message: 'Signup successful' });
}; 