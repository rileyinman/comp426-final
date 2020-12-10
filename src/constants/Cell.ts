enum Item {
  KEY_PINK = 'key_pink',
  KEY_YELLOW = 'key_yellow',
  KEY_GREEN = 'key_green',
  KEY_BLUE = 'key_blue',
  KEY_PURPLE = 'key_purple'
}

enum Obstacle {
  DOOR_PINK = 'door_pink',
  DOOR_YELLOW = 'door_yellow',
  DOOR_GREEN = 'door_green',
  DOOR_BLUE = 'door_blue',
  DOOR_PURPLE = 'door_purple',
  EMPTY = 'empty',
  NPC = 'npc',
  WALL = 'wall'
}

enum Floor {
  DEFAULT = 'floor',
  EXIT = 'exit'
}

enum Player {
  PLAYER1 = 'player1',
  PLAYER2 = 'player2',
  PLAYER3 = 'player3',
  PLAYER4 = 'player4'
}

export { Floor, Item, Obstacle, Player };
