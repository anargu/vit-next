import { render } from '@testing-library/react'
import Home from '@/pages/index'
import { mockMeiliSearchComponent } from '@/src/components/MeiliSearch.mocks';

jest.mock("../src/components/MeiliSearch", () => ({
  __esModule: true,
  MeiliSearchBar: () => {
    return mockMeiliSearchComponent.MeiliSearchBar;
  },
}));

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => {
    let pathname = "/";

    return {
      push: (newPath : string) => { pathname = newPath },
      pathname,
    };
  },
}));

it('renders homepage unchanged', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
})
