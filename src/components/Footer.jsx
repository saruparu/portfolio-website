import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="footer section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-intro">
                        <h2 className="footer-title">Let's <span className="text-gradient">Connect</span></h2>
                        <p className="footer-text">
                            Interested in discussing AI architecture, data strategy, or potential collaborations? Reach out today.
                        </p>
                    </div>

                    <div className="footer-links">
                        <a href="mailto:saravanda@gmail.com" className="footer-link group">
                            <div className="footer-icon-wrapper">
                                <Mail size={20} />
                            </div>
                            <span className="footer-link-text">saravanda@gmail.com</span>
                        </a>
                        <a href="tel:4248326020" className="footer-link group">
                            <div className="footer-icon-wrapper">
                                <Phone size={20} />
                            </div>
                            <span className="footer-link-text">(424) 832-6020</span>
                        </a>
                        <a href="https://www.linkedin.com/in/saravanabalaji-dg-50703251/" target="_blank" rel="noopener noreferrer" className="footer-link group">
                            <div className="footer-icon-wrapper">
                                <Linkedin size={20} />
                            </div>
                            <span className="footer-link-text">LinkedIn Profile</span>
                        </a>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p>&copy; 2025 Saravanabalaji DG. All rights reserved.</p>
                    <p>Architecting the Future of Data & Analytics</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
