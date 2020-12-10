import React from 'react';

import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';

import { Item } from '../constants';
import Cell from './Cell';

interface InventoryProps {
  items: Item[]
}

class Inventory extends React.Component<InventoryProps> {
  render() {
    return (
      <Section>
        <Heading size={4} className='has-text-centered'>Inventory</Heading>
        {this.props.items.map((item, index) => <Cell key={index} contains={item}/>)}
      </Section>
    )
  }
}

export default Inventory;
