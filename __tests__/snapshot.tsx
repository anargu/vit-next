import { render } from '@testing-library/react'
import Home from '@/pages/index'
import { useLinks } from '@/src/hooks/useLinks';
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

jest.mock("@/src/hooks/useLinks", () => ({
  useLinks: jest.fn(),
}));

it('renders homepage unchanged', () => {
  (useLinks as jest.Mock).mockReturnValue({
    feedLinks: [],
    initListeningFeed: () => (() => {}),
  });

  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
})
