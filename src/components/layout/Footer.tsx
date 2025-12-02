const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20">
      <div className="container mx-auto px-6 py-8 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} MaltaJobPro. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
