const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');

// 1. ADD TO CART
// POST /cart/add
router.post('/add', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.userId; // Extracted from token by middleware

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            cart = await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
            const savedCart = await newCart.save();
            return res.status(201).json(savedCart);
        }
    } catch (err) {
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
});

// 2. GET USER CART
// GET /cart
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(200).json({ items: [] }); // Return empty cart instead of 404
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
});

// 3. REMOVE ITEM FROM CART
// DELETE /cart/remove/:productId
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.params;
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: productId } } },
            { new: true }
        ).populate('items.productId');
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error removing item", error: err.message });
    }
});

module.exports = router;