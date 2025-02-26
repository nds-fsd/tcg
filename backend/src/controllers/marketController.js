const { Market } = require('../data/Schema/market');

const getMarketPlace = async (req, res) => {
  try {
    const marketCards = await Market.find();
    res.status(200).json(marketCards || []);
  } catch (e) {
    res.status(500).json({ e: 'Market' });
  }
};

module.exports = {
  getMarketPlace,
};
