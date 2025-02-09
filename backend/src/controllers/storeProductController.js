const StoreProduct = require('../data/Schema/storeProducts'); 

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

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
