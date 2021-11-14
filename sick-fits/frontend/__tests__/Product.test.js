import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

// docs for react testing library
// especially for all of the queries, such as .getByText .getByAltText etc.

const product = fakeItem();

describe('<Product />', () => {
  it('renders out the price tag and title', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // debug() is commented out, but can be used any time to render the actual component in the console
    // debug();
    // can also debug() specific variables, for example(debug(link))
    expect(screen.getByText('$50')).toBeInTheDocument();
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent(product.name);
  });
  it('Renders and matches the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // if failed, the code is not working properly, OR the snapshot needs to be updated
    // to update the snapshot, type in 'u' in the console after the failed snapshot test
    expect(container).toMatchSnapshot();
  });
  it('Renders and matches the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});
