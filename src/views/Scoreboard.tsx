import React from 'react';

import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Table from 'react-bulma-components/lib/components/table';

import * as User from '../services/User';

interface ScoreboardProps {}
interface ScoreboardState {
  scores: number[][];
  users: string[];
}

class Scoreboard extends React.Component<ScoreboardProps, ScoreboardState> {
  constructor(props: ScoreboardProps) {
    super(props);
    this.state = {
      scores: [],
      users: []
    };
  }

  async componentDidMount() {
    await fetch(`${process.env.REACT_APP_API_URL}/level`)
      .then(response => response.text().then(
        text => this.setState({ levels: JSON.parse(text) })
      ));

    this.state.levels.map(level => {
      let scores = [...this.state.scores, [Infinity, Infinity, Infinity]];
      let users = [...this.state.users, [null, null, null]];
      this.setState({ scores, users })
    });

    const usernames = await User.getAll();

    for (const username of usernames) {
      const user = await User.getUser(username);

      if (user.scores.length === 0) {
        continue;
      }

      this.state.levels.map(level => {
        let scores = [...this.state.scores];
        let users = [...this.state.users];

        // TODO: See if this can be simplified further?
        if (user.scores[level] <= scores[level][0]) {
          scores[level].splice(0, 0, user.scores[level]);
          users[level].splice(0, 0, username);
          scores[level].splice(-1,1);
          users[level].splice(-1,1);
        } else if (user.scores[level] <= scores[level][1]) {
          scores[level].splice(1, 0, user.scores[level]);
          users[level].splice(1, 0, username);
          scores[level].splice(-1,1);
          users[level].splice(-1,1);
        } else if (user.scores[level] <= scores[level][2]) {
          scores[level].splice(2, 0, user.scores[level]);
          users[level].splice(2, 0, username);
          scores[level].splice(-1,1);
          users[level].splice(-1,1);
        }

        this.setState({ scores });
      });
    }
  }

  makeTable = (level: number) => {
    let scores = null;
    if (this.state.users[level]) {
      scores = this.state.users[level].map((user, index) => {
        const score = this.state.scores[level][index];

        return (
          <tr key={index}>
            <th>{user ?? '-'}</th>
            <td>{score === Infinity ? '-' : score}</td>
          </tr>
        )}
      );
    }

    return (
      <Section>
        <Heading className='has-text-centered'>Level {level}</Heading>
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores}
          </tbody>
        </Table>
      </Section>
    );
  }

  render() {
    let tables = null;
    if (this.state.levels) {
      tables = this.state.levels.map(level => this.makeTable(level));
    }

    return (
      <Section>
        <Columns className='is-centered'>
          <Columns.Column size='half'>
            {tables}
          </Columns.Column>
        </Columns>
      </Section>
    )
  }
}

export default Scoreboard;
