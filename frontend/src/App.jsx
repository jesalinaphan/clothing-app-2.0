import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PhotoUpload from './components/Upload/PhotoUpload'

function App() {
  const [currentView, setCurrentView] = useState('home');

  const showUpload = () => setCurrentView('upload');
  const showHome = () => setCurrentView('home');

  return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100">
          <div className='container mx-auto p-4 py-8'>
            <div className='max-w-4xl mx-auto'>
              <header className='text-center mb-12'>
                <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              Welcome to Your Closet
            </h1>
            <p className='text-lg text-gray-600'>
              Your digital wardrobe assistant
            </p>
          </header>

        {currentView === 'home' && (
          <div className='bg-white rounded-xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              Get Started
            </h2>
            {/* grid of images */}
            <div className='grid md:grid-cols-3 gap-6'>
              {/* FEATURE CARD 1 */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-4">📸</div>  {/* Big emoji */}
                <h3 className="font-semibold text-gray-800 mb-2">Upload Photos</h3>
                <p className="text-gray-600 text-sm">
                  Add photos of your clothes with automatic background removal
                </p>
              </div>
              
              {/* FEATURE CARD 2 */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-4">🏷️</div>
                <h3 className="font-semibold text-gray-800 mb-2">Smart Tagging</h3>
                <p className="text-gray-600 text-sm">
                  AI automatically detects colors, types, and seasons
                </p>
              </div>
              
              {/* FEATURE CARD 3 */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-4">🧳</div>
                <h3 className="font-semibold text-gray-800 mb-2">Plan Outfits</h3>
                <p className="text-gray-600 text-sm">
                  Create luggage sets and plan outfits for any occasion
                </p>
              </div>
            </div>
            {/* buttons */}
            <div className='mt-8 flex justify-center space-x-4'>
              <button onClick={showUpload} className='btn-primary'>
                Get Started
              </button>
            </div>
          </div>
        )}
          {currentView === 'upload' && <PhotoUpload />}
        </div>
      </div> 
    </div>
  );
}

export default App
