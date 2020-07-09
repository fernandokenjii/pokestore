import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import Modal from '../Modal';

import { Message } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ThanksModal: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Message>
        <h1>Thank you!</h1>
        <p>
          Your recent purchase at <span>PokéStore</span> was successfull!
        </p>

        <FiCheckCircle size={100} color="#7CFC00" />

        <p>Gotta Catch &apos;Em All!</p>
      </Message>
    </Modal>
  );
};

export default ThanksModal;
