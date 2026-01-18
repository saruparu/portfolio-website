import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="about" className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        SENIOR DATA AND BI MANAGER
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="hero-title"
                    >
                        Saravanabalaji <span className="text-gradient">DG</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="hero-description"
                    >
                        Strategic data leader with over 17 years of experience driving business transformation through innovative data solutions.<br />
                        <span className="highlight">Architecting the Future of Data & Analytics.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="hero-buttons"
                    >
                        <a href="#projects" className="btn btn-primary">View Work</a>
                        <a href="#contact" className="btn btn-secondary">Contact Me</a>
                    </motion.div>
                </div>

                <div className="hero-visual">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -20, 0]
                        }}
                        transition={{
                            duration: 0.8,
                            y: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="hero-image-wrapper"
                    >
                        <img
                            src="/profile-new.png?v=1"
                            alt="Saravanabalaji DG"
                            className="hero-image"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML += '<div class="text-white text-center p-4">Please add profile-new.png to public/ folder</div>';
                            }}
                        />
                    </motion.div>
                </div>
            </div>

            <div className="hero-background-glow"></div>
        </section>
    );
};

export default Hero;
