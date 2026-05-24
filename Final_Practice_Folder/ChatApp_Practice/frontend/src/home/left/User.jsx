import React from "react";

const User = () => {
  return (
    <div className="flex space-x-4 px-6 py-7 hover:bg-slate-600 duration-300 cursor-pointer">
      <div class="avatar avatar-online">
        <div class="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"/>
        </div>
      </div>
      <div className="">
        <h1>Ankit Pathak</h1>
        <span>Ankit@gmail.com</span>
      </div>
    </div>
  );
};

export default User;
