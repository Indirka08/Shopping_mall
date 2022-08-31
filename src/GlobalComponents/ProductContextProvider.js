import axios from "axios";
import { createContext, useReducer } from "react";

export const productsContext = createContext();

const API = "https://fs14-online-shop.herokuapp.com/products";

const INIT_STATE = {
  products: [],
  productDetails: null,
  pageTotalCount: 1,
};

const reducer = (prevState = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...prevState,
        products: action.payload.data,
        pageTotalCount: Math.ceil(action.payload.headers["x-total-count"] / 6),
      };
    case "GET_ONE_PRODUCT":
      return { ...prevState, productDetails: action.payload };
    default:
      return prevState;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //   Хук useLocation возвращает объект location, представляющий текущий URL. Его можно рассматривать как useState, который возвращает новое местоположение при каждом изменении URL. Этот хук можно использовать, например, чтобы вызвать событие просмотра новой страницы для инструмента веб-аналитики.

  // console.log(location);

  const getProducts = async () => {
    const res = await axios(`${API}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: res,
    });
  };

  const getOneProduct = async (id) => {
    const { data } = await axios(`${API}/${id}`);
    dispatch({
      type: "GET_ONE_PRODUCT",
      payload: data,
    });
  };

  const addProduct = async (product) => {
    await axios.post(API, product);
    getProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/${id}`);
    getProducts();
  };

  const editProduct = async (id, obj) => {
    console.log(obj);
    await axios.patch(`${API}/${id}`, obj);
    getProducts();
  };

  const cloud = {
    getProducts,
    getOneProduct,
    addProduct,
    deleteProduct,
    editProduct,
    productsArr: state.products,
    productDetails: state.productDetails,
    pageTotalCount: state.pageTotalCount,
  };

  return (
    <productsContext.Provider value={cloud}>
      {children}
    </productsContext.Provider>
  );
};

export default ProductContextProvider;
