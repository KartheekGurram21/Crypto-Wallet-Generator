export function Footer({ darkMode, onToggleDarkMode }) {
  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            CryptoWallet Generator - Secure, Fast, and Reliable
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Generate secure cryptocurrency wallets with industry-standard encryption. 
            Keep your private keys safe and never share them with anyone.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2024 CryptoWallet Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}