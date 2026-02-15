import React from 'react';
import Card from '../components/common/Card';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

/**
 * About Page
 */

const AboutPage = () => {
  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO & Co-Founder',
      image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0ea5e9&color=fff&size=200',
      bio: '15+ years in fintech and trading platforms',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Priya Sharma',
      role: 'CTO & Co-Founder',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=22c55e&color=fff&size=200',
      bio: 'Expert in scalable systems and market data',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Amit Patel',
      role: 'Head of Product',
      image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=ef4444&color=fff&size=200',
      bio: 'Passionate about user experience and design',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];
  
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            About StockTradePro
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We're on a mission to democratize stock trading education and make 
            financial markets accessible to everyone.
          </p>
        </div>
        
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h2>
            <p className="text-neutral-600 leading-relaxed">
              StockTradePro was founded with a simple belief: everyone should have 
              access to quality trading education without risking real money. Our 
              platform provides a safe environment to learn, practice, and master 
              stock trading using real-time market data.
            </p>
          </Card>
          
          <Card>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Vision</h2>
            <p className="text-neutral-600 leading-relaxed">
              We envision a world where financial literacy is universal, where 
              anyone can confidently navigate the stock markets. Through innovative 
              technology and comprehensive education, we're building the future of 
              trading platforms.
            </p>
          </Card>
        </div>
        
        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-8">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Real-time Data', value: 'Live market feeds' },
              { title: 'Virtual Balance', value: '₹1,00,000 to start' },
              { title: 'Portfolio Tracking', value: 'Detailed analytics' },
              { title: 'Transaction History', value: 'Complete audit trail' }
            ].map((item, i) => (
              <Card key={i} className="text-center">
                <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-primary-600 text-sm">{item.value}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-neutral-600 mb-12">
            Experienced professionals passionate about fintech and education
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <Card key={i} hoverable>
                <div className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-neutral-900">{member.name}</h3>
                  <p className="text-primary-600 mb-2">{member.role}</p>
                  <p className="text-sm text-neutral-600 mb-4">{member.bio}</p>
                  
                  <div className="flex justify-center gap-3">
                    <a href={member.social.linkedin} className="text-neutral-600 hover:text-primary-600">
                      <FaLinkedin className="text-xl" />
                    </a>
                    <a href={member.social.twitter} className="text-neutral-600 hover:text-primary-600">
                      <FaTwitter className="text-xl" />
                    </a>
                    <a href={member.social.github} className="text-neutral-600 hover:text-primary-600">
                      <FaGithub className="text-xl" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-primary-100">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-primary-100">Stocks Available</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">1M+</p>
              <p className="text-primary-100">Transactions</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">99.9%</p>
              <p className="text-primary-100">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;