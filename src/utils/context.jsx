import axios from "./axios";
import { createContext, useEffect, useState } from "react";
export const productContext = createContext();

const context = (props) => {
  const [product, setproducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );

  // const getproducts = async () => {
  //   try {
  //     const { data } = await axios("/products");
  //     setproducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getproducts();
  // }, []);

  return (
    <productContext.Provider value={[product, setproducts]}>
      {props.children}
    </productContext.Provider>
  );
};

export default context;
