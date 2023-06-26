import { render } from '@testing-library/react';

import BiscuitKonva from './biscuit-konva';

describe('BiscuitKonva', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BiscuitKonva />);
    expect(baseElement).toBeTruthy();
  });
});
