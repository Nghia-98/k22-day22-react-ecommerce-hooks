import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { CartContext } from '../context/cart-context.js';
import { formatUSD } from '../utils/formatPrice';

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [result, setResult] = useState({ key: null, product: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://dummyjson.com/products/${productId}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setResult({ key: productId, product: data, error: null });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setResult({ key: productId, product: null, error: err });
        }
      });

    return () => controller.abort();
  }, [productId]);

  const isLoading = result.key !== productId;

  if (isLoading) {
    return <p className="text-center text-gray-500">Đang tải...</p>;
  }

  if (result.error || !result.product) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-gray-600">Sản phẩm không tồn tại.</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const product = result.product;

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="aspect-square w-full max-w-sm rounded object-contain"
      />
      <div className="flex flex-1 flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
        <p className="text-sm text-gray-500">Danh mục: {product.category}</p>
        <p className="text-xl font-semibold text-blue-600">{formatUSD(product.price)}</p>
        <p className="text-gray-700">{product.description}</p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => addToCart(product)}
            className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Thêm vào giỏ
          </button>
          <button
            onClick={() => navigate('/products')}
            className="w-fit cursor-pointer rounded border px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            ← Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
