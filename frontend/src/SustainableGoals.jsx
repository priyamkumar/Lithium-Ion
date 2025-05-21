import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function SDGGoals() {
  const shouldReduceMotion = useReducedMotion();

  const goals = [
    {
      id: 13,
      title: 'Climate Action',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Sustainable_Development_Goal_13.png'
    },
    {
      id: 15,
      title: 'Life on Land',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Sustainable_Development_Goal_15.png'
    },
    {
      id: 11,
      title: 'Sustainable Cities',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Sustainable_Development_Goal_11.png'
    },
    {
      id: 7,
      title: 'Affordable & Clean Energy',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Sustainable_Development_Goal_7.png'
    },
    {
      id: 12,
      title: 'Responsible Consumption',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Sustainable_Development_Goal_12.png'
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-4 pb-10 bg-white">
      <div className="max-w-xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-green-800">Our Environmental Goals</h2>
        <p className="mt-2 text-gray-600">
          We support key UN Sustainable Development Goals to protect our planet and communities.
          The goals below (like Climate Action and Sustainable Cities) guide our initiatives for a greener world.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            className="group flex flex-col items-center bg-white rounded-lg border border-gray-200 p-6 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            variants={shouldReduceMotion ? {} : fadeInUp}
          >
            <img
              src={goal.icon}
              alt={`Goal ${goal.id}: ${goal.title}`}
              className="w-24 h-24 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Goal {goal.id}</h3>
            <p className="text-green-700 font-medium text-center">{goal.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default SDGGoals;
