import React from "react";
import Home from "./components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/create";
import Edit from "./components/Edit";

const App = () => {
  const { search, pathname } = useLocation();

  return (
    <div className="h-screen w-screen flex p-4 ">
      {(pathname != "/" || search.length > 0) && (
        <Link to="/" className="text-red-600 absolute left-[18%] top-[3%]">
          Home
        </Link>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
