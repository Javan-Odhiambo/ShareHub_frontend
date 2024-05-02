import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  test('renders the page with a test button', () => {
    // render the home page component
    const { getByText } = render(<Home />);

    // get the button element by its text
    const buttonElement = getByText('Test button');

    // check if the button element is in the document
    expect(buttonElement).toBeInTheDocument();
  });
});
