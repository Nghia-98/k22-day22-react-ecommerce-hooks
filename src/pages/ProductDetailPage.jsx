import { Link, useNavigate, useParams } from 'react-router'
import products from '../data/products'

function ProductDetailPage() {
    const { productId } = useParams()
    const navigate = useNavigate()

    const product = products.find((p) => p.id === Number(productId))

    if (!product) {
        return (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
                <p className="text-gray-600">Sản phẩm không tồn tại.</p>
                <Link to="/products" className="text-blue-600 hover:underline">
                    Quay lại danh sách sản phẩm
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 sm:flex-row">
            <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full max-w-sm rounded object-cover"
            />
            <div className="flex flex-1 flex-col gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-500">Danh mục: {product.category}</p>
                <p className="text-xl font-semibold text-blue-600">
                    {product.price.toLocaleString('vi-VN')}đ
                </p>
                <p className="text-gray-700">{product.description}</p>

                <button
                    onClick={() => navigate('/products')}
                    className="mt-4 w-fit rounded border px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                    ← Quay lại danh sách
                </button>
            </div>
        </div>
    )
}

export default ProductDetailPage
