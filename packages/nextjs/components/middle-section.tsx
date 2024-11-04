"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TutorialFrame from "./tutorial-frame";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Globe2, WalletIcon, Zap } from "lucide-react";
import { Button } from "~~/~/components/ui/button";
import { Card } from "~~/~/components/ui/card";

export default function MainContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-1.5 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-600">Idea to Frame within seconds</span>
            </div>

            <h1 className="text-6xl font-normal tracking-tight text-gray-700 mb-6 w-full">
              We
              <span className="font-bold text-black"> Power </span>
              your
              <span className="block font-bold mt-1 text-black">Farcaster Frames</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create engaging, interactive content for the decentralized social network. No coding required.
            </p>

            <div className="flex items-center gap-4 mb-16">
              <Button
                asChild
                size="lg"
                className="rounded-full text-base h-12 px-6 text-white bg-gray-900 hover:bg-gray-800"
              >
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Globe2 />,
                  title: "Global Reach",
                  description: "Advertise to a decentralized audience on Farcaster",
                },
                {
                  icon: <Zap />,
                  title: "Easy Creation",
                  description: "Build frames with our intuitive dashboard",
                },
                {
                  icon: <WalletIcon />,
                  title: "Onchain Payments",
                  description: "Seamless crypto transactions within frames",
                },
                {
                  icon: <BarChart2 />,
                  title: "Instant Analytics",
                  description: "Track frame performance in real-time",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 * i }}
                >
                  <Card className="border-none bg-gray-50 p-6 hover:bg-gray-100 transition-colors">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="font-medium text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 gap-6"
        >
          <TutorialFrame />
        </motion.div>
      </main>
    </div>
  );
}
