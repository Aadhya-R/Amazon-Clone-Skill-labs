const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// 1. ADD TO CART (Create or Update)
// POST http://localhost:5000/api/cart/add
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find if a cart already exists for this user
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if product already exists in that cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // If it exists, just update the quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // If it's a new product, push it to the array
                cart.items.push({ productId, quantity });
            }
            cart = await cart.save();
            return res.status(200).json(cart);
        } else {
            // If no cart exists, create a brand new one
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

// 2. GET USER CART (Read)
// GET http://localhost:5000/api/cart/:userId
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
            .populate('items.productId'); // Pulls in Product details like Title and Price
        
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
});

// 3. UPDATE QUANTITY (Update)
// PUT http://localhost:5000/api/cart/update
router.put('/update', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId, "items.productId": productId },
            { $set: { "items.$.quantity": quantity } }, // '$' targets the specific array element found
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({ message: "Error updating quantity", error: err.message });
    }
});

// 4. REMOVE ITEM FROM CART (Delete)
// DELETE http://localhost:5000/api/cart/remove
router.delete('/remove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: productId } } }, // '$pull' removes the object from the array
            { new: true }
        );
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error removing item", error: err.message });
    }
});

module.exports = router;