import React, { useEffect } from 'react';

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

type TSignUpProps = {
  setDisabled: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fields: Partial<SignUpFormValues>;
}

const SignUp: React.FC<TSignUpProps> = ({ setDisabled, handleChange, fields }) => {
  useEffect(
    () => {
      const isFormValid = Object.values(fields).every((field) => Boolean(field));
      setDisabled(!isFormValid);
    },
    [fields],
  );
  return (
    <>
      <div className='flex justify-between my-3 text-sm'>
        <input type='text' placeholder='First Name' className='border rounded p-2 py-3 w-[49%]' value={fields.firstName} name='firstName' onChange={handleChange} />
        <input type='text' placeholder='Last Name' className='border rounded p-2 py-3 w-[49%]' value={fields.lastName} name='lastName' onChange={handleChange} />
      </div>
      <div className='flex justify-between my-3 text-sm'>
        <input type='text' placeholder='Email' className='p-2 py-3 w-full rounded border' value={fields.email} name='email' onChange={handleChange} />
      </div>
      <div className='flex justify-between my-3 text-sm'>
        <input type='text' placeholder='Phone' className='border rounded p-2 py-3 w-[49%]' value={fields.phone} name='phone' onChange={handleChange} />
        <input type='text' placeholder='City' className='border rounded p-2 py-3 w-[49%]' value={fields.city} name='city' onChange={handleChange} />
      </div>
      <div className='flex justify-between my-3 text-sm'>
        <input type='password' placeholder='Password' className='p-2 py-3 w-full rounded border' value={fields.password} name='password' onChange={handleChange} />
      </div>
    </>
  );
};

export default SignUp;
