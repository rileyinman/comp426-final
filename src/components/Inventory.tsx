import React from 'react';

import Heading from 'react-bulma-components/lib/components/heading';

import { Item } from '../constants';
import Cell from './Cell';

interface InventoryProps {
  items: Item[]
}

interface InventoryState {
  items: Item[]
}

class Inventory extends React.Component<InventoryProps, InventoryState> {
  constructor(props: InventoryProps) {
    super(props);
    this.state = {
      items: props.items
    };
  }

  render() {
    return (
      <>
        <Heading size={4} className='has-text-centered'>Inventory</Heading>
        {this.state.items.map((item, index) => <Cell key={index} contains={item}/>)}
      </>
    )
  }
}

export default Inventory;
