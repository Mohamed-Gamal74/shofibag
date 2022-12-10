import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-4  text-center ">
      <p className="mb-2">
        © 2022 <span className="mainColor w__700"> Shofibag. </span> All Rights
        Reserved.
      </p>

      <div className="d-flex justify-content-center align-items-center">
        <a href="https://www.facebook.com/me.do.746" target='_blank'>
          <FaFacebookF className="mx-2 " />
        </a>

        <a href="https://twitter.com/Gemmmyy_" target='_blank'>
          <FaInstagram className="mx-2" />
        </a>

        <a href="https://www.instagram.com/_mohamedddgamal/" target='_blank' >
          <FaTwitter className="mx-2" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
