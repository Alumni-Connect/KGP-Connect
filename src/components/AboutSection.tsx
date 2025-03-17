import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";

const AboutSection = () => {
  const features = [
    {
      icon: <FaBriefcase className="text-5xl text-blue-500" />,
      title: "Internships",
      description:
        "Gain real-world experience with exclusive internship opportunities at top companies.",
    },
    {
      icon: <FaGraduationCap className="text-5xl text-green-500" />,
      title: "Guidance & Mentorship",
      description:
        "Navigate your career with insights from industry experts and experienced mentors.",
    },
    {
      icon: <FaUsers className="text-5xl text-purple-500" />,
      title: "Connect with Alumni",
      description:
        "Stay in touch with our strong alumni network to unlock new career opportunities.",
    },
    {
      icon: <FaHandsHelping className="text-5xl text-red-500" />,
      title: "Give Back to Students",
      description:
        "Support the next generation by mentoring, offering insights, and sharing opportunities.",
    },
  ];

  return (
    <motion.section
      className="text-[#fd7e14] py-16 px-6 md:px-12 lg:px-20 bg-opacity-90"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Empowering the Next Generation
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Join a thriving community where students, alumni, and mentors
          collaborate to create opportunities and success stories.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition duration-300 bg-white bg-opacity-90 backdrop-blur-lg"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.2 * index,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <motion.div
                className="mb-4"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.2 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
