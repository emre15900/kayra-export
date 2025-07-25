import Link from 'next/link';

interface FooterProps {
  baseUrl?: string;
}

export function Footer({ baseUrl = 'http://localhost:3000' }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MicroStore</h3>
            <p className="text-gray-400">Modern e-commerce with micro-frontend architecture</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href={`${baseUrl}/products`} className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href={`${baseUrl}/products`} className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link href={`${baseUrl}/products`} className="hover:text-white transition-colors">Home & Kitchen</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href={`${baseUrl}/help`} className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href={`${baseUrl}/contact`} className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href={`${baseUrl}/returns`} className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href={`${baseUrl}/about`} className="hover:text-white transition-colors">About</Link></li>
              <li><Link href={`${baseUrl}/careers`} className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href={`${baseUrl}/privacy`} className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MicroStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 