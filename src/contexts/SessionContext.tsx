import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export type SaleSession = {
  id: number;
  cashierCode: string;
  startTime: string;
  finalCashAmount?: number;
};

interface SessionContextType {
  session: SaleSession | null;
  refreshSession: (employeeCode: string) => Promise<void>;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SaleSession | null>(null);

  const refreshSession = async (employeeCode: string) => {
    const response = await api.get('/salesession/active');
    const activeSession = response.data.find((s: any) => s.cashierCode === employeeCode);
    if (activeSession) setSession(activeSession);
    else setSession(null);
  };

  const clearSession = () => {
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, refreshSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used inside SessionProvider');
  return context;
};
