# 貳拾飾 

貳拾飾是一個專門銷售飾品的購物網站，讓用戶能夠輕鬆地瀏覽、選擇並購買商品。專案採用 React 框架開發前端，並結合 Node.js 的 Express 框架和 MongoDB 資料庫，實現產品展示、用戶認證、購物車、訂單管理等核心功能。

 [貳拾飾](https://e-store-liard.vercel.app/) (因平台限制後端尚未部屬)
 
![image](https://github.com/tangYungChien/E-store/blob/Add-backend/twentyFour_demo.JPG)





## 前端功能

### 產品展示與分類過濾
- 主頁展示所有產品，並可根據分類顯示產品。

### 產品詳細頁面
- 提供每個產品的詳細訊息，包括名稱、價格、描述、顏色等。
- 用戶可以選擇數量和顏色，並將產品加入購物車。

### 購物車功能
- 用戶可以在購物車頁面查看已選購的商品，修改數量或刪除商品。
- 動態計算購物車內商品的總金額，方便用戶查看總消費。

### 結帳與訂單摘要
- 用戶在結帳頁面完成訂單，並生成訂單訊息。

## 後端功能

### 用戶註冊與登入
- 包含用戶登入和註冊功能，提升網站互動性。

### 訂單管理
- 用戶可以提交訂單，且可以查詢該用戶的歷史訂單。
  
![image](https://github.com/tangYungChien/E-store/blob/Add-backend/store-Order.JPG)

## 技術棧

### React
- **React Router**: 進行客戶端路由管理，實現單頁應用 (SPA)。
- **狀態管理**: 使用 `useState` 和 `useEffect` 管理和監控應用程式狀態。
- **組件化開發**: 採用組件化方法開發頁面和功能，包括 `Nav`、`Footer`、`ProductGrid` 等組件。
- **自定義 Hook**: 使用自定義鉤子 `useCart` 處理購物車相關邏輯。

### backend
- **Express**: 使用 Express 框架更迅速地建立伺服器。
- **RESTful API**: 構建 RESTful API，包含使用者註冊、登入和訂單管理。
- **MongoDB**: 連接 MongoDB 資料庫，並使用 Mongoose 進行數據模型管理。
- **Bcrypt**: 對用戶密碼進行加密存儲，確保密碼的安全性。
- **Connect Flash**: 顯示用戶操作成功或失敗的提示訊息。
