import { NextApiRequest } from 'next';

export const validateRequestBody = (req: NextApiRequest, validationRules: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};
  Object.entries(req.body).forEach(([key, value]) => {
    const rule = validationRules[key];
    if (!rule || !rule.validator(value as string)) {
      errors[key] = rule?.message || `Invalid ${key}`;
    }
  });
  return errors;
};

export const validateRequestQuery = (req: NextApiRequest, validationRules: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  // check if all the required query params are present
  const requiredQueryParams = Object.keys(validationRules).filter((key) => validationRules[key].required);

  if (requiredQueryParams.length > 0) {
    requiredQueryParams.forEach((param) => {
      if (!req.query[param]) {
        errors[param] = `Missing ${param}`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return errors;
    }
  }

  Object.entries(req.query).forEach(([key, value]) => {
    const rule = validationRules[key];
    if (!rule || !rule.validator(value as string)) {
      errors[key] = rule?.message || `Invalid ${key}`;
    }
  });
  return errors;
};
