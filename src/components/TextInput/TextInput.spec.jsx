import { TextInput } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<TextInput /', () => {
  it('should have a value of a searchvalue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'testando'} />);
    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="" />);
    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'o valor';

    userEvent.type(input, value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });
});
