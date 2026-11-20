import { Link, useSearchParams } from 'react-router'
import products from '../data/products'

const categories = ['fashion', 'electronics', 'home']

function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') ?? ''
    const category = searchParams.get('category') ?? ''

    const handleKeywordChange = (e) => {
        const value = e.target.value
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            if (value) {
                next.set('keyword', value)
            } else {
                next.delete('keyword')
            }
            return next
        })
    }

    const handleCategoryChange = (e) => {
        const value = e.target.value
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            if (value) {
                next.set('category', value)
            } else {
                next.delete('category')
            }
            return next
        })
    }

    const filteredProducts = products.filter((product) => {
        const matchKeyword = product.name.toLowerCase().includes(keyword.toLowerCase())
        const matchCategory = category ? product.category === category : true
        return matchKeyword && matchCategory
    })

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
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="rounded border bg-white p-3 hover:shadow-md"
                        >
                            <img src={product.image} alt={product.name} className="mb-2 aspect-square w-full rounded object-contain" />
                            <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                            <p className="text-sm font-semibold text-blue-600">
                                {product.price.toLocaleString('vi-VN')}đ
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductsPage
