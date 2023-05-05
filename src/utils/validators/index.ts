import validator from 'validator';

import { ValidationRules } from '@/utils/interfaces';

export const AuthValidationRules: ValidationRules = {
  email: {
    validator: validator.isEmail,
    message: 'Please enter a valid email address',
  },
  firstName: {
    validator: (value: string) => validator.isLength(value, { min: 1, max: 20 }),
    message: 'Please enter your first name',
  },
  lastName: {
    validator: (value: string) => validator.isLength(value, { min: 1, max: 20 }),
    message: 'Please enter your last name',
  },
  password: {
    validator: (value: string) => validator.isLength(value, { min: 8, max: 20 }),
    message: 'Please enter a valid password',
  },
  phoneNumber: {
    validator: (value: string) => validator.isMobilePhone(value),
    message: 'Please enter a valid phone number',
  },
  city: {
    validator: (value: string) => validator.isLength(value, { min: 1, max: 20 }),
    message: 'Please enter a valid city',
  },
  isStrongPassword: {
    validator: (value: string) => validator.isStrongPassword(value),
    message: 'Please enter a strong password',
  },
};

export const SignInValidationRules: ValidationRules = {
  email: {
    validator: validator.isEmail,
    message: 'Please enter a valid email address',
  },
  password: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid password.',
  },
};

export const FetchAvailabilityValidationRules: ValidationRules = {
  slug: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid slug.',
    required: true,
  },
  day: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid day.',
    required: true,
  },
  time: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid time.',
    required: true,
  },
  partySize: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid party size.',
    required: true,
  },
};

export const ReserveValidationRules: ValidationRules = {
  slug: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid slug.',
    required: true,
  },
  day: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid day.',
    required: true,
  },
  time: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid time.',
    required: true,
  },
  partySize: {
    validator: (value: string) => validator.isLength(value, { min: 1 }),
    message: 'Please enter a valid party size.',
    required: true,
  },
};
