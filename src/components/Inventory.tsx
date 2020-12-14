import React from 'react';

import { Item } from '../constants';
import Cell from './Cell';

interface InventoryProps {
  items: Item[];
}

class Inventory extends React.Component<InventoryProps> {
  render() {
    return this.props.items.map((item, index) => <Cell key={index} contains={item}/>);
  }
}

export default Inventory;
