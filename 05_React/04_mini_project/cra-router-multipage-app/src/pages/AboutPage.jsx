import MissionSection from '../components/about/MissionSection';
import TeamList from '../components/about/TeamList';
import Timeline from '../components/about/Timeline';
import ValuesGrid from '../components/about/ValuesGrid';

function AboutPage() {
  return (
    <section aria-label="About Page">
      <h1>About</h1>
      <MissionSection />
      <div className="grid-2">
        <TeamList />
        <Timeline />
      </div>
      <ValuesGrid />
    </section>
  );
}

export default AboutPage;