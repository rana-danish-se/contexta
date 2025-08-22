'use client';
import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Brain,
  Search,
  Folder,
  Zap,
  Globe,
  Star,
  ArrowRight,
  Play,
  Check,
  Users,
  BarChart3,
  Shield,
  Sparkles,
  Download,
  Chrome,
  Smartphone,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContextaLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Auto-Summarization',
      description:
        'Every bookmark gets an intelligent summary and auto-generated tags',
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Semantic Search',
      description:
        "Find bookmarks by asking natural questions like 'React performance articles from June'",
    },
    {
      icon: <Folder className="w-6 h-6" />,
      title: 'Smart Workspaces',
      description:
        'Organize bookmarks into projects with drag-and-drop simplicity',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Collaboration',
      description:
        'Share workspaces with your team and collaborate on research',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Bookmarks Organized' },
    { number: '500+', label: 'Happy Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '5sec', label: 'Average Search Time' },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Up to 1,000 bookmarks',
        '3 workspaces',
        'Basic AI tagging',
        'Web dashboard',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'month',
      features: [
        'Unlimited bookmarks',
        'Unlimited workspaces',
        'Advanced AI features',
        'Team collaboration',
        'Priority support',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Custom deployment',
        'Advanced security',
        'API access',
        'Dedicated support',
        'Custom integrations',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Contexta
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <button
                onClick={() => router.push('/auth/signup')}
                className="bg-gradient-to-r from-blue-500 cursor-pointer to-purple-600 px-6 py-2 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">
                AI-Powered Bookmark Intelligence
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Never Lose a
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Bookmark Again
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your chaotic bookmark collection into an intelligent,
              searchable knowledge base. Contexta uses AI to understand,
              organize, and help you rediscover your saved content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => router.push('/auth/signup')}
                className="group cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2 text-lg"
              >
                <span>Start Organizing Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group flex items-center space-x-2 px-8 py-4 border border-white/30 rounded-full text-white hover:bg-white/10 transition-all">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Browser Extensions */}
            <div className="flex justify-center items-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Chrome className="w-5 h-5" />
                <span className="text-sm">Chrome Extension</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm">Firefox Add-on</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm">Mobile App</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Demo */}
          <div className="mt-20 relative">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-slate-700 rounded-lg px-4 py-2 text-sm text-gray-300">
                    contexta.app/dashboard
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-700/50 rounded-lg p-4 border border-white/5"
                    >
                      <div className="w-full h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded mb-3"></div>
                      <div className="h-3 bg-gray-600 rounded mb-2"></div>
                      <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Intelligent Features That Work For You
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by advanced AI, Contexta understands your content and
              makes it effortlessly discoverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-8 border border-white/10">
              <Zap className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-300">
                Find any bookmark in seconds with our advanced search algorithm.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-2xl p-8 border border-white/10">
              <Shield className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Privacy First
              </h3>
              <p className="text-gray-300">
                Your bookmarks are encrypted and stored securely. We never share
                your data.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-2xl p-8 border border-white/10">
              <BarChart3 className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Analytics
              </h3>
              <p className="text-gray-300">
                Understand your reading patterns with detailed insights and
                trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-300">
              Three simple steps to transform your bookmark chaos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Save with One Click',
                description:
                  'Use our browser extension to instantly save any webpage with automatic metadata extraction.',
                icon: <Download className="w-8 h-8" />,
              },
              {
                step: '02',
                title: 'AI Does the Work',
                description:
                  'Our AI analyzes content, generates summaries, and creates relevant tags automatically.',
                icon: <Brain className="w-8 h-8" />,
              },
              {
                step: '03',
                title: 'Find Instantly',
                description:
                  'Search using natural language or browse organized workspaces to rediscover content.',
                icon: <Search className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  {item.icon}
                </div>
                <div className="text-6xl font-bold text-white/10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300">
              Start free, upgrade when you need more power
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 border transition-all ${
                  plan.popular
                    ? 'border-purple-500 bg-gradient-to-b from-purple-500/10 to-transparent scale-105'
                    : 'border-white/10 bg-white/5 hover:border-purple-500/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-white text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                      : 'border border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Organize Your Digital Life?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of users who have transformed their bookmark chaos
            into organized knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all text-lg">
              Start Free Trial
            </button>
            <button className="border border-white/30 px-8 py-4 rounded-full text-white hover:bg-white/10 transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Contexta</span>
              </div>
              <p className="text-gray-400 mb-4">
                The intelligent bookmark manager that understands your content
                and helps you rediscover knowledge.
              </p>
            </div>

            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Extensions', 'Mobile App'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'API Docs', 'Status', 'Privacy'],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Contexta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
