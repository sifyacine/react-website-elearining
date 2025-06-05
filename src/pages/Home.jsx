import React from "react";
import Navbar from "../components/Navbar";
import { FiArrowRight, FiUsers, FiAward, FiBookOpen } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text-section">
            <div>
              <h1 className="hero-heading">
                Empowering Students for a 
                <span className="highlight"> Brighter Future</span>
              </h1>
              <p className="hero-text">
                At PedaConnect, we provide innovative education solutions that connect 
                students, teachers, and communities. Discover excellence in learning 
                through our comprehensive academic programs and supportive environment.
              </p>
              <div className="hero-buttons">
                <button className="primary-button">
                  Apply Now <FiArrowRight />
                </button>
                <button className="secondary-button">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          <div className="hero-image-section">
            <div className="hero-image-container">
              <div className="floating-card card-1">
                <FiUsers className="card-icon" />
                <span>1000+ Students</span>
              </div>
              <div className="floating-card card-2">
                <FiAward className="card-icon" />
                <span>Award Winning</span>
              </div>
              <div className="floating-card card-3">
                <FiBookOpen className="card-icon" />
                <span>Modern Curriculum</span>
              </div>
              
              {/* Abstract geometric shapes for visual appeal */}
              <div className="hero-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Expert Teachers</p>
          </div>
          <div className="stat-item">
            <h3>15+</h3>
            <p>Programs Offered</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </section>

      {/* Featured Programs Preview */}
      <section className="programs-preview">
        <div className="section-header">
          <h2>Our Featured Programs</h2>
          <p>Discover our comprehensive range of educational programs</p>
        </div>
        <div className="programs-grid">
          <div className="program-card">
            <div className="program-icon">
              <FiBookOpen />
            </div>
            <h3>Academic Excellence</h3>
            <p>Comprehensive curriculum designed to challenge and inspire students</p>
          </div>
          <div className="program-card">
            <div className="program-icon">
              <FiUsers />
            </div>
            <h3>Collaborative Learning</h3>
            <p>Interactive learning environments that foster teamwork and communication</p>
          </div>
          <div className="program-card">
            <div className="program-icon">
              <FiAward />
            </div>
            <h3>Achievement Recognition</h3>
            <p>Celebrating student success and encouraging continuous improvement</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;