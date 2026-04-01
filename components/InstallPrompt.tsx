"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isIOSSafari, setIsIOSSafari] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (sessionStorage.getItem("pwa-dismissed")) return;

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (ios) {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      setIsIOS(true);
      setIsIOSSafari(isSafari);
      setTimeout(() => setShow(true), 3000);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    sessionStorage.setItem("pwa-dismissed", "1");
    setShow(false);
    setDismissed(true);
  }

  async function install() {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setShow(false);
    else dismiss();
  }

  if (!show || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
      <div className="bg-cyan-500 rounded-2xl shadow-2xl p-4 text-white">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/icons/icon-192.png"
              alt="SamuiKids"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">Add SamuiKids to your home screen</p>
            {isIOS ? (
              isIOSSafari ? (
                <p className="text-xs text-white/80 mt-0.5">
                  Tap <strong>Share</strong> then <strong>Add to Home Screen</strong>
                </p>
              ) : (
                <p className="text-xs text-white/80 mt-0.5">
                  Open this page in <strong>Safari</strong> to install the app
                </p>
              )
            ) : (
              <p className="text-xs text-white/80 mt-0.5">
                Quick access to drop-off activities on Koh Samui
              </p>
            )}
          </div>
          <button onClick={dismiss} className="text-white/60 hover:text-white text-lg leading-none">
            ✕
          </button>
        </div>
        {!isIOS && (
          <button
            onClick={install}
            className="mt-3 w-full bg-white text-cyan-600 font-bold py-2 rounded-xl text-sm hover:opacity-90 transition-colors"
          >
            Install App
          </button>
        )}
      </div>
    </div>
  );
}
