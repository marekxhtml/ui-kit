import {
  Cart,
  ProductList as ProductListingController,
  ProductListState,
} from '@coveo/headless/ssr-commerce';
import {useEffect, useState, FunctionComponent} from 'react';

interface ProductListProps {
  staticState: ProductListState;
  controller?: ProductListingController;
  cart?: Cart;
}

export const ProductList: FunctionComponent<ProductListProps> = ({
  staticState,
  controller,
  cart,
}) => {
  const [state, setState] = useState(staticState);

  useEffect(
    () => controller?.subscribe(() => setState({...controller.state})),
    [controller]
  );

  return (
    <ul className="product-list">
      {state.products.map((product) => (
        <li key={product.ec_product_id}>
          <h3>{product.ec_name}</h3>
          <button
            onClick={() => {
              console.log('Adding to cart', cart);
              cart?.updateItemQuantity({
                name: product.ec_name || '',
                quantity: 1,
                price: product.ec_price || 0,
                productId: product.ec_product_id || '',
              });
            }}
          >
            Add to cart
          </button>
        </li>
      ))}
    </ul>
  );
};
