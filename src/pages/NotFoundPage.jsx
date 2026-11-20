import { Link } from 'react-router'

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">404</h2>
            <p className="text-gray-600">Trang bạn tìm không tồn tại.</p>
            <div className="flex gap-3">
                <Link to="/" className="text-blue-600 hover:underline">
                    Về trang chủ
                </Link>
                <Link to="/products" className="text-blue-600 hover:underline">
                    Xem sản phẩm
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage
