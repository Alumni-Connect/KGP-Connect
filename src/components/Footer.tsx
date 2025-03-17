import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#fd7e14] text-white px-10 py-3">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Section */}

          {/* Useful Links */}
          <div className="bg-white p-6 px-8 rounded-2xl  text-gray-800">
            <h3 className="font-bold text-xl text-[#fd7e14]">Useful Links</h3>
            <div className="flex justify-between items-center">
              <ul className="mt-4 space-y-2 text-indigo-600">
                {[
                  {
                    title: "Apna IIT KGP",
                    link: "http://apna.iitkgp.ac.in/web/",
                  },
                  {
                    title: "BIS Corner",
                    link: "https://www.iitkgp.ac.in/bis-corner",
                  },
                  { title: "TSG", link: "https://gymkhana.iitkgp.ac.in/" },
                  {
                    title: "Student Alumni Cell",
                    link: "https://sac.iitkgp.ac.in/",
                  },
                  { title: "ERP", link: "https://erp.iitkgp.ac.in/" },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-600 transition-all cursor-pointer "
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 space-y-2 text-indigo-600">
                {[
                  {
                    title: "Communication Directory",
                    link: "https://www.iitkgp.ac.in/assets/pdf/comdir.pdf",
                  },
                  {
                    title: "Prime Minister's Research Fellowship (PMRF)",
                    link: "http://pmrf.in/",
                  },
                  {
                    title: "Fee Payment (passed-out students)",
                    link: "http://erp.iitkgp.ac.in/SupplierFacilities/feePaymentPageView.htm",
                  },
                  {
                    title: "Degree Verification",
                    link: "http://erp.iitkgp.ac.in/DupCertReqPortal/auth/welcome.htm",
                  },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-600 transition-all cursor-pointer"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-white p-4 rounded-2xl  text-gray-800 flex flex-col space-y-4">
              <h3 className="font-bold text-xl text-[#fd7e14]">Contact Us</h3>
              <div className="flex items-center space-x-3">
                <Phone className="text-green-600" size={22} />
                <a
                  href="tel:3222281860"
                  className="text-indigo-500 hover:text-indigo-600 font-medium cursor-pointer"
                >
                  3222-281860
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-red-600" size={22} />
                <a
                  href="mailto:aao@hijli.iitkgp.ac.in"
                  className="text-indigo-500 hover:text-indigo-600 font-medium cursor-pointer"
                >
                  aao@hijli.iitkgp.ac.in
                </a>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3691.0342607165635!2d87.309068!3d22.314544!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d4522a211b131%3A0xa841704d3326681b!2sAlumni%20Affairs%20%26%20International%20Relations!5e0!3m2!1sen!2sin!4v1742209446317!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="rounded-lg"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center  border-t border-white/20 pt-4 bg-indigo-600 text-white pb-2">
        <p className="text-sm">© 2024 ALUMNI RELATIONS, IIT KGP</p>
        <p className="text-sm">
          Developed & Maintained by:{" "}
          <span className="font-bold text-white">TSG IIT KGP</span>
        </p>
      </div>
    </footer>
  );
}
