import React from "react";

const User = () => {
  return (
    <div className="flex space-x-4 px-8 py-7 hover:bg-slate-600 duration-300 cursor-pointer">
      <div className="avatar avatar-online">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"/>
        </div>
      </div>
      <div>
        <h1 className="font-bold">Ankit Pathak</h1>
        <span>Ankit@gmail.com</span>
      </div>
    </div>
  );
};

export default User;
