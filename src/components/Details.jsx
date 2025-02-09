import axios from "../utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./loading";
import { productContext } from "../utils/context";
import { toast } from "react-toastify";

const Details = () => {
  const Navigate = useNavigate();
  const [products, setproducts] = useContext(productContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();

  // const getsingleproduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //    setproduct(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    if (!product) {
      setproduct(products.filter((p) => p.id == id)[0]);
    }

    // getsingleproduct();
  }, []);

  const productDeletehandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    toast.success("Deleted Successfully");
    Navigate("/");
  };

  return product ? (
    <div className="container flex  gap-9 justify-center m-auto w-[70%] p-[10%] h-full">
      <img
        className="h-[80%] w-[40%] object-contain"
        src={product.image}
        alt=""
      />
      <div className="content gap-4 flex flex-col mt-[2%]">
        <h1 className="text-5xl">{product.title}</h1>
        <h3 className="text-zinc-600 text-xl">{product.catagory}</h3>
        <h2 className="text-xl font-semibold text-amber-400">
          $ {product.price}
        </h2>
        <p className="font-semibold">{product.description}</p>
        <div className="flex gap-2">
          <Link
            to={`/edit/${product.id}`}
            className=" px-5 py-3 w-[15%] text-blue-400 border text-center"
          >
            Edit
          </Link>
          <button
            onClick={() => productDeletehandler(product.id)}
            className="text-red-700 w-[15%] px-7 py-3 border cursor-pointer flex items-center justify-center"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
