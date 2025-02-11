import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const getProducts = async () => {
  try {
    const response = await API.get("/store");
    console.log('Resposta', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
};

export const buyChest = async (productId, token) => {
  try {
    const response = await API.post(`/buy/chest/${productId}`, {}, { 
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error al comprar el cofre:", error.response ? error.response.data : error);
    return null;
  }
};

export const buyCurrency = async (productId, token) => {
  try {
    const response = await API.post(`/buy/currency/${productId}`, {}, { 
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error al comprar el pack de Pixelcoins:", error.response ? error.response.data : error);
    return null;
  }
};
