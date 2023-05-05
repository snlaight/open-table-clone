/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';

import { AlertProps } from './alert.types';

const AlertStyles = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  default: 'bg-gray-100 text-gray-800',
};

const Alert: FC<AlertProps> = ({
  type,
  message,
}) => (
  <div className={`px-3 py-2 mt-2 rounded shadow-md transition-all text-shadow ${AlertStyles[type as keyof typeof AlertStyles]}`}>
    {message}
  </div>
);

export default Alert;
