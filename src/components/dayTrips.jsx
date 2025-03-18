import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import "../i18n";
import { useLocation } from "react-router-dom"; // Importez useLocation
import '../styles/activities.css';
import '../styles/about.css';
import data from "../data.json";
import CardList from "./Card/cardList";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const DayTrips = () => {
  const { t } = useTranslation(["dayTrips"]);
  const location = useLocation(); // Utilisez useLocation pour surveiller les changements d'URL

  // Remonter en haut de la page à chaque changement d'URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Composant animé
  const AnimatedSection = ({ children, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
      <motion.div
        id={id}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="activities">
      {/* Section Slider */}
      <AnimatedSection id="slider">
        <div className="slider_about">
          <h2>{t("titre")}</h2>
          <h1>{t("titre2")}</h1>
          <h3>{t("titre3")}</h3>
        </div>
      </AnimatedSection>

      {/* Section Texte */}
      <AnimatedSection id="text">
        <p className="textActivities">{t("text")}</p>
      </AnimatedSection>

      {/* Section CardList */}
      <AnimatedSection id="cardList">
        <CardList items={data.dayTrips} />
      </AnimatedSection>
    </div>
  );
};

export default DayTrips;