import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  onAdoptPet = pet => {
    this.setState( {adoptedPets: [...this.state.adoptedPets, pet]})
  }

  onFilterChange = type => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: type
      }
    })
  }

  onFetchPets = event => {
    if(this.state.filters.type === "all"){
      fetch('/api/pets').then(resp => resp.json()).then(pets => this.setState({pets}));
    } else {
      fetch('/api/pets?type=' + this.state.filters.type).then(resp => resp.json()).then(pets => this.setState({pets}));
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick= {this.onFetchPets} onChangeType= {this.onFilterChange} filters= {this.state.filters} />
            </div>
            <div className="twelve wide column">
              <PetBrowser adoptedPets= {this.state.adoptedPets} onAdoptPet= {this.onAdoptPet} pets= {this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
