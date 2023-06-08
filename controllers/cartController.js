const CartModel = require("../models/cartModel");
const UserModel = require("../models/userModels");
const mongoose = require("mongoose");
const addToCart = async (req, res) => {
  try {
    const { title, price, image, user_id, _id: productId } = req.body;
 const user = await UserModel.findOne({ email: req.email });

 if (!user) {
   return res.status(400).json({ message: "please log in" });
 }
    const cart = await CartModel.findOne({ userId: user._id });
    if (!cart) {
      const newItem = [{ title, price, image, productId, quantity: 1 }];
      const newCartItem = new CartModel({
        userId: user._id,
        item: newItem,
        total:price
      });
      newCartItem.save();
      return res.status(200).json({ message: "Cart created " });
    }

    const existingitem = cart.item.find(
      (item) => item.productId.toString() === productId
    );
    if (!existingitem) {
      const newItem = [
        ...cart.item,
        { title, price, image, productId, quantity: 1 },
      ];

        const subtotal = newItem.reduce(
          (prev, currentval) => prev + currentval.quantity * currentval.price,
          0
        );

      cart.item = newItem;
      cart.total = subtotal;
      cart.save();
      return res.status(200).json({ message: "new Item Added " });
    }

    const newquantity = existingitem.quantity + 1;

    existingitem.quantity = newquantity;

    const index = cart.item.findIndex(
      (item) => item.productId.toString() === existingitem.productId.toString()
    );
    //   cart.item = [...cart.item, updatedItem]

    cart.item[index] = existingitem;
    const subtotal = cart.item.reduce(
      (prev, currentval) => prev + currentval.quantity * currentval.price,
      0
    );

    cart.total = subtotal;
    cart.save();
  } catch (error) {
    console.log(error);
  }
};


const incrementCartItem = async (req, res) => {
  try {
    const { title, price, image, user_id, _id: productId } = req.body;
    const user = await UserModel.findOne({ email: req.email });

    if (!user) {
      return res.status(400).json({ message: "please log in" });
    }
    const cart = await CartModel.findOne({ userId: user._id });
    if (!cart) {
      const newItem = [{ title, price, image, productId, quantity: 1 }];
      const newCartItem = new CartModel({
        userId: user._id,
        item: newItem,
        total: price,
      });
      newCartItem.save();
      return res.status(200).json({ message: "Cart created " });
    }

    const existingitem = cart.item.find(
      (item) => item.productId.toString() === productId
    );
    if (!existingitem) {
      const newItem = [
        ...cart.item,
        { title, price, image, productId, quantity: 1 },
      ];

      const subtotal = newItem.reduce(
        (prev, currentval) => prev + currentval.quantity * currentval.price,
        0
      );

      cart.item = newItem;
      cart.total = subtotal;
      cart.save();
      return res.status(200).json({ message: "new Item Added " });
    }

    const newquantity = existingitem.quantity + 1;

    existingitem.quantity = newquantity;

    const index = cart.item.findIndex(
      (item) => item.productId.toString() === existingitem.productId.toString()
    );
    //   cart.item = [...cart.item, updatedItem]

    cart.item[index] = existingitem;
    const subtotal = cart.item.reduce(
      (prev, currentval) => prev + currentval.quantity * currentval.price,
      0
    );

    cart.total = subtotal;
    cart.save();
    return res.status(200).json({ quantity: newquantity, subtotal })
  } catch (error) {
    console.log(error);
  }
  
}
const decrementItem = async (req, res) => {
  try {
    const { title, price, image, user_id, _id: productId } = req.body;
    const user = await UserModel.findOne({ email: req.email });

    if (!user) {
      return res.status(400).json({ message: "please log in" });
    }
    const cart = await CartModel.findOne({ userId: user._id });
    if (!cart) {
     return res.status(400).json({ message: "please add an item" });
    }

    const existingitem = cart.item.find(
      (item) => item.productId.toString() === productId
    );
    if (!existingitem) {
 
      return res.status(400).json({ message: "item does not exist " });
    }

    if (existingitem.quantity <= 1) {
      const index = cart.item.findIndex((item) => item.productId.toString() === productId);
      
     cart.item.splice(index, 1);
      cart.save()
      return res.status(200).json("item removed")
}

    const newquantity = existingitem.quantity - 1;

    existingitem.quantity = newquantity;

    const index = cart.item.findIndex(
      (item) => item.productId.toString() === existingitem.productId.toString()
    );
    //   cart.item = [...cart.item, updatedItem]

    cart.item[index] = existingitem;
    const subtotal = cart.item.reduce(
      (prev, currentval) => prev + currentval.quantity * currentval.price,
      0
    );

    cart.total = subtotal;
    cart.save();
    return res.status(200).json({ message: "item decremented"})
  } catch (error) {
    console.log(error);
  }
};
const getCart = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.email })

    if (!user) {
      return res.status(400).json({message:"please log in"})
    }

    const cart = await CartModel.findOne({ userId: user._id.toString() });

 res.status(200).json(cart)
  } catch (error) {}
};
const deleteCart = () => {
  try {
  } catch (error) {}
};

module.exports = { addToCart, decrementItem, getCart, deleteCart, incrementCartItem };
