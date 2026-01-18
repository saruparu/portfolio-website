import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    Bot,
    Cloud,
    Database,
    BarChart,
    Server,
    Cpu,
    Users
} from 'lucide-react';

const skills = [
    {
        category: "Cloud Platforms",
        icon: <Cloud size={32} />,
        items: ["Microsoft Azure", "AWS S3", "Snowflake", "SAP Datasphere", "Microsoft Fabric"]
    },
    {
        category: "BI & Analytics",
        icon: <BarChart size={32} />,
        items: ["Power BI", "Tableau", "MicroStrategy", "SAP Analytics Cloud", "Business Objects"]
    },
    {
        category: "Data Engineering",
        icon: <Server size={32} />,
        items: ["SQL Server", "SSIS", "Informatica", "Apache Airflow", "Python", "T-SQL"]
    },
    {
        category: "Data Governance",
        icon: <Database size={32} />,
        items: ["Collibra", "Data Cataloging", "Data Quality", "Master Data Management"]
    },
    {
        category: "Leadership",
        icon: <Users size={32} />,
        items: ["Team Leadership", "Stakeholder Management", "Change Management", "Agile Methodologies"]
    }
];

const Expertise = () => {
    return (
        <section id="skills" className="section bg-tertiary">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-header"
                >
                    <h2 className="section-title">Core <span className="text-gradient">Expertise</span></h2>
                    <p className="section-subtitle">
                        Comprehensive technical proficiency across AI, Data Engineering, and Strategic Leadership.
                    </p>
                </motion.div>

                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="skill-card glass"
                        >
                            <div className="skill-icon">
                                {skill.icon}
                            </div>
                            <h3 className="skill-category">
                                {skill.category}
                            </h3>
                            <div className="skill-tags">
                                {skill.items.map((item, i) => (
                                    <span key={i} className="skill-tag">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
