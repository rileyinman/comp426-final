import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';

interface GameProps {}
interface GameState {
  levels: number[]
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      levels: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/level`)
      .then(response => response.text().then(
        text => this.setState({ levels: JSON.parse(text) })
      ));
  }

  render() {
    return this.state.levels.map((level, index) => (
      <Link to={{ pathname: `/level/${index}` }}>
        <Button>Level {index}</Button>
      </Link>
    ))
  }
}

export default Game;
