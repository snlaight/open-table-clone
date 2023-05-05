import { useState } from 'react';

interface T {
  [key: string]: string;
}

const useFormFields = (initialValues: T):[T, (e: React.ChangeEvent<HTMLInputElement>) => void, ()=> void] => {
  const [fields, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { target } = e;
    const { name, value } = target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFormFields = () => setValues(initialValues);

  return [fields, handleChange, resetFormFields];
};

export default useFormFields;
