import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

import { Container, Logo, Menu } from './styles';

import logoImg from '../../assets/pokemon.svg';

interface IHeaderProps {
  openCart: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openCart }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function resize(): void {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <Container>
      <Logo screenWidth={width}>
        <img src={logoImg} alt="PokéStore" />
        <span>PokéStore</span>
      </Logo>
      <Menu>
        <input type="text" placeholder="Search pokemon" />
        <button type="button" onClick={openCart}>
          <FiShoppingCart size={30} color="#434A54" />
        </button>
      </Menu>
    </Container>
  );
};

export default Header;
