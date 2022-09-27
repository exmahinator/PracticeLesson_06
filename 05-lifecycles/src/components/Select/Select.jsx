import React, { Component } from 'react';

class Select extends Component {
  state = {
    selected: '',
  };

  handeChange = (event) => {
    this.setState({ selected: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selected !== this.state.selected &&
      this.state.selected !== ''
    ) {
      this.props.setPokemon(
        this.state.selected,
        this.handleClear
      );
    }
  }

  handleClear = () => {
    this.setState({ selected: '' });
  };

  render() {
    const { pokemons } = this.props;
    return (
      <>
        <select
          value={this.state.selected}
          name='Select pokemon'
          onChange={this.handeChange}>
          <option>Select pokemon</option>
          {pokemons.map(({ name }) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </>
    );
  }
}

export default Select;
