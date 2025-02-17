const { StoreProduct } = require('../data/Schema/storeProducts');
const { User } = require('../data/Schema/user');
const { UserCollection } = require('../data/Schema/userCollection');
const { Card } = require('../data/Schema/card');
const { Order } = require('../data/Schema/order');

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
    console.error('Error al crear el producto:', error);
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
    const { productId } = req.params;

    if (!userId) return res.status(401).json({ error: 'Usuario no autenticado' });

    const product = await StoreProduct.findById(productId);
    if (!product) return res.status(404).json({ error: 'Cofre no encontrado' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { pixelcoins, pixelgems } = product.price;
    const canPayWithPixelcoins = pixelcoins && user.pixelcoins >= pixelcoins;
    const canPayWithPixelgems = pixelgems && user.pixelgems >= pixelgems;

    if (!canPayWithPixelcoins && !canPayWithPixelgems) {
      return res.status(400).json({ error: 'No tienes suficiente saldo para comprar este cofre' });
    }

    const previousBalance = { pixelcoins: user.pixelcoins, pixelgems: user.pixelgems };

    if (canPayWithPixelcoins) {
      user.pixelcoins -= pixelcoins;
    } else {
      user.pixelgems -= pixelgems;
    }

    let userCollection = await UserCollection.findOne({ userId });

    if (!userCollection) {
      userCollection = new UserCollection({ userId, cards: [] });
      await userCollection.save();
    }

    let newCards = [];
    if (product.reward.cards) {
      const chestType = product.name;
      const rarities = rarityDistribution[chestType];

      if (!rarities) return res.status(400).json({ error: 'Este cofre no es válido.' });

      for (const [rarity, amount] of Object.entries(rarities)) {
        if (rarity !== 'random') {
          const availableCards = await Card.find({ rarity });
          for (let i = 0; i < amount; i++) {
            if (availableCards.length > 0) {
              const randomIndex = Math.floor(Math.random() * availableCards.length);
              newCards.push(availableCards[randomIndex]._id);
            }
          }
        }
      }

      if (rarities.random) {
        const randomRarity = rarities.random[Math.floor(Math.random() * rarities.random.length)];
        const availableCards = await Card.find({ rarity: randomRarity });
        if (availableCards.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableCards.length);
          newCards.push(availableCards[randomIndex]._id);
        }
      }

      let cardsModified = false;
      for (const cardId of newCards) {
        const existingCard = userCollection.cards.find((card) => card.cardId.toString() === cardId.toString());
        if (existingCard) {
          existingCard.amount += 1;
        } else {
          userCollection.cards.push({ cardId, amount: 1 });
          cardsModified = true;
        }
      }

      if (cardsModified) await userCollection.save();
    }

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

    res.status(200).json({ message: 'Compra realizada con éxito', order: newOrder });
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
};

const buyCurrency = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const { productId } = req.params;

    const product = await StoreProduct.findById(productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    if (!product.reward.pixelcoins || product.reward.pixelcoins <= 0) {
      return res.status(400).json({ error: 'Este producto no es un pack de pixelcoins válido.' });
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

module.exports = { getProducts, getUserOrders, createProduct, updateProduct, buyChest, buyCurrency, deleteProduct };
