import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, CloudLightning, DatabaseZap } from 'lucide-react';

const achievements = [
    {
        title: "5 Major Migrations",
        metric: "Platform Modernization",
        description: "Successfully led 5 enterprise migrations: Sage 500→SAP HANA, MicroStrategy→Tableau, Tableau→Power BI/SAC, and SQL Server→Azure.",
        icon: <TrendingUp size={40} className="icon-gold" />
    },
    {
        title: "40% Data Accuracy",
        metric: "Collibra Governance",
        description: "Established data governance framework using Collibra, achieving 40% improvement in data accuracy.",
        icon: <DatabaseZap size={40} className="icon-gold" />
    },
    {
        title: "25% Forecasting Lift",
        metric: "AI Modeling",
        description: "Implemented AI-driven Marketing Mix Modeling, improving forecasting accuracy by 25%.",
        icon: <CloudLightning size={40} className="icon-gold" />
    },
    {
        title: "50% Adoption Increase",
        metric: "Power BI Rollout",
        description: "Drove 50% increase in Power BI adoption across organization through training and enablement.",
        icon: <Trophy size={40} className="icon-gold" />
    }
];

const Projects = () => {
    return (
        <section id="projects" className="section bg-tertiary">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <h2 className="section-title">Key <span className="text-gradient">Achievements</span></h2>
                    <p className="section-subtitle">
                        Delivering measurable business impact through technological innovation.
                    </p>
                </motion.div>

                <div className="projects-grid">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="project-card glass"
                        >
                            <div className="project-header">
                                <div>
                                    <h3 className="project-title">{item.title}</h3>
                                    <span className="project-metric">{item.metric}</span>
                                </div>
                                <div className="project-icon-wrapper">
                                    {item.icon}
                                </div>
                            </div>
                            <p className="project-description">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
