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

        this.update(0, this.state.topScores0, this.state.topUsers0);
        this.update(1, this.state.topScores1, this.state.topUsers1);


    }

    update = (level: number, topScores: number[], topUsers: string[]) => {
        User.getAll().then(usernames => {
            for (const username of usernames) {
                User.getUser(username).then(user => {
                    if(user.scores.length !== 0 && user.scores[level] !== undefined) {
                        let newScores = [...topScores];
                        newScores.push(user.scores[level]);
                        newScores.sort(function(a, b) {
                            return a-b;
                        });

                        const newUsers = [...topUsers];
                        if(user.scores[level] < newScores[3]) {
                            for(let i = 2; i >= 0; i--) {
                                if(user.scores[level] == newScores[i]) {
                                    newUsers.splice(i, 0, user.username);
                                    newUsers.pop();
                                    break;
                                }
                            }
                        }
                        newScores.pop();

                        switch(level) {
                            case 0:
                                this.setState({
                                    topScores0: newScores,
                                    topUsers0: newUsers
                                });
                                break;
                            case 1:
                                this.setState({
                                    topScores1: newScores,
                                    topUsers1: newUsers
                                });
                                break;
                            case 2:
                                this.setState({
                                    topScores2: newScores,
                                    topUsers2: newUsers
                                });
                                break;
                            case 3:
                                this.setState({
                                    topScores3: newScores,
                                    topUsers3: newUsers
                                });
                                break;
                            case 4:
                                this.setState({
                                    topScores4: newScores,
                                    topUsers4: newUsers
                                });
                        }
                    }
                });
            }
        });
    }

    makeTable = (level: number) => {
        let users: string[] = [];
        let scores: number[] = [];
        switch(level) {
            case 0:
                users = [...this.state.topUsers0];
                scores = [...this.state.topScores0];
                break;
            case 1:
                users = [...this.state.topUsers1];
                scores = [...this.state.topScores1];
                break;
            case 2:
                users = [...this.state.topUsers2];
                scores = [...this.state.topScores2];
                break;
            case 3:
                users = [...this.state.topUsers3];
                scores = [...this.state.topScores3];
                break;
            case 4:
                users = [...this.state.topUsers4];
                scores = [...this.state.topScores4];
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
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th>{user}</th>
                                <td>{scores[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Section>
        )

    }

    render() {
        
        const table0 = this.makeTable(0);
        const table1 = this.makeTable(1);
        const table2 = this.makeTable(2);
        const table3 = this.makeTable(3);
        const table4 = this.makeTable(4);
        return (
            <Section>
                <Columns className='is-centered'>
                    <Columns.Column size='half'>
                        {table0}
                        {table1}
                        {table2}
                        {table3}
                        {table4}
                    </Columns.Column>
                </Columns>
            </Section>
        )
    }
}

export default Scoreboard;
