import { useToast } from '@chakra-ui/react';
type ToastStatus = 'info' | 'warning' | 'success' | 'error' | 'loading';

const useToastMessage = () => {
  const toast = useToast();

  const showToast = (message: string, status: ToastStatus = 'info') => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  return showToast;
};

export default useToastMessage;
