import { render } from '@testing-library/react';

import { BiscuitWords } from './biscuit-words';

describe('BiscuitWords', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BiscuitWords />);
    expect(baseElement).toBeTruthy();
  });
});
