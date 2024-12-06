import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const leftContainer = {
  hidden: { opacity: 0, x: -50 }, 
  visible: { opacity: 1, x: 0, transition: { duration: 1 } }, 
};

const rightContainer = {
  hidden: { opacity: 0, x: 50 }, 
  visible: { opacity: 1, x: 0, transition: { duration: 1 } }, 
};

const textHover = {
  initial: { scale: 1 },
  hover: { scale: 1.5, transition: { duration: 0.3 } }, 
};


const Landing = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 h-screen">
      <Link to="/register">
      <motion.div
        className="h-full rounded-lg bg-green-50 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={leftContainer}
      >
        <motion.h2
          className="text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-cover bg-center"
          style={{ backgroundImage: 'url(/door.jpg)' }}
          variants={textHover}
        >
          REGISTER
        </motion.h2>
      </motion.div>
      </Link>

      <Link to="/login">
      <motion.div
        className="h-full rounded-lg bg-blue-50 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={rightContainer}
        transition={{ delay: 0.2 }} 
      >
        <motion.h2
          className="text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-cover bg-center"
          style={{ backgroundImage: 'url(/office.jpg)' }}
          variants={textHover}
        >
          LOGIN
        </motion.h2>
      </motion.div>
      </Link>
    </div>
  );
};

export default Landing;