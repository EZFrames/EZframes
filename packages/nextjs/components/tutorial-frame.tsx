"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

const tutorialSteps = [
  {
    title: "Create Your Account",
    description: "Sign up for EZframes to start creating interactive Farcaster frames.",
    imagePlaceholder: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Choose a Template",
    description: "Select from our wide range of pre-designed templates or start from scratch.",
    imagePlaceholder: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Customize Your Frame",
    description: "Add your content, adjust html or use image links",
    imagePlaceholder: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Set Up Interactions",
    description: "Configure Transactions, Redirects, or other interactive button actions for your frame.",
    imagePlaceholder: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Publish and Share",
    description: "Deploy your frame to the Warpcast client and share it with your audience.",
    imagePlaceholder: "/placeholder.svg?height=300&width=400",
  },
];

export default function TutorialFrame() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => (prev + 1) % tutorialSteps.length);
  const prevStep = () => setCurrentStep(prev => (prev - 1 + tutorialSteps.length) % tutorialSteps.length);

  return (
    <div className="mt-[20px]">
      <h2 className="text-3xl font-bold mb-6 text-center">How to Build & Ship</h2>
      <div className="relative">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-full h-64 relative mb-6 rounded-xl overflow-hidden bg-gray-800">
            <Image
              src={tutorialSteps[currentStep].imagePlaceholder}
              alt={`Step ${currentStep + 1}`}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-500" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2">{tutorialSteps[currentStep].title}</h3>
          <p className="text-gray-300 text-center mb-4">{tutorialSteps[currentStep].description}</p>
        </motion.div>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentStep ? "bg-purple-500" : "bg-gray-600"}`}
              />
            ))}
          </div>
          <button
            onClick={nextStep}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
