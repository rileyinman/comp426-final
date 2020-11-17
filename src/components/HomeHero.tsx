import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';

const HomeHero = () => (
  <Hero color='primary' className='is-fullheight-with-navbar'>
    <Hero.Body>
      <Container>
        <Heading>COMP 426 Final Project</Heading>
        <Button><Link to='/game'>Play Game</Link></Button>
      </Container>
    </Hero.Body>
  </Hero>
)

export default HomeHero;
