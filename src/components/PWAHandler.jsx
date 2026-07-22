import React, { useEffect, useState } from 'react';

export default function PWAHandler() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Force reset for debugging via URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug_pwa') === 'true') {
      localStorage.removeItem('pwa_dismissed_until');
      localStorage.removeItem('pwa_installed');
    }

    // 2. Check if already dismissed or installed
    const dismissedUntil = localStorage.getItem('pwa_dismissed_until');
    const isInstalled = localStorage.getItem('pwa_installed') === 'true';
    
    if (isInstalled) {
      setIsDismissed(true);
    } else if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      setIsDismissed(true);
    } else {
      setIsDismissed(false);
    }

    // 3. Register Service Worker for legacy client
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Legacy client SW registered:', reg.scope))
        .catch((err) => console.error('Legacy client SW registration failed:', err));
    }

    // 4. Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired inside legacy client!');
      e.preventDefault();
      setDeferredPrompt(e);
      
      if (!isDismissed && !isInstalled) {
        setShowBanner(true);
      }
    };

    // 5. Listen for successful installation
    const handleAppInstalled = () => {
      console.log('Legacy client app successfully installed!');
      localStorage.setItem('pwa_installed', 'true');
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isDismissed]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Legacy PWA install outcome: ${outcome}`);
    
    if (outcome === 'accepted') {
      localStorage.setItem('pwa_installed', 'true');
    }
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismissClick = () => {
    const nextShowTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('pwa_dismissed_until', nextShowTime.toString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-[9999] bg-[#0284c7] backdrop-blur-md border-t border-sky-400/20 shadow-2xl py-3.5 px-6 flex flex-row items-center justify-between gap-4 transition-all duration-500 ease-out transform translate-y-0">
      {/* Left Column: Icon + Text Block */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-inner">
          <img src="/logo.png" alt="Shimpi Bandhan" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="font-extrabold text-sm text-white tracking-tight leading-tight">Install Shimpi Bandhan App</h3>
          <p className="text-[11px] text-sky-100 font-medium opacity-90 leading-tight mt-0.5">
            For a better experience and offline access
          </p>
        </div>
      </div>

      {/* Right Column: Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={handleDismissClick}
          className="px-4 py-2 border border-white/20 rounded-xl text-xs font-black text-white hover:bg-white/10 transition-colors"
        >
          Not Now
        </button>
        
        <button 
          onClick={handleInstallClick}
          className="px-6 py-2 bg-white text-sky-700 hover:bg-sky-50 rounded-xl text-xs font-black shadow-md transition-all"
        >
          Install
        </button>
      </div>
    </div>
  );
}
