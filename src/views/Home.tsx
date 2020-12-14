import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';

interface HomeProps extends RouteComponentProps {}

class Home extends React.Component<HomeProps> {
  componentDidMount() {
    const { state } = this.props.location;
    if (state && (state as any).reload) {
      this.props.history.replace(window.location.pathname, null);
      window.location.reload();
    }
  }

  render() {
    return (
      <Hero color='primary' className='is-fullheight-with-navbar'>
        <Hero.Body>
          <Container>
            <Heading size={1}>COMP 426 Final Project</Heading>
            <Link to='/game'><Button>Play Game</Button></Link>
          </Container>
        </Hero.Body>
      </Hero>
    )
  }
}

export default Home;
