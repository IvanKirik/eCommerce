import { render, screen } from '@testing-library/react';

import App from '../src/App';
import { describe, it } from 'vitest';
import { shallow } from 'enzyme';

describe('App', () => {
  it('renders App screen', () => {
    render(<App />);
    screen.debug();    
  });
  it('Should render the App correctly', () => {
    shallow(<App />);
  });
});


