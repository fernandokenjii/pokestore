import React, { useState, AllHTMLAttributes } from 'react';

import { FiPlus, FiMinus } from 'react-icons/fi';

import { Container } from './styles';
import formatValue from '../../utils/formatValue';

interface IPokemon {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  pokemon: IPokemon;

  handleAddPokemonToCart: (pokemon: IPokemon) => void;
}

const Pokemon: React.FC<IProps> = ({
  pokemon,
  handleAddPokemonToCart,
}: IProps) => {
  const [quantity, setQuantity] = useState(0);

  async function handleAddToCart(): Promise<void> {
    if (quantity > 0) {
      handleAddPokemonToCart({ ...pokemon, quantity });
      setQuantity(0);
    } else {
      alert('Quantity must be greater than 1');
    }
  }

  function decrementQuantity(): void {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <Container>
      <div className="header">
        <header>
          <img src={pokemon.image} alt={pokemon.name} />
        </header>
        <section className="body">
          <h2>{pokemon.name}</h2>
          <p>{pokemon.description}</p>
          <p className="price">
            R$ <b>{formatValue(pokemon.price).slice(3)}</b>
          </p>
        </section>
      </div>
      <section className="footer">
        <div className="quantity-container">
          <button
            type="button"
            className="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <FiPlus size={20} />
          </button>

          <input
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            type="number"
            min="0"
          />

          <button
            type="button"
            className="icon"
            onClick={() => decrementQuantity()}
          >
            <FiMinus size={20} />
          </button>
        </div>

        <div className="buy-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleAddToCart()}
          >
            Buy
          </button>
        </div>
      </section>
    </Container>
  );
};

export default Pokemon;
