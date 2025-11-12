const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-lg font-semibold mb-4">GrowVest</h3>
            <p className="text-gray-300">
              Empowering small businesses with micro-lending and savings solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
                <br></br>
                <a href="/apply-loan" className="text-gray-300 hover:text-white">
                  Apply for Loan
                </a>
                <br></br>
                <a href="/savings" className="text-gray-300 hover:text-white">
                  Savings
                </a>
              
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">
              Email: support@growvest.com<br />
              Email: ianwachira90@gmail.com<br />
              Phone: +254 724450377
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 GrowVest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;