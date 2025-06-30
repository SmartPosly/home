# SMARTPoS React Application

A modern React application for SMARTPoS (Smart Point of Sale) system with Arabic RTL support.

## Features

- 🚀 **Modern React 18** with Vite for fast development
- 🎨 **Tailwind CSS** for beautiful, responsive design
- 🌐 **Arabic RTL Support** with proper text direction
- 📱 **Responsive Design** that works on all devices
- 🧭 **React Router** for smooth navigation
- 📊 **Interactive Dashboard** with mock data
- 📝 **Contact Form** with validation
- 💰 **Pricing Plans** with interactive selection

## Pages

1. **Home** - Landing page with features showcase
2. **Pricing** - Interactive pricing plans
3. **Form** - Contact form with validation
4. **Dashboard** - Admin dashboard with user management

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd smartpos-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
smartpos-react/
├── public/
│   └── images/          # Static images
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Pricing.jsx
│   │   ├── Form.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Features in Detail

### 1. Home Page
- Hero section with call-to-action
- Features showcase with cards
- Responsive design for all screen sizes

### 2. Pricing Page
- Interactive pricing cards
- Plan selection with visual feedback
- Responsive grid layout

### 3. Contact Form
- Form validation
- Loading states
- Success/error messages
- Controlled inputs

### 4. Dashboard
- Mock data display
- Loading states
- Error handling
- Statistics cards
- User management table

## Customization

### Styling
The application uses Tailwind CSS. You can customize the design by:
- Modifying `tailwind.config.js` for theme changes
- Adding custom CSS in `src/index.css`
- Using Tailwind utility classes in components

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update navigation in `src/components/Header.jsx`

### Adding New Components
1. Create the component in `src/components/`
2. Import and use it in your pages

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
