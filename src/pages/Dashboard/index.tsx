import React, { useEffect, useState, useRef, useCallback } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';
import Pokemon from '../../components/Pokemon';
import ThanksModal from '../../components/ThanksModal';
import Cart from '../../components/Cart';
import loadingGif from '../../assets/loading.gif';

import { PokemonsContainer } from './styles';

interface IPokemonTypes {
  type: {
    name: string;
  };
}

interface IRawPokemon {
  data: {
    order: number;
    name: string;
    sprites: { front_default: string };
    weight: number;
    types: IPokemonTypes[];
  };
}

interface IPokemonAPI {
  name: string;
  url: string;
}

interface IPokemon {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

const Dashboard: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [thanksModal, setThanksModal] = useState(false);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const [loading, setLoading] = useState(true);
  const [nextRequest, setNextRequest] = useState(
    '/pokemon/?offset=20&limit=20',
  );

  const [cart, setCart] = useState<IPokemon[]>(() => {
    const pokemonsInCart = localStorage.getItem('@PokeStore:pokemons');

    if (pokemonsInCart) {
      return JSON.parse(pokemonsInCart);
    }
    return [];
  });

  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('@PokeStore:pokemons', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setLoading(true);

    api.get('/pokemon').then(async (response) => {
      setNextRequest(response.data.next);

      const pokemonsRequests = response.data.results.map(
        (pokemon: IPokemonAPI) => api.get(pokemon.url),
      );

      const rawPokemons: IRawPokemon[] = await Promise.all(pokemonsRequests);

      setPokemons((prevPokemons) => {
        const fetchedPokemons: IPokemon[] = rawPokemons.map((rawPokemon) => ({
          id: rawPokemon.data.order,
          name: rawPokemon.data.name,
          image: rawPokemon.data.sprites.front_default,
          price: rawPokemon.data.weight,
          quantity: 0,
          description: rawPokemon.data.types
            .map((type) => type.type.name.toUpperCase())
            .join(', '),
        }));

        return [...prevPokemons, ...fetchedPokemons];
      });
    });
    setLoading(false);
  }, []);

  const loadMorePokemons = useCallback(async () => {
    if (loading && nextRequest) return;

    try {
      setLoading(true);
      const response = await api.get(nextRequest);

      setNextRequest(response.data.next);

      const pokemonsRequests = response.data.results.map(
        (pokemon: IPokemonAPI) => api.get(pokemon.url),
      );

      const rawPokemons: IRawPokemon[] = await Promise.all(pokemonsRequests);

      setPokemons((prevPokemons) => {
        const fetchedPokemons: IPokemon[] = rawPokemons.map((rawPokemon) => ({
          id: rawPokemon.data.order,
          name: rawPokemon.data.name,
          image: rawPokemon.data.sprites.front_default,
          price: rawPokemon.data.weight,
          quantity: 0,
          description: rawPokemon.data.types
            .map((type) => type.type.name.toUpperCase())
            .join(', '),
        }));

        return [...prevPokemons, ...fetchedPokemons];
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [loading, nextRequest]);

  useEffect(() => {
    if (!nextRequest) {
      alert('End of list');
      return;
    }
    if (loading) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && nextRequest) {
          await loadMorePokemons();
        }
      },
      {
        rootMargin: '400px',
        threshold: 0,
      },
    );

    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [loader, loading, loadMorePokemons, nextRequest]);

  async function handleAddPokemonToCart(pokemon: IPokemon): Promise<void> {
    const pokemonInCart = cart.findIndex((item) => item.id === pokemon.id);

    if (pokemonInCart === -1) {
      setCart([...cart, pokemon]);
    } else {
      const cartPokemons = cart.map((item) =>
        item.id !== pokemon.id
          ? item
          : { ...item, quantity: item.quantity + pokemon.quantity },
      );
      setCart(cartPokemons);
    }
    setCartOpen(true);
  }

  function handlePurchase(): void {
    setCart([]);
    setThanksModal(true);
  }

  function toggleCart(): void {
    setCartOpen(!cartOpen);
  }

  function toggleThanksModal(): void {
    setThanksModal(!thanksModal);
  }

  return (
    <>
      <Header openCart={toggleCart} />
      <Cart
        cart={cart}
        isOpen={cartOpen}
        setIsOpen={toggleCart}
        handlePurchase={handlePurchase}
      />
      <ThanksModal isOpen={thanksModal} setIsOpen={toggleThanksModal} />
      <PokemonsContainer>
        {pokemons &&
          pokemons.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              pokemon={pokemon}
              handleAddPokemonToCart={handleAddPokemonToCart}
            />
          ))}
      </PokemonsContainer>
      {loading && (
        <img
          src={loadingGif}
          alt="loading"
          style={{
            display: 'flex',
            width: '100px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
      {!loading && <div ref={loader} />}
    </>
  );
};

export default Dashboard;
