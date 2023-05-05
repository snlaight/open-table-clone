'use client';

import { createContext, FC, useState, useCallback, useMemo } from 'react';

import { AlertProps } from '@/components/Alert/alert.types';

export type TAlertContext = {
  alerts: AlertProps[];
  handleAlert: (arg0: AlertProps) => void;
};

type Props = {
    children: React.ReactNode;
}

export const AlertContext = createContext<Partial<TAlertContext>>({});

export const AlertProvider: FC<Props> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const handleAlert = useCallback((alert: AlertProps) => {
    setAlerts((prev) => [...prev, alert]);
    setTimeout(() => {
      setAlerts((prev) => prev.slice(1));
    }, 5000);
  }, []);

  const memoizedAlerts = useMemo(() => ({ handleAlert, alerts }), [
    alerts,
    handleAlert,
  ]);

  return (
    <AlertContext.Provider value={memoizedAlerts}>
      {children}
    </AlertContext.Provider>
  );
};
