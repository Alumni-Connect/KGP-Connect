export const Footer = () => (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: contact@kgpconnect.com</p>
            <p>Phone: +91 123 456 7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Rules & Guidelines</h3>
            <ul className="space-y-2">
              <li>Community Guidelines</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Our Sponsors</h3>
            <ul className="space-y-2">
              <li>KGP Alumni Association</li>
              <li>Tech Partners</li>
              <li>Industry Collaborators</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2025 KGP Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );