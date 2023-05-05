import React, { useEffect } from 'react';

type SignInFormValues = {
  email: string;
  password: string;
}

type TSignInProps = {
  setDisabled: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fields: Partial<SignInFormValues>;

}

const SignIn: React.FC<TSignInProps> = ({ setDisabled, handleChange, fields }) => {
  useEffect(
    () => {
      const isFormValid = Object.values(fields).every((field) => Boolean(field));
      setDisabled(!isFormValid);
    },
    [fields],
  );

  return (
    <div className='flex-col justify-between my-3 space-y-2 text-sm'>
      <input type='text' placeholder='Email' className='p-2 py-3 w-full rounded border' value={fields.email} name='email' onChange={handleChange} />
      <input type='password' placeholder='Password' className='p-2 py-3 w-full rounded border' value={fields.password} name='password' onChange={handleChange} />
    </div>

  );
};

export default SignIn;
