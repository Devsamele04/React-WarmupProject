import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { productContext } from "../utils/context";

const Navbar = () => {
  const [product] = useContext(productContext);

  let distinct_catagory =
    product && product.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_catagory = [...new Set(distinct_catagory)];

  const color = () => {
    return `rgba(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;
  };

  return (
    <nav className="w-[15%] h-full flex flex-col items-center pt-5 bg-zinc-100">
      <a
        className="px-5 py-3 text-blue-400 border cursor-pointer  border-blue-300 "
        href="/create"
      >
        Add new product
      </a>
      <hr className=" my-3 w-[80%]" />
      <h1 className="text-2xl  mb-3 w-[80%]">Category Filter</h1>
      <div className="w-[80%] ">
        {distinct_catagory.map((c, i) => {
          return (
            <Link
              key={i}
              to={`/?category=${c}`}
              className=" mb-3 flex items-center  "
            >
              <span
                style={{
                  backgroundColor: color(),
                }}
                className=" mr-2 bg-blue-200 h-[15px] w-[15px] rounded-full"
              ></span>
              {c}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
export default Navbar;
