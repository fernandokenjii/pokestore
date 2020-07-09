import React from 'react';
import { FiX } from 'react-icons/fi';

import formatValue from '../../utils/formatValue';

import {
  Container,
  Sidebar,
  SidebarHeader,
  ItemsContainer,
  Subtotal,
  Actions,
} from './styles';

interface IPokemon {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

interface IModalProps {
  cart: IPokemon[];
  isOpen: boolean;
  setIsOpen: () => void;
  handlePurchase: () => void;
}

const Cart: React.FC<IModalProps> = ({
  cart,
  isOpen,
  setIsOpen,
  handlePurchase,
}) => {
  function handleFinishButton(): void {
    if (cart.length === 0) {
      alert('You must buy at least 1 pokémon');
    } else {
      handlePurchase();
    }
    setIsOpen();
  }

  function totalValue(): string {
    const total = cart.reduce(
      (acc, current) => acc + Number(current.price) * current.quantity,
      0,
    );

    return formatValue(total);
  }

  return (
    <>
      {isOpen && (
        <>
          <Container onClick={setIsOpen} />
          <Sidebar onClick={(e) => e.preventDefault()}>
            <SidebarHeader>
              <h3>
                <button type="button" onClick={setIsOpen}>
                  <FiX size={25} />
                </button>
                Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h3>
            </SidebarHeader>

            <ItemsContainer>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div>
                      <h4>{item.name}</h4>
                      <h5>R$ {item.price}</h5>
                      <p>Quantidade: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ItemsContainer>

            <Subtotal>
              SUBTOTAL:
              <span>{totalValue()}</span>
            </Subtotal>

            <Actions>
              <button type="button" onClick={handleFinishButton}>
                Finish
              </button>
            </Actions>
          </Sidebar>
        </>
      )}
    </>
  );
};

export default Cart;
