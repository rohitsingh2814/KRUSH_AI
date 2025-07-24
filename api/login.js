const { connectToDatabase, User, isValidEmail } = require('./_db');
const bcrypt = require('bcryptjs');

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