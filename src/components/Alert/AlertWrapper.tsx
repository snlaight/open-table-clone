import React, { FC } from 'react';

import { Alert } from '@/components';
import { AlertListProps } from './alert.types';

const AlertWrapper: FC<AlertListProps> = ({
  alerts,
}) => (
  <div className='fixed top-15 right-10 min-w-[300px] z-10 flex-col place-items-center justify-center'>
    {React.Children.toArray(alerts.map((alert) => (
      <Alert type={alert.type} message={alert.message} />
    )))}
  </div>
);

export default AlertWrapper;
