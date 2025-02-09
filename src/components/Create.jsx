import React, { useContext, useState } from "react";
import { productContext } from "../utils/context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(productContext);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Each and every input must have at least 4 characters");
      return;
    }
    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify(products));
    console.log(product);
    navigate("/");
  };
  return (
    <form
      onSubmit={addProductHandler}
      className=" p-[5%] w-screen h-screen  flex flex-col items-center "
    >
      <h1 className="text-2xl w-1/2 mb-5 ">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-100 mb-3 rounded p-3 w-1/2 "
        onChange={(e) => {
          setimage(e.target.value);
        }}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-xl bg-zinc-100 mb-3 rounded p-3 w-1/2 "
        onChange={(e) => {
          settitle(e.target.value);
        }}
        value={title}
      />
      <div className="w-1/2  flex justify-between ">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-100 mb-3 rounded p-3 w-[48%]"
          onChange={(e) => {
            setcategory(e.target.value);
          }}
          value={category}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-xl bg-zinc-100 mb-3 rounded p-3 w-[48%] "
          onChange={(e) => {
            setprice(e.target.value);
          }}
          value={price}
        />
      </div>
      <textarea
        className="text-xl bg-zinc-100 mb-3 rounded p-3 w-1/2 "
        rows="10"
        placeholder="enter product description here..."
        onChange={(e) => {
          setdescription(e.target.value);
        }}
        value={description}
      ></textarea>

      <div className="w-1/2">
        <button className="px-5 py-3 self-start text-blue-400 border border-blue-100 ">
          Add new product
        </button>
      </div>
    </form>
  );
};

export default Create;
