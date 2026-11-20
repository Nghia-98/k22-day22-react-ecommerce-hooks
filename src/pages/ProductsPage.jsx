import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CartContext } from '../context/cart-context.js';
import { formatUSD } from '../utils/formatPrice';

function ProductsPage() {
  const { addToCart } = useContext(CartContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const category = searchParams.get('category') ?? '';

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://dummyjson.com/products', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setStatus('error');
        }
      });

    return () => controller.abort();
  }, [retryCount]);

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set('keyword', value);
      } else {
        next.delete('keyword');
      }
      return next;
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set('category', value);
      } else {
        next.delete('category');
      }
      return next;
    });
  };

  const handleRetry = () => {
    setStatus('loading');
    setRetryCount((count) => count + 1);
  };

  if (status === 'loading') {
    return <p className="text-center text-gray-500">Đang tải...</p>;
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-red-600">Đã có lỗi xảy ra khi tải sản phẩm.</p>
        <button
          onClick={handleRetry}
          className="cursor-pointer rounded border px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Thử lại
        </button>
      </div>
    );
  }

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchKeyword = product.title.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = category ? product.category === category : true;
    return matchKeyword && matchCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Tìm theo tên sản phẩm..."
          className="flex-1 rounded border px-3 py-2 text-sm"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="rounded border px-3 py-2 text-sm"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col rounded border bg-white p-3">
              <Link to={`/products/${product.id}`} className="hover:opacity-80">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="mb-2 aspect-square w-full rounded object-contain"
                />
                <h3 className="text-sm font-medium text-gray-800">{product.title}</h3>
                <p className="text-sm font-semibold text-blue-600">{formatUSD(product.price)}</p>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 cursor-pointer rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
              >
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
