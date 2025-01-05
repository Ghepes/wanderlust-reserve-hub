import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-booking-secondary text-white mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>About Booking.com</li>
              <li>Careers</li>
              <li>Press Center</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>Customer Service</li>
              <li>Partner Help</li>
              <li>Sustainability</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Support</li>
              <li>Affiliate Program</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p>&copy; 2024 Booking.com™. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;