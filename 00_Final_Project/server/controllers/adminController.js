const AdminModel = require("../models/AdminModel");
const ProductModel = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");
const jwt = require("jsonwebtoken");

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "product_images", // folder name Cloudinary account
    format: async (req, file) => "jpg", // supports promises as well
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage: storage }).array("images", 10); //image size

const adminLogin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    // 1️⃣ Check admin exists
    const admin = await AdminModel.findOne({ adminEmail });

    if (!admin) {
      return res.status(401).json({ msg: "Invalid Admin Email" });
    }

    // 2️⃣ Plain password check (as you want)
    if (admin.adminPassword !== adminPassword) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      {
        userId: admin._id,
        role: "admin", // 👈 REQUIRED for admin dashboard
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Response
    res.status(200).json({
      msg: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.adminEmail,
        role: "admin",
      },
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = adminLogin;

const addProduct = async (req, res) => {
  console.log(req.body);

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send("Error uploading files: " + err.message);
    }
    try {
      const { name, category, MRP, price, quantity, starRating, description } =
        req.body;
      const imageUrls =
        req.files && req.files.length > 0
          ? req.files.map((file) => file.path)
          : [];
      const product = await ProductModel.create({
        name: name,
        category: category,
        MRP: MRP,
        price: price,
        quantity: quantity,
        starRating: starRating,
        description: description,
        defaultImage: imageUrls[0],
        images: imageUrls,
      });

      res.status(200).send("Data saved successfully!");
    } catch (error) {
      res.status(500).send("Error saving data: " + error.message);
    }
  });
};

const getDashboardStats = async (req, res) => {
  try {
    /* ===== PRODUCTS BY CATEGORY ===== */
    const productCategories = await ProductModel.aggregate([
  {
    $project: {
      category: {
        $switch: {
          branches: [
            {
              case: {
                $in: [
                  { $toLower: "$category" },
                  ["laptop", "laptops"]
                ]
              },
              then: "laptops",
            },
            {
              case: {
                $in: [
                  { $toLower: "$category" },
                  ["smartphone", "smartphones", "mobile", "mobiles"]
                ]
              },
              then: "smartphones",
            },
            {
              case: {
                $in: [
                  { $toLower: "$category" },
                  ["camera", "cameras"]
                ]
              },
              then: "cameras",
            },
            {
              case: {
                $in: [
                  { $toLower: "$category" },
                  ["accessory", "accessories"]
                ]
              },
              then: "accessories",
            },
          ],
          default: "other",
        },
      },
    },
  },
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 },
    },
  },
]);


    /* ===== ORDERS & REVENUE (already exists) ===== */
    const monthlyRevenue = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const revenueByCategory = await Order.aggregate([
  { $unwind: "$items" },
  {
    $project: {
      category: {
        $switch: {
          branches: [
            { case: { $in: [{ $toLower: "$items.category" }, ["laptop", "laptops"]] }, then: "laptops" },
            { case: { $in: [{ $toLower: "$items.category" }, ["smartphone", "smartphones"]] }, then: "smartphones" },
            { case: { $in: [{ $toLower: "$items.category" }, ["camera", "cameras"]] }, then: "cameras" },
            { case: { $in: [{ $toLower: "$items.category" }, ["accessory", "accessories"]] }, then: "accessories" }
          ],
          default: "other"
        }
      },
      amount: { $multiply: ["$items.price", "$items.quantity"] }
    }
  },
  {
    $group: {
      _id: "$category",
      size: { $sum: "$amount" }
    }
  }
]);


    const weeklyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          orders: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        productCategories,
        revenueByCategory,
        monthlyRevenue,
        weeklyOrders,
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ success: false });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("Admin get orders error:", err);
    res.status(500).json({ success: false });
  }
};

const getProductsWithStock = async (req, res) => {
  try {
    const products = await ProductModel.find().select(
      "name category price quantity defaultImage"
    );

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


module.exports = {
  adminLogin,
  addProduct,
  getDashboardStats,
  getAllOrders,
  getProductsWithStock,
};
