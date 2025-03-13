import * as React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export const Card = ({
  icon,
  title,
  description,
  delay,
}: {
  title: any;
  description: any;
  icon: any;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="group relative bg-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 w-96"
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-gradient-to-b from-purple-100 to-purple-200 shadow-md mb-6">
          <span className="text-4xl text-purple-600">{icon}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-purple-800 mb-4">
          {title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export function FeatureCard() {
  const cards = [
    {
      icon: <FiStar />,
      title: "Premium Features",
      description:
        "Enjoy premium access to exclusive features with seamless experience.",
    },
    // {
    //   icon: <FiStar />,
    //   title: "Modern Design",
    //   description: "Experience modern UI designs crafted with precision and care."
    // },
    // {
    //   icon: <FiStar />,
    //   title: "Smooth Performance",
    //   description: "Unparalleled performance with a focus on speed and responsiveness."
    // }
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
}
