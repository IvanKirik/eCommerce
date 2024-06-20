import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../../vitest-setup';
import  Login  from '../pages/login/Login';

describe('Login', () => {
  it('Should render the Login correctly', () => {
    shallow(<Login />);
  });
});

