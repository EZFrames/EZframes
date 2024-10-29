"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DefaultFrameRender from "./DefaultFrameRender";
import TutorialFrame from "./tutorial-frame";
import { motion } from "framer-motion";
import { ArrowRight, BarChart, CreditCard, Globe, Zap } from "lucide-react";

export default function MainContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <h1 className="text-5xl font-bold mb-6">
              We power your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Farcaster frames
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Create engaging, interactive content for the decentralized social network. No coding required.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800 bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all duration-300"
              >
                <Globe className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Global Reach</h3>
                <p className="text-sm text-gray-400">Advertise to a decentralized audience on Farcaster</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-800 bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all duration-300"
              >
                <Zap className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Easy Creation</h3>
                <p className="text-sm text-gray-400">Build frames with our intuitive dashboard</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-800 bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all duration-300"
              >
                <CreditCard className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Onchain Payments</h3>
                <p className="text-sm text-gray-400">Seamless crypto transactions within frames</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gray-800 bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all duration-300"
              >
                <BarChart className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Instant Analytics</h3>
                <p className="text-sm text-gray-400">Track frame performance in real-time</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:w-1/2 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 shadow-2xl"
          >
            <div className="h-full w-full flex flex-col items-center justify-center text-2xl font-bold text-purple-300">
              <DefaultFrameRender />
            </div>
          </motion.div>
        </div>
        <TutorialFrame />
      </main>
    </div>
  );
}
