/* eslint-disable consistent-return */
/* eslint-disable camelcase */

'use client';

import { useContext } from 'react';

import { getCookie, deleteCookie } from 'cookies-next';
import { AuthContext } from '@/context/AuthContext';
import { post$1, authenticatedGet$1 } from '@/utils/lib/api';
import { useAlert } from '@/utils/hooks/useAlert';

import { LoginType, RegisterType } from '@/utils/interfaces';

const useAuth = () => {
  const { setAuthState } = useContext(AuthContext);
  const { handleAlert } = useAlert();

  const login = async ({ email, password }: LoginType) => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await post$1('/api/auth/signin', {
        email,
        password,
      });

      if (response.data) {
        setAuthState({
          data: response.data,
          loading: false,
          error: null,
        });
        handleAlert?.({
          type: 'success',
          message: 'You have successfully logged in!',
        });
        return response.data;
      }
    } catch (err: any) {
      setAuthState({
        data: null,
        loading: false,
        error: err.response.data,
      });
      handleAlert?.({
        type: 'error',
        message: err.response.data.message,
      });
    }
  };

  const register = async ({ email, password, first_name, last_name, phone, city }: RegisterType) => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await post$1('/api/auth/signup', {
        email,
        password,
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone,
        city,
      });
      if (response.data) {
        setAuthState({
          data: response.data,
          loading: false,
          error: null,
        });
        handleAlert?.({
          type: 'success',
          message: 'You have successfully registered!',
        });
        return response.data;
      }

      if (response.errors) {
        setAuthState({
          data: null,
          loading: false,
          error: response.errors,
        });

        console.log(response.errors);
        return response.errors;
      }
    } catch (err: any) {
      setAuthState({
        data: null,
        loading: false,
        error: err.response.data,
      });
      handleAlert?.({
        type: 'error',
        message: err.response.data.message,
      });
    }
  };

  const logout = () => {
    deleteCookie('jwt');
    setAuthState({
      data: null,
      loading: false,
      error: null,
    });
  };

  const getMe = async () => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const jwt = getCookie('jwt');
      if (!jwt) {
        return setAuthState({
          data: null,
          loading: false,
          error: null,
        });
      }

      const response = await authenticatedGet$1('/api/auth/me', jwt as string);

      if (response.data) {
        setAuthState({
          data: response.data,
          loading: false,
          error: null,
        });
      }
    } catch (err: any) {
      setAuthState({
        data: null,
        loading: false,
        error: err.response.data,
      });
    }
  };

  return {
    login,
    logout,
    register,
    getMe,
  };
};

export default useAuth;
