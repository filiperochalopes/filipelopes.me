import React, { Component } from 'react';

export const SearchContext = React.createContext();

export class SearchProvider extends Component {
  state = {
    query: '',
    tags: ['teste', 'teste2', 'teste3'],
    showLevel: 1,
  };

  render() {
    console.log('rendered with state', this.state);
    return (
      <SearchContext.Provider
        value={{
          state: this.state,
          insertTag: (str) => {
            let tags = this.state.tags.concat(str);
            this.setState({ tags });
            console.log('insertTag call', tags);
          },
          removeTag: (str) => {
            console.log('Called with', str);
            let tags = this.state.tags.filter((tag) => tag !== str);
            this.setState({ tags });
          },
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchProvider;
