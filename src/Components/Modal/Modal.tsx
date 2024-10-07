import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { MODAL_SIZES } from '../../Utils/contants';
import './Modal.css';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave?: (data: any) => void;
  isSubmitting?: boolean;
  form?: string;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  isSubmitting,
  form
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={MODAL_SIZES}>
      <ModalOverlay />
      <ModalContent className='mcontent'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{overflow: 'auto'}}>
          {children}
        </ModalBody>
        <ModalFooter>
          {form && <Button colorScheme="blue" mr={3} isLoading={isSubmitting} form={form} type="submit">
            Save
          </Button>}
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommonModal;
