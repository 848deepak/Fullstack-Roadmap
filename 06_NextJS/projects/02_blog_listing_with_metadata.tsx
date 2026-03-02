import type { Metadata } from 'next';

// Mini project core: SEO-focused blog listing.
// Advanced: metadata API provides route-level title/description control.

export const metadata: Metadata = {
  title: 'Engineering Blog',
  description: 'Production-focused posts on full-stack engineering.'
};

const posts = [
  { id: 'p1', title: 'Scaling React Dashboards', excerpt: 'How to keep re-renders in control.' },
  { id: 'p2', title: 'API Resilience Basics', excerpt: 'Retries, timeouts, and circuit breakers.' }
];

export default function BlogListingWithMetadata() {
  return (
    <main>
      <h1>Engineering Blog</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  );
}
