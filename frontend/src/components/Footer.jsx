import React from "react";
import {
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
  LogoTwitter,
} from "react-ionicons";

const Footer = () => {
  return (
    <div className="h-[300px] bg-gray-900 p-4 flex flex-col">
      <div className="p-3">
        <h1 className="text-2xl text-lime-800 font-bold">GigConnect</h1>
      </div>
      <div className="p-3">
        <h1 className="text-lg font-medium text-gray-400">
          Connect with skilled Professionals
          <br />
          Worldwide.
        </h1>
      </div>
      <div className="flex flex-row gap-2">
        <a href="https://x.com" target="_blank">
          <div className="p-3 rounded-full hover:bg-white cursor-pointer">
            <LogoTwitter width="25px" height="25px" color="#3A5B22" />
          </div>
        </a>
        <a href="https://facebook.com" target="_blank">
          <div className="p-3 rounded-full hover:bg-white cursor-pointer">
            <LogoFacebook width="25px" height="25px" color="#3A5B22" />
          </div>
        </a>
        <a href="https://github.com/Laxman2546" target="_blank">
          <div className="p-3 rounded-full hover:bg-white cursor-pointer">
            <LogoGithub width="25px" height="25px" color="#3A5B22" />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/lakshman-25L46" target="_blank">
          <div className="p-3 rounded-full hover:bg-white cursor-pointer">
            <LogoLinkedin width="25px" height="25px" color="#3A5B22" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
