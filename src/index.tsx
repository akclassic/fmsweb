import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './i18n';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </I18nextProvider>
  // </React.StrictMode>
);
