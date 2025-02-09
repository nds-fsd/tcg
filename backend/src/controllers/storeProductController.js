const { StoreProduct } = require('../data/Schema/storeProducts');
const { User } = require('../data/Schema/user');
const { UserCollection } = require('../data/Schema/userCollection');
const { Card } = require('../data/Schema/card');

const getProducts = async (req, res) => {
  try {
    const products = await StoreProduct.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, reward, imageUrl } = req.body;

    if (!name || !description || !price || !reward || !imageUrl) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
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
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, reward, imageUrl } = req.body;

    if (!name && !description && !price && !reward && !imageUrl) {
      return res.status(400).json({ message: 'Debe enviar al menos un campo para actualizar.' });
    }

    const updatedProduct = await StoreProduct.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

const rarityDistribution = {
  'Cofre básico': { common: 4, random: ['rare', 'epic'] },
  'Cofre especial': { common: 3, rare: 1, random: ['epic', 'legendary'] },
  'Cofre mágico': { rare: 1, epic: 2, legendary: 2 },
};

const buyChest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const product = await StoreProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Cofre no encontrado' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const canPayWithPixelcoins = product.price.pixelcoins && user.pixelcoins >= product.price.pixelcoins;
    const canPayWithPixelgems = product.price.pixelgems && user.pixelgems >= product.price.pixelgems;

    if (!canPayWithPixelcoins && !canPayWithPixelgems) {
      return res.status(400).json({ message: 'No tienes suficiente saldo para comprar este cofre' });
    }

    if (canPayWithPixelcoins) {
        user.pixelcoins -= product.price.pixelcoins;
      } else if (canPayWithPixelgems) {
        user.pixelgems -= product.price.pixelgems;
      } else {
        return res.status(400).json({ message: 'No tienes suficiente saldo para comprar este cofre' });
      }

    let userCollection = await UserCollection.findOne({ userId: userId });

    if (!userCollection) {
      userCollection = new UserCollection({ userId, cards: [] });
      await userCollection.save();
    }

    if (product.reward.cards) {
      const chestType = product.name;
      const rarities = rarityDistribution[chestType];

      if (!rarities) {
        return res.status(400).json({ message: 'Este cofre no es válido.' });
      }

      const newCards = [];

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

      for (const cardId of newCards) {

        const existingCard = userCollection.cards.find(card => card.cardId.toString() === cardId.toString());

        if (existingCard) {
          existingCard.amount += 1;
        } else {
          userCollection.cards.push({ cardId, amount: 1 });
        }
      }

      await userCollection.save();
    }

    await user.save();

    res.status(200).json({ message: 'Compra realizada con éxito', user, userCollection });
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
  }
};

const buyCurrency = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const product = await StoreProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (!product.reward.pixelcoins || product.reward.pixelcoins <= 0) {
        return res.status(400).json({ message: 'Este producto no es un pack de pixelcoins válido.' });
      }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (product.reward.pixelcoins) {
      user.pixelcoins += product.reward.pixelcoins;
    }

    await user.save();

    res.status(200).json({ message: 'Compra de pixelcoins realizada con éxito', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la compra de pixelcoins', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await StoreProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado con éxito', product: deletedProduct });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, buyChest, buyCurrency, deleteProduct };
