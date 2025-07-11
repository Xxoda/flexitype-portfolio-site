import { LOGO_URL } from "@/constants";

const Footer = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 bg-flexitype-gray border-t border-flexitype-blue/20">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center mb-4 space-x-3">
          <img
            src={LOGO_URL}
            alt="Flexitype"
            className="w-6 h-6 object-contain"
          />
          <div className="font-satoshi font-bold text-lg text-flexitype-blue">
            Flexitype
          </div>
        </div>
        <p className="text-flexitype-black/60 font-inter">© Flexitype, 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
