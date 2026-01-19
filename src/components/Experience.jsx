import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experiences = [
    {
        role: "Senior Data and BI Manager",
        company: "King's Hawaiian",
        period: "2016 - Present",
        description: "Pioneered enterprise-wide BI and Data Warehousing practice from inception. Transformed executive decision-making through strategic KPI frameworks and dashboards across MicroStrategy, Tableau, SAC, and Power BI. Architected end-to-end Data Governance and Quality methodologies, establishing trusted, high-integrity data foundations. Spearheaded AI initiatives including real-time Marketing Mix Modeling and Cash Flow Prediction. Led multiple enterprise migrations: Sage 500 ERP to SAP HANA, Data Warehouse repointing to SAP, MicroStrategy to Tableau, Tableau to Power BI/SAC, and SQL Server to Azure. Built and mentored a high-performing analytics team to sustain and scale these capabilities.",
        type: "work"
    },
    {
        role: "Senior BI Developer",
        company: "Systech Solutions Inc",
        period: "2014 - 2016",
        description: "Designed and developed enterprise BI solutions using MicroStrategy and Tableau",
        type: "work"
    },
    {
        role: "BI Developer / Team Lead",
        company: "Systech Solutions Pvt Ltd",
        period: "2008 - 2014",
        description: "Led team of 6 developers delivering BI solutions across multiple industries",
        type: "work"
    },
    {
        role: "Bachelor of Engineering",
        company: "Anna University",
        period: "2008",
        description: "Computer Science",
        type: "education"
    }
];

const Experience = () => {
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
                                <h4 className="timeline-company">{exp.company}</h4>
                                <p className="timeline-description">{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
