import { Link } from 'react-router';

function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900">Chào mừng đến Mini Shop</h2>
      <p className="max-w-md text-gray-600">
        Cửa hàng trực tuyến với hàng trăm sản phẩm thời trang, điện tử và đồ gia dụng với giá tốt
        nhất.
      </p>
      <Link
        to="/products"
        className="rounded bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
      >
        Xem sản phẩm
      </Link>
    </div>
  );
}

export default HomePage;
