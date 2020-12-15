import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';
import * as User from '../services/User';


interface GameProps {}
interface GameState {
  levels: number[];
  unlocked: number;
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      levels: [],
      unlocked: 0
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/level`)
      .then(response => response.text().then(
        text => this.setState({ levels: JSON.parse(text) })
      ));

    User.getUser(User.localData().username)
      .then(user => this.setState({ unlocked: user.scores.length }));
  }

  render() {
    return this.state.levels.map((level, index) => (
      <Link key={index} to={{ pathname: `/level/${index}` }}>
        <Button disabled={index > this.state.unlocked}>Level {index}</Button>
      </Link>
    ))
  }
}

export default Game;
