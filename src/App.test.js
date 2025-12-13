import { render, screen } from '@testing-library/react';
import App from './App';

test('renders live dashboard', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/Live Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});
