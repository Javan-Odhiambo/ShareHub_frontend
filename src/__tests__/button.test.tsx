import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Button from '@/components/ui/Button'
import { describe } from 'node:test'

describe('Button', () => {
    test('renders button with correct text', () => {
      const buttonText = 'Click me';
      // render the button component
      const onClickMock = jest.fn();
      const { getByText } = render(<Button onClick={onClickMock}>{buttonText}</Button>);

      // get the button element by its text
      const buttonElement = getByText(buttonText);

      // check if the button element is in the document
      expect(buttonElement).toBeInTheDocument();
    });

    test('calls onClick handler when button is clicked', () => {
      const onClickMock = jest.fn();

      // render the button component
      const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);

        // get the button element by its text
      const buttonElement = getByText('Click me');

        // click the button
      fireEvent.click(buttonElement);

        // check if the onClick handler was called
      expect(onClickMock).toHaveBeenCalled();
    });
  });
