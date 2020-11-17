import React from 'react';

import Cell from './Cell';

interface BoardProps {}
interface BoardState {
  cells: Cell[];
}

class Board extends React.Component<BoardProps, BoardState> {
  render() {
    return <div>Board</div>
  }
}

export default Board;
