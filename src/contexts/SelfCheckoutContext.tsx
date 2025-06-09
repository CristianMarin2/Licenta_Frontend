import { createContext, useContext, useState } from 'react';

interface SelfCheckoutContextType {
  isSelfCheckout: boolean;
  isCashierOverride: boolean;
  setCashierOverride: (override: boolean) => void;
}

const SelfCheckoutContext = createContext<SelfCheckoutContextType>({
  isSelfCheckout: false,
  isCashierOverride: false,
  setCashierOverride: () => {}
});

export const SelfCheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const isSelfCheckout = window.location.pathname.startsWith('/self');
  const [isCashierOverride, setCashierOverride] = useState(false);

  return (
    <SelfCheckoutContext.Provider value={{ isSelfCheckout, isCashierOverride, setCashierOverride }}>
      {children}
    </SelfCheckoutContext.Provider>
  );
};

export const useSelfCheckout = () => useContext(SelfCheckoutContext);
