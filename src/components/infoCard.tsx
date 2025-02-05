import * as React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import Image from "next/image";

const Card = ({ icon, title, description, image, delay  }:{icon:any,title:string,description:string,image:string,delay:number}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="group relative bg-white p-6 md:p-8 rounded-[40px] shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 flex items-center space-x-6"
    >
      <div className="relative w-24 h-24 flex-shrink-0 rounded-[30px] overflow-hidden shadow-md">
        <img src={image} alt={title}   className="rounded-[30px]" />
      </div>
      <div className="flex flex-col">
        <div className="p-4 rounded-full bg-gradient-to-b from-purple-100 to-purple-200 shadow-md mb-4 w-fit">
          <span className="text-4xl text-purple-600">{icon}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default function ElegantCards() {
  const cards = [
    {
      icon: <FiStar />, 
      title: "Premium Features", 
      description: "Enjoy premium access to exclusive features with seamless experience.",
      image: 'https://as1.ftcdn.net/v2/jpg/05/95/47/40/1000_F_595474066_eG9a6YY2uXaZSmFjBMC2HyZY2Wfg7BFi.jpg'

    },
    {
      icon: <FiStar />, 
      title: "Modern Design", 
      description: "Experience modern UI designs crafted with precision and care.",
      image: 'https://as1.ftcdn.net/v2/jpg/05/95/47/40/1000_F_595474066_eG9a6YY2uXaZSmFjBMC2HyZY2Wfg7BFi.jpg'

    },
    {
      icon: <FiStar />, 
      title: "Smooth Performance", 
      description: "Unparalleled performance with a focus on speed and responsiveness.",
      image: 'https://as1.ftcdn.net/v2/jpg/05/95/47/40/1000_F_595474066_eG9a6YY2uXaZSmFjBMC2HyZY2Wfg7BFi.jpg'

    }
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h2 className="text-4xl font-bold text-purple-800 mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg">Discover our premium features designed to enhance your experience.</p>
        </div>
        <div className="space-y-8">
          {cards.map((card, index) => (
            <Card key={index} icon={card.icon} title={card.title} description={card.description} image={card.image} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </div>
  );
}
