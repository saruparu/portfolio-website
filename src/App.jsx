import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <Experience />
        <Projects />
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
}

export default App;
