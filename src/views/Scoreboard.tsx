import React from 'react';

import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Table from 'react-bulma-components/lib/components/table';

import * as User from '../services/User';

interface ScoreboardProps {
    string: number;
}

interface ScoreboardState {
    topScores0: number[];
    topScores1: number[];
    topScores2: number[];
    topScores3: number[];
    topScores4: number[];

    topUsers0: string[];
    topUsers1: string[];
    topUsers2: string[];
    topUsers3: string[];
    topUsers4: string[];
}

class Scoreboard extends React.Component<ScoreboardProps, ScoreboardState> {
    constructor(props: ScoreboardProps) {
        super(props);
        this.state = {
            topScores0: [1000, 1000, 1000],
            topScores1: [1000, 1000, 1000],
            topScores2: [1000, 1000, 1000],
            topScores3: [1000, 1000, 1000],
            topScores4: [1000, 1000, 1000],

            topUsers0: ['', '', ''],
            topUsers1: ['', '', ''],
            topUsers2: ['', '', ''],
            topUsers3: ['', '', ''],
            topUsers4: ['', '', '']
        };
    }

    componentDidMount() {
        User.getAll().then(usernames => {
            for (const username of usernames) {
                User.getUser(username).then(user => {
                    if(user.scores.length !== 0 && user.scores[0] !== undefined) {
                        let newScores = [...this.state.topScores0];
                        newScores.push(user.scores[0]);
                        newScores.sort(function(a, b) {
                            return a-b;
                        });

                        const newUsers = [...this.state.topUsers0];
                        if(user.scores[0] < newScores[3]) {
                            for(let i = 2; i >= 0; i--) {
                                if(user.scores[0] == newScores[i]) {
                                    newUsers.splice(i, 0, user.username);
                                    newUsers.pop();
                                    break;
                                }
                            }
                        }
                        newScores.pop();

                        this.setState({
                            topScores0: newScores,
                            topUsers0: newUsers
                        });
                    }
                });
            }
        });

    }

    render() {
        return (
            <Section>
                <Columns className='is-cnetered'>
                    <Columns.Column>
                        <Heading className='has-text-centered'>Level 0</Heading>
                        <Table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.topUsers0.map((user, index) => (
                                    <tr key={index}>
                                        <th>{user}</th>
                                        <td>{this.state.topScores0[index]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Columns.Column>
                </Columns>
            </Section>
        )
    }
}

export default Scoreboard;
