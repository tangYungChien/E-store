const express = require("express");
const bcrypt = require("bcryptjs"); //密碼的加密處理
const jwt = require("jsonwebtoken"); //用戶身份驗證
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
app.use(express.json());
app.use(cors());

// Session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
// Flash middleware
app.use(flash());

mongoose
  .connect("mongodb://localhost:27017/userDB")
  .then(() => {
    console.log("Connecting to mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//pre("save", async function (next) { ... }) 是 Mongoose中間件，表示在保存之前執行的函數。
//檢查密碼欄位是否被修改過，如果沒有被修改，則調用 next() 並退出中間件。
//this 代表即將被保存的用戶文檔
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("users", UserSchema);
User.createIndexes();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      req.flash("error", "用戶已存在");
      return res.status(400).json({ message: req.flash("error") });
    }

    user = new User({ username, password });
    await user.save();

    req.flash("success", "註冊成功");
    res.status(201).json({ message: req.flash("success") });
  } catch (err) {
    console.error(err.message);
    req.flash("error", "伺服器錯誤");
    res.status(500).json({ message: req.flash("error") });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      req.flash("error", "用戶不存在，請先註冊");
      return res.status(400).json({ message: req.flash("error") });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      req.flash("error", "密碼錯誤");
      return res.status(400).json({ message: req.flash("error") });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    req.flash("success", "登入成功");
    res.json({
      token,
      message: req.flash("success"),
    });
  } catch (err) {
    console.error(err.message);
    req.flash("error", "伺服器錯誤");
    res.status(500).json({ message: req.flash("error") });
  }
});

app.use(router);

//訂單管理

const OrderSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String },
    email: { type: String },
  },
  shippingInfo: {
    type: String,
    required: true,
  },
  paymentInfo: {
    type: String,
    required: true,
  },
  cart: [
    {
      name: { type: String, required: true },
      color: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number },
  orderTime: { type: String },
  memberName: { type: String },
});
const Order = mongoose.model("Order", OrderSchema);
// 在後端路由中處理訂單提交
router.post("/order", async (req, res) => {
  const {
    customerInfo,
    shippingInfo,
    paymentInfo,
    cart,
    totalAmount,
    orderTime,
    memberName,
  } = req.body;
  try {
    // 創建新訂單
    const newOrder = new Order({
      customerInfo,
      shippingInfo,
      paymentInfo,
      cart,
      totalAmount,
      orderTime,
      memberName,
    });
    await newOrder.save();
    // 返回成功與否
    res.status(201).json({ message: "訂單提交成功" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("伺服器錯誤");
  }
});

//取得會員的歷史訂單
router.get("/orders/:memberName", async (req, res) => {
  const { memberName } = req.params;
  try {
    const orders = await Order.find({ memberName });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`伺服器在端口 ${PORT} 上運行`);
});
