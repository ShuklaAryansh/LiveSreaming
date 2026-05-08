import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social Icons as raw SVG paths for zero-import reliability
  const SOCIAL_ICONS = [
    {
      name: "X",
      href: "#",
      path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298L17.607 20.65z",
    },
    {
      name: "GitHub",
      href: "#",
      path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    },
    {
      name: "LinkedIn",
      href: "#",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="md:col-span-1">
          <h2 className="text-white text-2xl font-bold mb-4 tracking-tight">
            ZegoCloud
          </h2>
          <p className="text-sm leading-relaxed mb-6">
            Leading the way in real-time engagement. High-quality SDKs for video, voice, and chat.
          </p>
          <div className="flex gap-5">
            {SOCIAL_ICONS.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className="hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label={social.name}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Product</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Video Call</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Voice Call</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Live Streaming</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Interactive Whiteboard</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Showcase</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Stay Updated</h3>
          <p className="text-xs mb-4">Get the latest SDK updates and news.</p>
          <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-transparent border-none outline-none px-3 py-2 text-sm w-full focus:ring-0"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-xs font-bold transition-colors">
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
        <p>© {currentYear} ZegoCloud. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;