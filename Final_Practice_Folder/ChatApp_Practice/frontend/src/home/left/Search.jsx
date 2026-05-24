import React from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="px-6 py-4">
      <form action="">
        <div className="flex space-x-3">
          <label className="input border-[1px] border-gray-700 bg-slate-900 rounded-b-lg w-[80%]">
            <input type="search" className="grow outline-none bg-slate-900" placeholder="Search" />
          </label>
          <button>
            <IoSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300"/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
