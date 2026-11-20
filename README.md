# Day 22 - React useState, useEffect, useContext, useReducer

Repo: [https://github.com/Nghia-98/k22-day22-react-ecommerce-hooks](https://github.com/Nghia-98/k22-day22-react-ecommerce-hooks)

Demo: [https://k22-day22-react-ecommerce-hooks.vercel.app/](https://k22-day22-react-ecommerce-hooks.vercel.app/)

Tiếp tục website E-commerce của buổi 21: trang chủ, danh sách sản phẩm (tìm
kiếm/lọc theo danh mục qua query string), trang chi tiết sản phẩm, và trang
404. Dữ liệu sản phẩm lấy từ API [dummyjson.com](https://dummyjson.com/products)
bằng `useEffect`. Giỏ hàng được quản lý bằng `useReducer`, chia sẻ giữa các
trang qua `CartContext` (route `/cart`).

## Cài đặt & chạy dự án

```bash
npm install
npm run dev      # chạy dev server
npm run build    # build production ra dist/
npm run preview  # xem thử bản build
```

## Routing structure

- `/` — `HomePage`: giới thiệu ngắn, nút xem sản phẩm.
- `/products` — `ProductsPage`: danh sách sản phẩm, tìm theo tên (`?keyword=`)
  và lọc theo danh mục (`?category=`) qua `useSearchParams`.
- `/products/:productId` — `ProductDetailPage`: chi tiết 1 sản phẩm theo ID
  trên URL (`useParams`); báo "không tồn tại" nếu ID sai.
- `/cart` — `CartPage`: danh sách mặt hàng trong giỏ, tăng/giảm/xoá, tổng số
  lượng và tổng tiền.
- `*` — `NotFoundPage`: trang 404 cho mọi route không khai báo.

Tất cả route trên đều lồng (nested) dưới `Layout` (`src/components/Layout.jsx`)
— header + nav dùng chung, nội dung từng trang render vào `<Outlet />`.

## Quản lý giỏ hàng

State giỏ hàng (`items`) được quản lý bằng `useReducer` (`cartReducer`) trong
`CartProvider` ([src/context/CartProvider.jsx](src/context/CartProvider.jsx)),
đặt bên ngoài `<BrowserRouter>` ở `main.jsx` nên dùng chung được cho mọi
route. Các component (`ProductsPage`, `ProductDetailPage`, `CartPage`,
`Layout`) lấy giỏ hàng trực tiếp qua `useContext(CartContext)`, không truyền
qua props trung gian.
