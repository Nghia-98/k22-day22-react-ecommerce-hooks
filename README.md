# Day 22 - React useState, useEffect, useContext, useReducer

Repo: [https://github.com/Nghia-98/k22-day21-react-router](https://github.com/Nghia-98/k22-day21-react-router)

Demo: [https://k22-day21-react-router.vercel.app/products](https://k22-day21-react-router.vercel.app/products)

Website E-commerce đơn giản dùng `react-router`: trang chủ, danh sách sản phẩm
có tìm kiếm/lọc theo danh mục (lưu trên query string), trang chi tiết sản
phẩm theo route động, và trang 404.

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
- `*` — `NotFoundPage`: trang 404 cho mọi route không khai báo.

Tất cả route trên đều lồng (nested) dưới `Layout` (`src/components/Layout.jsx`)
— header + nav dùng chung, nội dung từng trang render vào `<Outlet />`.
