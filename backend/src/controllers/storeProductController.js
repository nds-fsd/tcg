const { StoreProduct } = require('../data/Schema/storeProducts');
const { User } = require('../data/Schema/user');
const { UserCollection } = require('../data/Schema/userCollection');
const { Card } = require('../data/Schema/card');
const { Order } = require('../data/Schema/order');
const { cardsObtainedFromChests } = require('./userCollectionController');

const getProducts = async (req, res) => {
  try {
    const products = await StoreProduct.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de compras' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, reward, imageUrl } = req.body;

    if (!name || !description || !price || !reward || !imageUrl) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const newProduct = new StoreProduct({
      name,
      description,
      price,
      reward,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Producto creado con éxito', product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, reward, imageUrl } = req.body;

    if (!name && !description && !price && !reward && !imageUrl) {
      return res.status(400).json({ error: 'Debe enviar al menos un campo para actualizar.' });
    }

    const updatedProduct = await StoreProduct.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const rarityDistribution = {
  'Cofre básico': { common: 4, random: ['rare', 'epic'] },
  'Cofre especial': { common: 3, rare: 1, random: ['epic', 'legendary'] },
  'Cofre mágico': { rare: 1, epic: 2, legendary: 2 },
};

const buyChest = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const productId = req.body.productId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const chestData = await StoreProduct.findOne({ _id: productId });
    if (!chestData) return res.status(404).json({ error: 'Cofre no encontrado' });

    const obtainedCards = await cardsObtainedFromChests(userId, chestData);

    const { pixelcoins, pixelgems } = chestData.price;

    const canAffordWithPixelcoins = user.pixelcoins >= pixelcoins;
    const canAffordWithPixelgems = user.pixelgems >= pixelgems;
    if (!canAffordWithPixelcoins && !canAffordWithPixelgems) {
      return res.status(400).json({ error: 'No dispones de suficiente saldo para comprar este cofre' });
    }

    const previousBalance = { pixelcoins: user.pixelcoins, pixelgems: user.pixelgems };

    if (canAffordWithPixelcoins) {
      user.pixelcoins -= pixelcoins;
    }

    if (canAffordWithPixelgems) {
      user.pixelgems -= pixelgems;
    }
    await user.save();

    const newBalance = {
      pixelcoins: user.pixelcoins,
      pixelgems: user.pixelgems,
    };

    const newOrder = new Order({
      userId: user._id,
      products: [
        {
          productId: chestData._id,
          name: chestData.name,
          price: chestData.price,
          reward: chestData.reward,
        },
      ],
      totalPrice: chestData.price,
      previousBalance,
      newBalance,
      status: 'completada',
    });

    await newOrder.save();
    res.status(200).json(obtainedCards);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
};

const buyCurrency = async (req, res) => {
  const userId = req.jwtPayload.id;
  const productId = req.header;
  try {
    const userId = req.jwtPayload.id;
    const { productId } = req.params;

    const product = await StoreProduct.findById(productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    if (!product.reward.pixelcoins || product.reward.pixelcoins <= 0) {
      return res.status(400).json({ error: 'Este producto no es un pack de pixelgems válido.' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const previousBalance = { pixelcoins: user.pixelcoins, pixelgems: user.pixelgems };

    user.pixelcoins += product.reward.pixelcoins;

    await user.save();

    const newOrder = new Order({
      userId: user._id,
      products: [
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          reward: product.reward,
        },
      ],
      totalPrice: product.price,
      previousBalance,
      newBalance: { pixelcoins: user.pixelcoins, pixelgems: user.pixelgems },
      status: 'completada',
    });

    await newOrder.save();

    res.status(200).json({ message: 'Compra de pixelcoins realizada con éxito', order: newOrder });
  } catch (error) {
    console.error('Error al procesar la compra de pixelcoins:', error);
    res.status(500).json({ error: 'Error al procesar la compra de pixelcoins' });
  }
  return userId;
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await StoreProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado con éxito', product: deletedProduct });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  getProducts,
  getUserOrders,
  createProduct,
  updateProduct,
  buyChest,
  buyCurrency,
  deleteProduct,
};
