import { render } from '@testing-library/react';

import BiscuitUi from './biscuit-ui';

describe('BiscuitUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BiscuitUi />);
    expect(baseElement).toBeTruthy();
  });
});
