import React from "react";
import { HeartHandshake, Target, Users, ShieldCheck, Mail } from "lucide-react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <header className="about-hero card">
        <h1 className="about-title">About ViaScholar</h1>
        <p className="about-subtitle">
          We help students discover scholarships, stay organized, and submit stronger applications — all in one place.
        </p>
      </header>

      <section className="about-grid">
        <div className="about-card card">
          <Target className="about-icon" />
          <h3>Our Mission</h3>
          <p>
            Make access to funding <strong>simple, transparent,</strong> and <strong>equitable</strong> for every student.
          </p>
        </div>

        <div className="about-card card">
          <Users className="about-icon" />
          <h3>Who We Serve</h3>
          <p>
            High school and college students who want a streamlined way to find, track, and apply to scholarships.
          </p>
        </div>

        <div className="about-card card">
          <ShieldCheck className="about-icon" />
          <h3>What We Value</h3>
          <p>
            Privacy-first design, accurate data, and helpful tooling — from deadlines to drafting support.
          </p>
        </div>

        <div className="about-card card">
          <HeartHandshake className="about-icon" />
          <h3>Our Story</h3>
          <p>
            ViaScholar started as a simple tracker for San Antonio students and grew into a platform for everyone.
          </p>
        </div>
      </section>

      <section className="about-stats card">
        <div className="stat">
          <div className="stat-value">5k+</div>
          <div className="stat-label">Scholarships indexed</div>
        </div>
        <div className="stat">
          <div className="stat-value">$10M+</div>
          <div className="stat-label">Funding opportunities</div>
        </div>
        <div className="stat">
          <div className="stat-value">97%</div>
          <div className="stat-label">Deadline accuracy</div>
        </div>
      </section>

      <section className="about-cta card">
        <div>
          <h3>Partner with us</h3>
          <p>Are you a foundation or school counselor? Let’s collaborate to get more students funded.</p>
        </div>
        <a className="btn btn-primary about-contact" href="mailto:support@viascholar.app">
          <Mail size={16} />
          Contact us
        </a>
      </section>
    </div>
  );
}
