import { fireEvent, render, screen } from '@testing-library/react'
import { SearchBar } from '@/src/components/SearchBar'

describe('SearchBar', () => {

  it('should render component', () => {
    const {container} = render(<SearchBar />);

    const results = container.getElementsByTagName("input");

    expect(results.length).not.toBe(0);
  });

  it('fires onNewSearch with the term when a search is submitted', () => {
    const onNewSearchCallback = jest.fn()

    const {getByPlaceholderText} = render(<SearchBar onNewSearch={onNewSearchCallback} />);

    const input = getByPlaceholderText("Search");;
    fireEvent.submit(input);

    expect(onNewSearchCallback).toBeCalled();
    expect(onNewSearchCallback).toBeCalledWith(expect.any(String));
  });

});


