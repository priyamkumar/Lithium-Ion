import { motion, useReducedMotion } from 'framer-motion';


const RecyclingProcess = () => {
  const shouldReduceMotion = useReducedMotion();
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.12, // small, GC‑friendly stagger
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: 'easeOut',
      },
    }),
  };

  const steps = [
    {
      title: 'Black Mass',
      icon: '♻️',
      color: 'border-amber-300',
      items: [
        'Proprietary Net Zero Waste process',
        'Less than 1% impurities extracted',
        'Zero Emissions technology',
      ],
    },
    {
      title: 'Critical Minerals',
      icon: '⚛️',
      color: 'border-emerald-500',
      items: [
        'High purity Lithium',
        'Battery-grade Nickel',
        '99.9% pure Cobalt',
        'Electrolyte-ready Manganese',
      ],
    },
    {
      title: 'Secondary Products',
      icon: '♻️',
      color: 'border-amber-300',
      items: [
        'Recyclable Plastics',
        'Aluminum components',
        'Copper wiring',
        'Stainless Steel parts',
      ],
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header – simple fade in */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold tracking-wide text-emerald-800 mb-4">
            Global Lithium‑ion Battery Recycling
          </h1>
          <p className="text-lg text-emerald-700">
            Transforming used batteries into valuable resources
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-8 ${step.color}`}
            >
              <div className="text-center mb-6">
                <span className="text-5xl">{step.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 text-center">
                {step.title}
              </h2>
              <ul className="space-y-3">
                {step.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start bg-emerald-50 rounded-lg p-3"
                  >
                    <span className="text-amber-500 mr-2">•</span>
                    <span className="text-emerald-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Branding Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-emerald-800 font-semibold italic">
            Pioneering Sustainable Battery Recycling Technology
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RecyclingProcess;
