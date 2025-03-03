const { Market } = require('../data/Schema/market');
const { Card } = require('../data/Schema/card');
const { User } = require('../data/Schema/user');

const getMarketProducts = async (req, res) => {
  try {
    const filterCard = req.params.id;
    const marketCards = await Market.find({ cardId: filterCard }).populate('userId', 'userName');

    res.status(200).json(marketCards || []);
  } catch (e) {
    res.status(500).json({ e: 'Market' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { cardId, foil, price, amount } = req.body.newCard;
    const { id } = req.jwtPayload;

    const cardExists = await Card.findById(cardId);
    if (!cardExists) {
      return res.status(404).json({ error: 'Carta no encontrada' });
    }

    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const existingProduct = await Market.findOne({ userId: id, cardId, foil });
    const tipodads = typeof amount;
    console.log('Tipo de amount: ', tipodads);
    if (existingProduct) {
      existingProduct.amount += parseInt(amount, 10);
      await existingProduct.save();

      res.status(200).json('Cantidad actualizada en el mercado');
    } else {
      const newMarketProduct = new Market({
        cardId,
        foil,
        userId: id,
        price: { pixelcoins: parseFloat(price) },
        amount: parseInt(amount, 10),
      });

      await newMarketProduct.save();
      res.status(200).json('Carta puesta a la venta con éxito');
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el producto en el mercado' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params; 
    const { id: userId } = req.jwtPayload; 

    const product = await Market.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (product.userId.toString() !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este producto' });
    }

    await Market.findByIdAndDelete(productId); 

    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (e) {
    res.status(500).json({ e: 'Market' });
  }
};

module.exports = {
  getMarketProducts,
  createProduct,
  deleteProduct,
};
