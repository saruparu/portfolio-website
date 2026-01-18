# Saravanabalaji DG - Portfolio Website

A modern, responsive portfolio website with an integrated AI chatbot assistant. Built with React and Vite, featuring smooth animations and a sleek dark theme.

🌐 **Live Site:** [portfolio-c5c4d.web.app](https://portfolio-c5c4d.web.app)

---

## ✨ Features

- **Modern UI/UX** - Dark theme with glassmorphism effects and smooth animations
- **AI Chatbot** - Interactive assistant that answers questions about my experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Navigation** - Single-page app with smooth scroll between sections
- **Fast Performance** - Built with Vite for optimal loading speeds

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, Vite 7, Framer Motion |
| **Styling** | Vanilla CSS with CSS Variables |
| **Icons** | Lucide React, React Icons |
| **Backend** | Google Cloud Run (Chatbot API) |
| **Hosting** | Firebase Hosting |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/saruparu/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Navigation with smooth scroll
│   ├── Hero.jsx          # Profile section with photo
│   ├── Expertise.jsx     # Skills/expertise cards
│   ├── Experience.jsx    # Work experience timeline
│   ├── Projects.jsx      # Portfolio projects grid
│   ├── Footer.jsx        # Contact info & social links
│   ├── ChatWidget.jsx    # AI chatbot interface
│   └── ChatMessage.jsx   # Chat message component
├── lib/
│   └── chatService.js    # Chatbot API communication
├── index.css             # Global styles & theming
├── App.jsx               # Root component
└── main.jsx              # Entry point
```

---

## 📖 Documentation

For detailed technical documentation including architecture diagrams and process flows, see:

📄 **[DOCUMENTATION.md](./DOCUMENTATION.md)**

---

## 🔧 Configuration

### Environment Variables

Create a `.env.development` file for local development:

```env
VITE_CHATBOT_API_URL=/api
```

For production, the chatbot URL defaults to the Cloud Run backend.

---

## 📝 License

This project is for personal portfolio use.

---

## 📬 Contact

- **Email:** saravanda@gmail.com
- **LinkedIn:** [linkedin.com/in/saravanabalaji-dg-50703251](https://www.linkedin.com/in/saravanabalaji-dg-50703251/)
- **Website:** [portfolio-c5c4d.web.app](https://portfolio-c5c4d.web.app)
