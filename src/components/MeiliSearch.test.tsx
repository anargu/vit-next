import { render, act, screen } from '@testing-library/react'
import { MeiliSearchBar } from '@/src/components/MeiliSearch'

describe('MeiliSearch', () => {

  it('should not be empty when render', () => {
    const parentEl = document.createElement("div");

    // TODO: check component state error
    render(<MeiliSearchBar />, {container: parentEl});

    const element = parentEl.firstChild;

    expect(element).not.toBeNull();
  });

  // it('should contain an InstantSearch component', () => {
  //   const { container }  = render(<MeiliSearchBar />);
  //
  //   const matchedElements = container.querySelectorAll("InstantSearch");
  //
  //   expect(matchedElements.length).toBeGreaterThan(0);
  // });
});

