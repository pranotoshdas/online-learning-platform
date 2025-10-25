"use client"
import React, { useState } from 'react';
import { Menu, X, Zap, Lightbulb, Laptop, ShieldCheck, TrendingUp, Cpu, Users } from 'lucide-react'; // Added new icons
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';

// Utility components for consistency
const Button = ({ children, primary = true, className = '', ...props }) => (
  <button
    className={`
      px-6 py-3 font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg
      ${primary
        ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-700 transform hover:scale-[1.02] active:scale-[0.98]'
        : 'bg-white text-fuchsia-600 border border-fuchsia-600 hover:bg-fuchsia-50 transform hover:scale-[1.02] active:scale-[0.98]'
      }
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
    <Icon className="w-10 h-10 text-fuchsia-600 mb-4 bg-fuchsia-100 p-2 rounded-lg" />
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Main Application Component
const HomeDemo = () => {
    const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Courses', href: '#courses' },
    { name: 'Platform', href: '#platform' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Partners', href: '#partners' },
  ];

  const features = [
    { icon: TrendingUp, title: "Cutting-Edge Curriculum", description: "Learn the latest models and techniques in ML, Deep Learning, and Generative AI." },
    { icon: Cpu, title: "Hands-on Projects", description: "Apply knowledge directly with cloud-based labs and real-world datasets." },
    // ERROR FIXED: Removed the unexpected foreign characters from this description string.
    { icon: Users, title: "Expert-Led Workshops", description: "Live sessions and mentorship from leading researchers and industry professionals." },
    { icon: ShieldCheck, title: "Certified Mastery", description: "Earn recognized certifications to boost your career in artificial intelligence." },
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
            <Zap className="w-7 h-7 text-fuchsia-600" />
            <span>Next <span className="text-fuchsia-600">Learning</span></span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-fuchsia-600 transition duration-150 font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            {user ? (<div> <UserButton afterSignOutUrl="/" appearance={{ baseTheme: 'light' }}>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Dashboard"
            href="/workspace"
            labelIcon={<span>📊</span>}
          />
        </UserButton.MenuItems>
      </UserButton></div>):
            (<div>
              <Link href={'/workspace'}>
              <Button primary={true} className="px-5 py-2 text-base">
              Get Started Free
            </Button></Link>
            </div>)}
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-600 hover:text-fuchsia-600 p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl py-4 transition-all duration-300">
            <nav className="flex flex-col space-y-3 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:bg-fuchsia-50 p-3 rounded-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <Button primary={true} className="w-full text-base">
                  <Link href={'/workspace'}>Start Learning Now</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-28 bg-gray-50/70 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-1 text-sm font-medium text-fuchsia-700 bg-fuchsia-100 rounded-full mb-4 shadow-md">
              Begin your journey with Next Generation Learning
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              Master the Future of <span className="text-fuchsia-600">Artificial Intelligence</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-10">
              The world's leading platform for hands-on, accredited AI education. Build, deploy, and innovate with confidence.
            </p>

            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              <Button primary={true} className="min-w-[200px]">
                Start Free Trial
              </Button>
              <Button primary={false} className="min-w-[200px]">
                Explore Courses
              </Button>
            </div>

            {/* Mock Dashboard Image/Visualization */}
            <div className="mt-16">
              <div className="bg-white p-2 rounded-xl shadow-2xl shadow-fuchsia-200 border-2 border-fuchsia-50">
                <div className="w-full h-80 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-lg font-mono border border-dashed border-gray-300">
                  AI Learning Dashboard Mockup Visualization 
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Next Generation Learning Experience --- */}
        <section id="next-gen" className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-fuchsia-400">
              The Next-Generation Learning Experience
            </h2>
            <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
              Moving beyond static content, our proprietary platform uses AI to personalize your journey, ensuring faster, deeper, and more practical mastery.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {/* Point 1: Adaptive Paths */}
              <div className="p-6 rounded-xl border-2 border-fuchsia-700 bg-gray-800 shadow-xl shadow-fuchsia-900/50">
                <Lightbulb className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Adaptive Paths</h3>
                <p className="text-gray-400">Content and pace adjust in real-time based on your comprehension and specific career goals, maximizing learning efficiency.</p>
              </div>
              
              {/* Point 2: Interactive Labs */}
              <div className="p-6 rounded-xl border-2 border-fuchsia-700 bg-gray-800 shadow-xl shadow-fuchsia-900/50">
                <Laptop className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Live Coding Labs</h3>
                <p className="text-gray-400">Run, test, and deploy models in dedicated, GPU-accelerated environments directly from your browser—no setup required.</p>
              </div>

              {/* Point 3: AI Mentoring */}
              <div className="p-6 rounded-xl border-2 border-fuchsia-700 bg-gray-800 shadow-xl shadow-fuchsia-900/50">
                <Zap className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">24/7 AI Mentors</h3>
                <p className="text-gray-400">Get instant, contextual help, complex concept clarifications, and even code debugging from integrated Generative AI Tutors.</p>
              </div>
            </div>
          </div>
        </section>
        {/* --- END NEW SECTION --- */}


        {/* Features Section */}
        <section id="platform" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Why Choose Next Learning?</h2>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
              We provide the tools, curriculum, and community you need to truly excel in the AI revolution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section id="pricing" className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Build Your AI Career?
            </h2>
            <p className="text-xl text-fuchsia-200 max-w-3xl mx-auto mb-8">
              Join thousands of students and professionals advancing their skills with unlimited access to all courses and labs.
            </p>
            <Button primary={true} className="bg-cyan-400 text-gray-900 hover:bg-cyan-300">
              View Pricing Plans
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-white mb-4">
              <Zap className="w-7 h-7 text-fuchsia-400" />
              <span>Next <span className="text-fuchsia-400">Learning</span></span>
            </a>
            <p className="text-gray-400 text-sm">Innovating education for the age of artificial intelligence.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-fuchsia-400">Products</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Course Catalog</a></li>
              <li><a href="#" className="hover:text-white transition">Professional Certificates</a></li>
              <li><a href="#" className="hover:text-white transition">Enterprise Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-fuchsia-400">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-fuchsia-400">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Next Learning. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeDemo;
