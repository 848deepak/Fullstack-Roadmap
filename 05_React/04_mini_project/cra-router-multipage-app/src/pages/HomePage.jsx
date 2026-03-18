import { useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeatureCard from '../components/home/FeatureCard';
import StatsPanel from '../components/home/StatsPanel';
import NewsletterSignup from '../components/home/NewsletterSignup';
import QuickLinks from '../components/home/QuickLinks';

const features = [
  { heading: 'Routing', description: 'Navigate pages with React Router.' },
  { heading: 'Reusable UI', description: 'Use modular and composable components.' },
  { heading: 'Testing', description: 'Validate behavior using React Testing Library.' }
];

const quickLinks = [
  { label: 'Go to Contact', href: '/contact' },
  { label: 'Go to About', href: '/about' }
];

function HomePage() {
  const [welcome, setWelcome] = useState('Loading...');

  useEffect(() => {
    let isActive = true;

    fetch('/mock-data/home.json')
      .then((response) => response.json())
      .then((data) => {
        if (isActive) {
          setWelcome(data.welcome);
        }
      })
      .catch(() => {
        if (isActive) {
          setWelcome('Welcome to the home page.');
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section aria-label="Home Page">
      <h1>Home</h1>
      <HeroBanner title="Home Dashboard" subtitle={welcome} />

      <section className="panel">
        <h3>Feature Highlights</h3>
        <div className="card-list">
          {features.map((feature) => (
            <FeatureCard key={feature.heading} heading={feature.heading} description={feature.description} />
          ))}
        </div>
      </section>

      <StatsPanel totalUsers={120} totalProjects={18} testCoverage={95} />
      <NewsletterSignup />
      <QuickLinks links={quickLinks} />
    </section>
  );
}

export default HomePage;
