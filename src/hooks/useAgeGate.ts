import { useState, useEffect } from "react";

const AGE_GATE_KEY = "roots-age-verified";

export function useAgeGate() {
  const [verified, setVerified] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AGE_GATE_KEY);
    if (stored === "true") setVerified(true);
    setLoaded(true);
  }, []);

  const confirm = () => {
    localStorage.setItem(AGE_GATE_KEY, "true");
    setVerified(true);
  };

  const deny = () => {
    window.location.href = "https://www.google.com";
  };

  return { verified, loaded, confirm, deny };
}
