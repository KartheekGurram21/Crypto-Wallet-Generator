export default function Footer({ darkMode }) {
  return (
    <footer className={`${darkMode ? "bg-black text-white border-gray-800" : "bg-white text-gray-900 border-gray-200"} w-full px-4 sm:px-6 lg:px-8 py-6 border-t mt-auto`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
            CryptoWallet Generator - Secure, Fast, and Reliable
          </p>
          <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} text-xs`}>
            Generate secure cryptocurrency wallets with industry-standard encryption. 
            Keep your private keys safe and never share them with anyone.
          </p>
          <p className={`${darkMode ? "text-gray-600" : "text-gray-400"} text-xs`}>
            © 2024 CryptoWallet Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
