import React from 'react';

import Heading from 'react-bulma-components/lib/components/heading';

import { Item } from '../constants';
import Cell from './Cell';

interface InventoryProps {
  items: Item[]
}

class Inventory extends React.Component<InventoryProps> {
  constructor(props: InventoryProps) {
    super(props);
  }

  render() {
    return (
      <>
        <Heading size={4} className='has-text-centered'>Inventory</Heading>
        {this.props.items.map((item, index) => <Cell key={index} contains={item}/>)}
      </>
    )
  }
}

export default Inventory;
