import { Footer as FbFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FbFooter container className="absolute bottom-0 bg-pink-800">
      <div className="flex w-full justify-center">
        <FbFooter.Copyright
          href="#"
          by="Noa Erez"
          year={2025}
          className="text-slate-100"
        />
      </div>
    </FbFooter>
  );
};

export default Footer;
