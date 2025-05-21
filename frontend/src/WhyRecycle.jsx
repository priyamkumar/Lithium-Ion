import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const WhyRecycle = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          variants={shouldReduceMotion ? {} : fadeInUp}
        >
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">
            Why Recycle?
          </h2>
          <div className="h-1 w-24 bg-amber-400 mx-auto mb-6"></div>
        </motion.div>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {[ 
            { value: '1.2M+', text: 'Metric tonnes of materials needed (2022)', bg: 'bg-emerald-50', bar: 'bg-emerald-300', color: 'text-amber-500' },
            { value: '7.5M+', text: 'Projected demand by 2030', bg: 'bg-amber-50', bar: 'bg-amber-300', color: 'text-emerald-700' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`${stat.bg} p-8 rounded-xl flex-1`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              variants={shouldReduceMotion ? {} : fadeInUp}
            >
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <p className="text-emerald-800 font-medium">{stat.text}</p>
              <div className={`h-1 w-16 ${stat.bar} mt-4`}></div>
            </motion.div>
          ))}
        </div>

        {/* Content Section */}
        <motion.div
          className="space-y-6 text-emerald-800 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={shouldReduceMotion ? {} : fadeInUp}
        >
          <p className="text-lg leading-relaxed">
            Given the shortages of <span className="font-bold text-amber-500">Rare Earth metals</span>, 
            we must recycle Lithium-ion cells to recover valuable materials. 
            This reduces mining dependence and creates a sustainable 
            <span className="font-bold text-emerald-600"> Circular Economy</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRecycle;
