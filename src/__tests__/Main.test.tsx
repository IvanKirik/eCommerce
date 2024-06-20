import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../../vitest-setup';
import  Main  from '../pages/main/Main';

describe('Main', () => {
  it('Should render the Main correctly', () => {
    shallow(<Main />);
  });
});
