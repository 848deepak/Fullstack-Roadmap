import { render, screen } from '@testing-library/react';
import QuickLinks from './QuickLinks';

test('renders all quick links', () => {
  render(
    <QuickLinks
      links={[
        { label: 'Contact', href: '/contact' },
        { label: 'About', href: '/about' }
      ]}
    />
  );
  expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
  expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
});
