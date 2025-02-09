import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../utils/context";
import { toast } from "react-toastify";

const Edit = () => {
  const [products, setProducts] = useContext(productContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const changeHandler = (e) => {
    // console.log(e.target.name,e.target.value)
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const addProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every input must have at least 4 characters");
      return;
    }
    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };
    console.log(product, pi);

    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    toast.success("Edited Successfully");
    navigate(-1);
  };
  return (
    <form
      onSubmit={addProductHandler}
      className=" p-[5%] w-screen h-screen  flex flex-col items-center "
    >
      <h1 className="text-2xl w-1/2 mb-5 ">Edit Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-100 mb-3 rounded p-3 w-1/2 "
        name="image"
        onChange={changeHandler}
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-xl bg-zinc-100 mb-3 rounded p-3 w-1/2 "
        name="title"
        onChange={changeHandler}
        value={product && product.title}
      />
      <div className="w-1/2  flex justify-between ">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-100 mb-3 rounded p-3 w-[48%]"
          name="category"
          onChange={changeHandler}
          value={product && product.category}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-xl bg-zinc-100 mb-3 rounded p-3 w-[48%] "
          name="price"
          onChange={changeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        className="text-xl bg-zinc-100 mb-3 rounded p-3 w-1/2 "
        rows="10"
        placeholder="enter product description here..."
        name="description"
        onChange={changeHandler}
        value={product && product.description}
      ></textarea>

      <div className="w-1/2">
        <button className="px-5 py-3 self-start text-blue-400 border border-blue-100 ">
          Edit product
        </button>
      </div>
    </form>
  );
};

export default Edit;
