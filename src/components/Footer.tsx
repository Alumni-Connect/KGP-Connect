export default function Footer() {
  return (
    <footer className="bg-[#fd7e14] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address */}
          <div>
            <h3 className="font-bold text-lg">Address</h3>
            <p>ROOM NO. MZ-122, HAUZ KHAS, New Delhi, 110016, India</p>
          </div>

          {/* Phone */}
          <div>
            <h3 className="font-bold text-lg">Phone</h3>
            <p>+91-730 308 3005 (O)</p>
          </div>

          {/* Email */}
          <div>
            <h3 className="font-bold text-lg">Email</h3>
            <p>alumniaffairs@admin.iitd.ac.in</p>
            <p>ankitas.endowment@alumni.iitd.ac.in</p>
            <p>accounts.endowment@alumni.iitd.ac.in</p>
          </div>
        </div>
      </div>

      {/* Secondary section */}
      <div className="bg-white text-black mt-6 p-6 border-2 rounded-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-lg">USEFUL LINK</h3>
            <ul>
              <li>Endowment Fund</li>
              <li>Initiatives for Alumni</li>
              <li>Alumni ID (contact AA)</li>
              <li>Institute Facilities</li>
              <li>Alumni No-Dues</li>
              <li>Privacy policy</li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-lg">NAVIGATION</h3>
            <ul>
              <li>Home</li>
              <li>News & Updates</li>
              <li>Reunions</li>
              <li>Community events</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-lg">CONTACT US</h3>
            <p>ROOM NO. MZ-122, HAUZ KHAS, New Delhi, 110016, India</p>
            <p>+91-11-2654 8551 ,52</p>
            <p>+91-730 308 3005</p>
            <p>alumniaffairs@admin.iitd.ac.in</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-6 mt-4">
          <span>📺</span>
          <span>🔗</span>
          <span>📘</span>
        </div>

        <p className="text-center mt-6">
          ©Copyright 2023, ALUMNI RELATIONS, IIT KGP
        </p>
        <p className="text-center">
          Developed & Maintained by:{" "}
          <span className="font-bold">TSG IIT KGP</span>
        </p>
      </div>
    </footer>
  );
}
