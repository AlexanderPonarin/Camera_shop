import { Link } from 'react-router-dom';
import { Product } from '../../types/products';
import { useEffect, useRef } from 'react';

type SearchItemProps = {
    product: Product;
    isFocused: boolean;
}

function SearchItem({product, isFocused}: SearchItemProps) {
  const searchItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if(isFocused && searchItemRef.current) {
      searchItemRef.current.focus();
    }
  });

  return (
    <Link to={`/product/${product.id}/description`} >
      <li
        style={{backgroundColor: isFocused ? '#f4f4fc' : '' }}
        ref={searchItemRef}
        className="form-search__select-item" tabIndex={-1}
      >{product.name}
      </li>
    </Link>
  );
}

export default SearchItem;
