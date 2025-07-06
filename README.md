# Krush AI - Fashion Recommendations App

A modern React web application that uses AI to analyze photos and provide personalized fashion recommendations based on color analysis, event type, and user preferences.

## 🚀 Features

- **Photo Upload & Analysis**: Drag-and-drop photo upload with AI-powered color analysis
- **Event-Based Recommendations**: Tailored suggestions for parties, weddings, work, casual, formal, and date nights
- **Color Tone Detection**: AI analysis of skin tone and color palette recommendations
- **Personalized Shopping**: Direct links to purchase recommended clothing items
- **User Authentication**: Secure login and signup with profile management
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Data Persistence**: Save preferences and analysis history

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **File Upload**: React Dropzone
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Color Analysis**: Custom AI simulation with color theory

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd KRUSH_AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 How to Use

### 1. Getting Started
- Visit the homepage and click "Get Started Free"
- Create an account or sign in to your existing account

### 2. Photo Analysis
- Upload a clear photo of yourself using the drag-and-drop interface
- Select the event type (party, wedding, work, etc.)
- Choose your age range and color tone preference
- Click "Analyze & Get Recommendations"

### 3. View Results
- Review your AI-detected color palette and skin tone analysis
- Browse personalized clothing recommendations
- Click "Buy Now" to purchase items from external retailers
- Save items you like for future reference

### 4. Manage Profile
- Update your personal information and preferences
- View your saved items and analysis history
- Customize your event preferences and color tone settings

## 🎨 Features in Detail

### AI Color Analysis
- Detects dominant colors in uploaded photos
- Analyzes skin tone (warm, cool, neutral, olive)
- Recommends seasonal color palettes (Autumn, Winter, Spring, Summer)
- Provides confidence scores for analysis accuracy

### Event-Specific Recommendations
- **Party**: Bold, statement pieces for social events
- **Wedding**: Elegant, sophisticated attire for special occasions
- **Work/Office**: Professional, polished business wear
- **Casual**: Comfortable, everyday fashion
- **Formal**: High-end, luxury clothing options
- **Date Night**: Romantic, attractive ensembles

### Shopping Integration
- Direct links to external retailers
- Product ratings and reviews
- Price comparison
- Save favorite items
- Shopping tips and style advice

## 🔧 Customization

### Adding New Events
Edit the `events` array in `src/pages/Dashboard.js`:
```javascript
const events = [
  { id: 'new-event', name: 'New Event', icon: '🎯' },
  // ... existing events
];
```

### Modifying Color Analysis
Update the color detection logic in `src/pages/Dashboard.js`:
```javascript
const mockResults = {
  dominantColors: [
    { color: '#HEXCODE', name: 'Color Name', percentage: 25 },
    // ... more colors
  ],
  // ... other properties
};
```

### Styling Customization
Modify the Tailwind configuration in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Custom primary color palette
      }
    }
  }
}
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🔒 Security Features

- Client-side form validation
- Secure password handling
- Protected routes for authenticated users
- Data persistence with localStorage
- Input sanitization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push to main branch

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- Real AI integration for color analysis
- Machine learning for better recommendations
- Social sharing features
- Virtual try-on capabilities
- Integration with more retailers
- Advanced filtering and search
- Style quiz for better personalization
- Seasonal trend analysis

---

**Built with ❤️ using React and Tailwind CSS** # KRUSH_AI
