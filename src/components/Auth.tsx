/* eslint-disable camelcase */

'use client';

import React, { useState, useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';
import { Modal, Loading } from '@/components';
import { SignInForm, SignUpForm } from '@/components/Forms';
import useAuth from '@/utils/hooks/useAuth';
import useFormFields from '@/utils/hooks/useFormFields';

type SignInFormValues = {
  email: string;
  password: string;
}
type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

const InitalSignInFormValues: SignInFormValues = {
  email: '',
  password: '',
};

const InitialSignUpFormValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  password: '',
};

const Auth = () => {
  const { loading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [fields, handleChange] = useFormFields(isSignin ? InitalSignInFormValues : InitialSignUpFormValues);
  const { login, register } = useAuth();

  const handleSignIn = async ({ email, password }: SignInFormValues) => {
    const response = await login({ email, password });
    if (response.user) {
      setIsModalOpen(false);
    }
  };

  const handleUserRegister = async ({ first_name, last_name, email, phone, city, password }: any) => {
    const response = await register({ first_name, last_name, email, phone, city, password });
    if (response?.user) {
      setIsModalOpen(false);
    }

    return response;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return isSignin ? handleSignIn({
      email: fields.email,
      password: fields.password,
    }) : handleUserRegister({
      first_name: fields.firstName,
      last_name: fields.lastName,
      email: fields.email,
      phone: fields.phone,
      city: fields.city,
      password: fields.password,
    });
  };

  const form = isSignin ? <SignInForm fields={fields} handleChange={handleChange} setDisabled={setIsDisabled} /> : <SignUpForm fields={fields} handleChange={handleChange} setDisabled={setIsDisabled} />;

  const ModalBodyMarkup = loading ? <Loading /> : form;

  const ModalFooterMarkup = (
    <>
      <button type='submit' disabled={isDisabled} className='p-3 mb-5 w-full text-sm text-white uppercase bg-red-600 rounded disabled:bg-gray-400 disabled:cursor-not-allowed'>
        Sign {isSignin ? 'In' : 'Up'}
      </button>
      <span className='flex gap-x-2 text-sm'>
        <p>
          {isSignin ? 'Don\'t have an account?' : 'Already have an account?'}
        </p>
        <button type='button' onClick={() => setIsSignin((prev) => !prev)} className='text-red-500 underline'>
          {isSignin ? 'Sign Up instead' : 'Sign In instead'}
        </button>
      </span>
    </>
  );

  const ModalMarkup = (
    <Modal
      headerText={isSignin ? 'Sign In' : 'Sign Up'}
      modalBody={ModalBodyMarkup}
      footerChildren={ModalFooterMarkup}
      handleClose={() => { setIsModalOpen(false); }}
    />
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {isModalOpen ? ModalMarkup : null}
        <div className='flex'>
          <button
            type='button'
            className='p-1 px-4 mr-3 text-white bg-blue-400 rounded border'
            onClick={() => {
              setIsModalOpen(true);
              setIsSignin(true);
            }}
          >Sign In
          </button>
          <button
            type='button'
            className='p-1 px-4 rounded border'
            onClick={() => {
              setIsModalOpen(true);
              setIsSignin(false);
            }}
          >Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
