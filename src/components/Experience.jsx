import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, Plus, Minus } from 'lucide-react';

const experiences = [
    {
        role: "Senior Data and BI Manager",
        company: "King's Hawaiian",
        period: "2016 - Present",
        tagline: "From Excel to BI to AI — Transforming Data Culture",
        bullets: [
            "Pioneered enterprise-wide BI and Data Warehousing practice from inception",
            "Transformed executive decision-making through strategic KPI frameworks and dashboards across MicroStrategy, Tableau, SAC, and Power BI",
            "Architected end-to-end Data Governance and Quality methodologies, establishing trusted, high-integrity data foundations",
            "Spearheaded AI initiatives including real-time Marketing Mix Modeling and Cash Flow Prediction",
            "Led multiple enterprise migrations: Sage 500 ERP to SAP HANA, Data Warehouse repointing to SAP, MicroStrategy to Tableau, Tableau to Power BI/SAC, and SQL Server to Azure",
            "Built and mentored a high-performing analytics team to sustain and scale these capabilities"
        ],
        type: "work"
    },
    {
        role: "Senior BI Developer",
        company: "Systech Solutions Inc",
        period: "2014 - 2016",
        tagline: "Enterprise BI Solutions at Scale",
        bullets: [
            "Designed and developed enterprise BI solutions using MicroStrategy and Tableau",
            "Created complex dashboards and reports for executive decision-making",
            "Implemented data warehouse solutions for large-scale enterprise clients"
        ],
        type: "work"
    },
    {
        role: "BI Developer / Team Lead",
        company: "Systech Solutions Pvt Ltd",
        period: "2008 - 2014",
        tagline: "Building Teams, Delivering Excellence",
        bullets: [
            "Led team of 6 developers delivering BI solutions across multiple industries",
            "Managed end-to-end project delivery from requirements to deployment",
            "Developed expertise in MicroStrategy platform and data warehousing"
        ],
        type: "work"
    },
    {
        role: "Bachelor of Engineering",
        company: "Anna University",
        period: "2008",
        tagline: "Where It All Began",
        bullets: [
            "Computer Science"
        ],
        type: "education"
    }
];

const Experience = () => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <section id="experience" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <h2 className="section-title">Professional <span className="text-gradient">Journey</span></h2>
                    <p className="section-subtitle">
                        A timeline of growth, leadership, and technical excellence.
                    </p>
                </motion.div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="timeline-item"
                        >
                            <div className="timeline-dot"></div>
                            <div className="timeline-content glass">
                                <div className="timeline-header">
                                    <h3 className="timeline-role">
                                        {exp.type === 'education' ? <GraduationCap size={20} className="icon-gold" /> : <Briefcase size={20} className="icon-gold" />}
                                        {exp.role}
                                    </h3>
                                    <span className="timeline-date">
                                        <Calendar size={16} />
                                        {exp.period}
                                    </span>
                                </div>

                                <div className="timeline-company-row">
                                    <div className="timeline-company-info">
                                        <h4 className="timeline-company">{exp.company}</h4>
                                        <p className="timeline-tagline">{exp.tagline}</p>
                                    </div>
                                    <button
                                        className="timeline-toggle-btn"
                                        onClick={() => toggleExpand(index)}
                                        aria-label={expandedItems[index] ? "Collapse details" : "Expand details"}
                                    >
                                        {expandedItems[index] ? (
                                            <Minus size={20} />
                                        ) : (
                                            <Plus size={20} />
                                        )}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {expandedItems[index] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="timeline-details"
                                        >
                                            <ul className="timeline-bullets">
                                                {exp.bullets.map((bullet, bulletIndex) => (
                                                    <motion.li
                                                        key={bulletIndex}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: bulletIndex * 0.05 }}
                                                        className="timeline-bullet-item"
                                                    >
                                                        {bullet}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
