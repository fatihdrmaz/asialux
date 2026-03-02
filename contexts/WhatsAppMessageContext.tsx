"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

const DEFAULT_MESSAGE = "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.";

type ContextValue = {
  message: string | null;
  setProductMessage: (productMessage: string | null) => void;
};

const WhatsAppMessageContext = createContext<ContextValue | null>(null);

export function WhatsAppMessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const setProductMessage = useCallback((productMessage: string | null) => {
    setMessage(productMessage);
  }, []);
  return (
    <WhatsAppMessageContext.Provider value={{ message, setProductMessage }}>
      {children}
    </WhatsAppMessageContext.Provider>
  );
}

export function useWhatsAppMessage() {
  const ctx = useContext(WhatsAppMessageContext);
  return ctx;
}

export { DEFAULT_MESSAGE };
