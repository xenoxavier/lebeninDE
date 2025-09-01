'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize particle system
    const initParticles = () => {
      const container = document.getElementById('particle-system');
      if (!container) return;

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        container.appendChild(particle);
      }
    };

    const timer = setTimeout(initParticles, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="cube-container">
            <div className="cube">
              <div className="face front"></div>
              <div className="face back"></div>
              <div className="face right"></div>
              <div className="face left"></div>
              <div className="face top"></div>
              <div className="face bottom"></div>
            </div>
          </div>
          <p>Leben in Deutschland wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon" role="img" aria-label="German flag">🇩🇪</div>
            <div className="brand-text">
              <h1>LebenDE</h1>
              <span>Citizenship Test</span>
            </div>
          </div>
          <ul className="nav-menu" role="menubar">
            <li className="nav-item" role="none">
              <a href="#home" className="nav-link" role="menuitem">Home</a>
            </li>
            <li className="nav-item" role="none">
              <a href="#features" className="nav-link" role="menuitem">Features</a>
            </li>
            <li className="nav-item" role="none">
              <a href="#dashboard-preview" className="nav-link" role="menuitem">Dashboard</a>
            </li>
            <li className="nav-item" role="none">
              <a href="#about" className="nav-link" role="menuitem">About</a>
            </li>
          </ul>
          <div className="nav-actions">
            <Link href="/dashboard" className="cta-nav-btn" aria-label="Start learning German citizenship test">
              Start Learning
            </Link>
          </div>
          <button className="hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-background">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
              <div className="shape shape-6"></div>
            </div>
            <div className="particle-system" id="particle-system"></div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span>🎯</span>
                <span>96.4% Success Rate</span>
              </div>
              <h1 className="hero-title">
                Master the <span className="highlight">German Citizenship Test</span> with Confidence
              </h1>
              <p className="hero-subtitle">
                Interactive practice tests, personalized learning paths, and comprehensive preparation for your Leben in Deutschland exam
              </p>
              <div className="hero-actions">
                <Link href="/dashboard" className="cta-primary" aria-label="Start free practice test for German citizenship">
                  <span>Start Free Practice</span>
                </Link>
                <Link href="/dashboard" className="cta-secondary" aria-label="Take full German citizenship test">
                  <span>Take Full Test</span>
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Students</div>
                </div>
                <div className="stat">
                  <div className="stat-number">310</div>
                  <div className="stat-label">Questions</div>
                </div>
                <div className="stat">
                  <div className="stat-number">96.4%</div>
                  <div className="stat-label">Pass Rate</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <div className="card-header">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '73%'}}></div>
                  </div>
                </div>
                <div className="card-content">
                  <h3>Was ist ein Rechtsstaat?</h3>
                  <div className="options-preview">
                    <div className="option-preview">Ein Staat, in dem es nur rechte politische Parteien gibt</div>
                    <div className="option-preview active">Ein Staat, in dem alle Bürger und Institutionen vor dem Gesetz gleich sind</div>
                    <div className="option-preview">Ein Staat, in dem nur das Parlament Gesetze beschließen darf</div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="score">Score: 23/24 ✓</div>
                  <button className="next-btn">Weiter →</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Why Choose LebenDE?</h2>
              <p className="section-subtitle">Everything you need to pass your German citizenship test</p>
            </div>
            <div className="features-grid">
              <article className="feature-card">
                <div className="feature-icon" role="img" aria-label="Books icon">📚</div>
                <h3>Complete Question Bank</h3>
                <p>All 310 official questions with detailed explanations and topic categorization</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" role="img" aria-label="Target icon">🎯</div>
                <h3>Smart Practice Mode</h3>
                <p>AI-powered recommendations focus on your weak areas for efficient learning</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" role="img" aria-label="Chart icon">📊</div>
                <h3>Progress Tracking</h3>
                <p>Detailed analytics show your improvement and readiness for the real test</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" role="img" aria-label="Trophy icon">🏆</div>
                <h3>Mock Exams</h3>
                <p>Take realistic practice tests under real exam conditions</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" role="img" aria-label="Mobile phone icon">📱</div>
                <h3>Study Anywhere</h3>
                <p>Mobile-optimized platform works perfectly on all devices</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" role="img" aria-label="Globe icon">🌐</div>
                <h3>Multi-Language Support</h3>
                <p>Interface available in multiple languages for better understanding</p>
              </article>
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview Section */}
        <section id="dashboard-preview" className="dashboard-preview-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Your Personal Dashboard</h2>
              <p className="section-subtitle">Track your progress, manage your learning, and achieve your goals</p>
            </div>
            
            <div className="dashboard-preview">
              <div className="preview-dashboard-layout">
                {/* Left Sidebar - Profile Preview */}
                <div className="preview-dashboard-sidebar">
                  <div className="preview-profile-card">
                    <div className="preview-avatar">
                      <div className="avatar-image">🇩🇪</div>
                    </div>
                    <div className="preview-profile-info">
                      <h3 className="preview-name">John Doe</h3>
                      <p className="preview-subtitle">German Citizenship Candidate</p>
                      <div className="preview-stats">
                        <div className="preview-stat">
                          <span className="stat-number">12</span>
                          <span className="stat-label">Sessions</span>
                        </div>
                        <div className="preview-stat">
                          <span className="stat-number">8h</span>
                          <span className="stat-label">Study Time</span>
                        </div>
                        <div className="preview-stat">
                          <span className="stat-number">87%</span>
                          <span className="stat-label">Success Rate</span>
                        </div>
                      </div>
                      <button className="preview-edit-profile-btn">Edit Profile</button>
                    </div>
                  </div>
                </div>

                {/* Right Content - Dashboard Cards Preview */}
                <div className="preview-dashboard-content">
                  <div className="preview-dashboard-grid">
                    {/* Progress Card */}
                    <div className="preview-card">
                      <div className="preview-card-header">
                        <div className="card-icon">📊</div>
                        <h3>Learning Progress</h3>
                      </div>
                      <div className="preview-progress">
                        <div className="preview-circular-progress">
                          <svg className="preview-progress-circle" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="50" stroke="#e0e0e0" strokeWidth="8" fill="none"/>
                            <circle cx="60" cy="60" r="50" stroke="#4CAF50" strokeWidth="8" fill="none" 
                                    strokeDasharray="314.16" strokeDashoffset="78.54" className="preview-progress-stroke"/>
                          </svg>
                          <div className="preview-progress-center">
                            <span className="preview-progress-percentage">75%</span>
                            <span className="preview-progress-label">Complete</span>
                          </div>
                        </div>
                        <div className="preview-progress-details">
                          <div className="preview-progress-item">
                            <span className="progress-dot correct"></span>
                            <span>Correct: <strong>7</strong></span>
                          </div>
                          <div className="preview-progress-item">
                            <span className="progress-dot incorrect"></span>
                            <span>Incorrect: <strong>2</strong></span>
                          </div>
                          <div className="preview-progress-item">
                            <span className="progress-dot remaining"></span>
                            <span>Remaining: <strong>1</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activity Card */}
                    <div className="preview-card">
                      <div className="preview-card-header">
                        <div className="card-icon">📈</div>
                        <h3>Recent Activity</h3>
                      </div>
                      <div className="preview-activity-list">
                        <div className="preview-activity-item">
                          <div className="activity-icon">✅</div>
                          <div className="activity-content">
                            <p>Quiz completed: 90% (9/10)</p>
                            <span className="activity-time">2h ago</span>
                          </div>
                        </div>
                        <div className="preview-activity-item">
                          <div className="activity-icon">⚠️</div>
                          <div className="activity-content">
                            <p>Quiz completed: 60% (6/10)</p>
                            <span className="activity-time">1d ago</span>
                          </div>
                        </div>
                        <div className="preview-activity-item">
                          <div className="activity-icon">✅</div>
                          <div className="activity-content">
                            <p>Quiz completed: 80% (8/10)</p>
                            <span className="activity-time">2d ago</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Streak Card */}
                    <div className="preview-card">
                      <div className="preview-card-header">
                        <div className="card-icon">🔥</div>
                        <h3>Study Streak</h3>
                      </div>
                      <div className="preview-streak-content">
                        <div className="preview-streak-number">7</div>
                        <div className="preview-streak-label">Days in a row</div>
                        <div className="preview-streak-calendar">
                          <div className="preview-calendar-week">
                            <div className="calendar-day active"></div>
                            <div className="calendar-day active"></div>
                            <div className="calendar-day active"></div>
                            <div className="calendar-day active"></div>
                            <div className="calendar-day active"></div>
                            <div className="calendar-day active"></div>
                            <div className="calendar-day active"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
