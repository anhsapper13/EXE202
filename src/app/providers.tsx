'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Layout from '@/components/layout/Layout';
import AuthGuard from '@/components/auth/AuthGuard';


interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
        <AuthGuard>
            <Layout>
              {children}
            </Layout>
        </AuthGuard>
    </Provider>
  );
};

export default Providers;