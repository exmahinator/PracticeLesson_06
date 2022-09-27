import { Component } from 'react';

import Modal from 'components/Modal/Modal';
import Select from 'components/Select';

const POKEMONS = 'pokemons';

const STATES = {
  idle: 'idle',
  success: 'success',
  error: 'error',
  pending: 'pending',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      onePokemon: null,
      name: '',
      status: STATES.idle,
    };
  }

  componentDidMount() {
    const parsedPokemons = JSON.parse(
      localStorage.getItem(POKEMONS)
    );

    parsedPokemons
      ? this.setState({ pokemons: parsedPokemons })
      : this.myMethod();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const nextPokemons = this.state.pokemons;
    const prevPokemons = prevState.pokemons;
    if (prevPokemons !== nextPokemons && snapshot === 20) {
      localStorage.setItem(
        POKEMONS,
        JSON.stringify(nextPokemons)
      );
    }
  }

  setPokemon = (name, resetSelect) => {
    this.setState({ name });
    resetSelect();
  };

  myMethod = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((res) => res.json())
      .then((res) => {
        this.setState({ pokemons: res.results });
        console.log(res.results);
      })
      .finally(() => {
        setTimeout(() => {
          window.scrollTo({
            top: 1000,
            behavior: 'smooth',
          });
        }, 400);
      });
  };

  closeModal = () => {
    this.setState({ name: '' });
  };

  render() {
    const { pokemons, name } = this.state;
    return (
      <>
        {/* {name ? (
          <Modal name={name} closeModal={this.closeModal} />
        ) : (
          <>
            <button type='button' onClick={this.myMethod}>
              Load pictures
            </button>
            <ul>
              {pokemons
                ? pokemons.map((el) => (
                    <li
                      key={el.name}
                      onClick={() =>
                        this.setState({ name: el.name })
                      }>
                      <p>{el.name}</p>
                    </li>
                  ))
                : null}
            </ul>
          </>
        )} */}

        <Select
          pokemons={pokemons}
          setPokemon={this.setPokemon}
        />
        <Modal name={name} />
      </>
    );
  }
}

export default App;
