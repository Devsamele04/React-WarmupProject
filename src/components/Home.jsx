import React, { useContext, useState } from "react";
import Nav from "../Components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { productContext } from "../utils/context";
import Loading from "./loading";
import axios from "../utils/axios";
import { useEffect } from "react";

const Home = () => {
  const [products] = useContext(productContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(null);
  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category == "undefined")
      setfilteredProducts(products);
    if (category != "undefined") {
      // getproductscategory()
      setfilteredProducts(products.filter((p) => p.category == category));
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="`box w-[85%] p-10 pt-[3%] flex flex-wrap overflow-x-hidden overflow-y-auto ">
        {filteredProducts &&
          filteredProducts.map((p, i) => {
            return (
              <Link
                key={i}
                to={`/details/${p.id}`}
                className="card p-3 mr-4 mb-3  border-none  shadow-xl rounded w-[18%] h-[35vh] flex justify-center flex-col  items-center "
              >
                <div
                  className="hover:scale-110 mb-5 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${p.image})`,
                  }}
                ></div>
                <h1 className="hover:text-blue-400 cursor-pointer">
                  {p.title}
                </h1>
              </Link>
            );
          })}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
