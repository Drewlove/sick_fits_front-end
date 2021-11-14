// this file was created by going to pages, insert new file, then typing:
// pages/[id].js
// this automatically creates a query prop for this page,
// with id as one of its properties

import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
