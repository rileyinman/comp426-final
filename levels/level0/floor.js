// logic for player navigating floor

function Tile(color) {
    this.color = color;
}

const grassTile = new Tile('#00b543')
const roadTile = new Tile('#a28879')

// floor layout
const level1Layout = [
    [grassTile, grassTile, roadTile,  grassTile, grassTile, grassTile, grassTile, grassTile],
    [grassTile, roadTile,  roadTile,  grassTile, grassTile, grassTile, grassTile, grassTile],
    [grassTile, roadTile,  grassTile, grassTile, grassTile, grassTile, grassTile, grassTile],
    [grassTile, roadTile,  roadTile,  roadTile,  roadTile,  grassTile, grassTile, grassTile],
    [grassTile, grassTile, grassTile, grassTile, roadTile,  grassTile, grassTile, grassTile],
    [grassTile, grassTile, grassTile, grassTile, roadTile,  grassTile, grassTile, grassTile],
    [grassTile, grassTile, grassTile, roadTile,  roadTile,  grassTile, grassTile, grassTile],
    [grassTile, grassTile, grassTile, roadTile,  grassTile, grassTile, grassTile, grassTile]
];

function Level(layout, startCoords) {
    this.layout = layout;
    this.startCoords = startCoords;
    this.height = this.layout.length;
    this.width = this.layout[0].length;
}

const level1 = new Level(level1Layout, [7, 3]);

const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function drawLevel(level) {
    const canvas = document.getElementsByClassName('game-container')[0]
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const playerSprite = new Image();
    playerSprite.src = '../../assets/player.png';

    for (let i = 0; i < level.height; i++) {
        for (let j = 0; j < level.width; j++) {
            ctx.beginPath();
            ctx.fillStyle = level.layout[i][j].color;
            ctx.fillRect(j*90, i*90, 90, 90);
            if (arrayEquals([i, j], level.startCoords)) {
                playerSprite.onload = function() {
                    ctx.drawImage(
                        playerSprite,
                        j*90 + 12,
                        i*90 + 10,
                        64,
                        64
                    )
                }
            }
        }
    }
}

document.addEventListener(
    'DOMContentLoaded',
    function() {
        drawLevel(level1);
    }
);
