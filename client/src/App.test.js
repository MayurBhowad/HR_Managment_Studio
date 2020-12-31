import { cleanup, render, screen } from '@testing-library/react';
import App from './App';

afterEach(cleanup)
// afterAll(process.exit())

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
