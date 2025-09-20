'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, Globe, Users, Code, TrendingUp, MessageCircle, Calendar, ExternalLink } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  // Handle hydration
  useEffect(() => {
    // Component is now mounted and hydrated
  }, []);

  // Wallet connection functionality
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature!');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      }) as string[];
      
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        
        // Get balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        }) as string;
        
        // Convert from wei to ETH
        const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
        setWalletBalance(balanceInEth.toFixed(4));
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setWalletBalance('');
  };

  // Sample blog posts with pre-formatted dates
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Decentralized Finance: Our Vision",
      excerpt: "Exploring how Zeb3Labs is revolutionizing the DeFi landscape with innovative solutions and user-centric design.",
      date: "September 10, 2025",
      author: "John Doe, CEO"
    },
    {
      id: 2,
      title: "Building Trust in DeFi: Security First Approach",
      excerpt: "Our comprehensive security framework ensures user funds and data remain protected in our DeFi ecosystem.",
      date: "September 5, 2025",
      author: "Jane Smith, CTO"
    },
    {
      id: 3,
      title: "Community-Driven Development: The Zeb3Labs Way",
      excerpt: "How we're building our platform with community feedback and transparent development processes.",
      date: "August 28, 2025",
      author: "Mike Johnson, Head of Product"
    }
  ];

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 border-b border-purple-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Zeb3Labs
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['home', 'blog', 'dapp'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`capitalize px-4 py-2 rounded-lg transition-all ${
                  activeSection === section
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                }`}
              >
                {section === 'dapp' ? 'DApp' : section}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-purple-500/30"
            >
              <option value="home">Home</option>
              <option value="blog">Blog</option>
              <option value="dapp">DApp</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomeSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Zeb3Labs
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Pioneering the future of decentralized finance with innovative solutions, 
            security-first approach, and community-driven development.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setActiveSection('dapp')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Launch DApp
            </button>
            <button 
              onClick={() => setActiveSection('blog')}
              className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all"
            >
              Read Our Blog
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose Zeb3Labs?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Wallet className="w-12 h-12 text-purple-400" />,
              title: "Secure Wallet Integration",
              description: "Seamlessly connect your crypto wallets with industry-leading security protocols."
            },
            {
              icon: <TrendingUp className="w-12 h-12 text-cyan-400" />,
              title: "Advanced DeFi Tools",
              description: "Access cutting-edge financial instruments designed for the decentralized economy."
            },
            {
              icon: <Users className="w-12 h-12 text-pink-400" />,
              title: "Community Driven",
              description: "Built by the community, for the community. Your voice shapes our platform."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "$50M+", label: "Total Value Locked" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-6 rounded-xl border border-purple-500/20">
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BlogSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/10 to-black pt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Founders Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, updates, and thoughts from our founding team on the future of decentralized finance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all hover:transform hover:scale-105 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <span>Read More</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-xl border border-purple-500/20">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest insights and updates from our founders.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DAppSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-cyan-900/10 to-black pt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Zeb3Labs DApp
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect your wallet and explore the power of decentralized finance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Wallet Connection Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8 mb-8">
            <div className="text-center">
              <Wallet className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              
              {!walletAddress ? (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h2>
                  <p className="text-gray-300 mb-8">
                    Connect your crypto wallet to view your balance and interact with our DApp.
                  </p>
                  <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-green-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Wallet Connected!</h2>
                  
                  {/* Wallet Info */}
                  <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-left">
                        <label className="text-gray-400 text-sm font-medium">Wallet Address</label>
                        <p className="text-white font-mono text-lg break-all">
                          {walletAddress}
                        </p>
                      </div>
                      <div className="text-left">
                        <label className="text-gray-400 text-sm font-medium">ETH Balance</label>
                        <p className="text-green-400 font-bold text-2xl">
                          {walletBalance} ETH
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                      View Transactions
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all">
                      DeFi Tools
                    </button>
                    <button
                      onClick={disconnectWallet}
                      className="px-6 py-3 border-2 border-red-500 text-red-400 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DApp Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-8 h-8 text-green-400" />,
                title: "Portfolio Tracking",
                description: "Monitor your DeFi investments in real-time",
                status: "Coming Soon"
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-400" />,
                title: "Cross-Chain Bridge",
                description: "Seamlessly transfer assets across blockchains",
                status: "Beta"
              },
              {
                icon: <Users className="w-8 h-8 text-purple-400" />,
                title: "Governance",
                description: "Participate in protocol governance decisions",
                status: "Active"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-600/20 hover:border-cyan-500/40 transition-all">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  feature.status === 'Active' ? 'bg-green-900/50 text-green-400 border border-green-500/30' :
                  feature.status === 'Beta' ? 'bg-blue-900/50 text-blue-400 border border-blue-500/30' :
                  'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {feature.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {activeSection === 'home' && <HomeSection />}
      {activeSection === 'blog' && <BlogSection />}
      {activeSection === 'dapp' && <DAppSection />}
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Zeb3Labs
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">
                Building the future of decentralized finance
              </p>
              <p className="text-gray-500 text-sm">
                © 2025 Zeb3Labs. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Type declarations for window.ethereum
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  isMetaMask?: boolean;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}