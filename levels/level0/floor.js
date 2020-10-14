// logic for player navigating floor


// floor layout
const floorDesign = [
    [1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1]
];



   var c = document.getElementById("c")
   var canvas = c.getContext("2d");
 

    for (let i = 0; i < floorDesign.length; i++) {
        for (let j = 0; j < floorDesign[0].length; j++) {
            if (floorDesign[i][j] == 1) {
              canvas.fillStyle = "#ff66d9";
               canvas.fillRect(j*90, i*90, 90, 90);
            } else {
                canvas.fillStyle = "#96e38f";
                canvas.fillRect(j*90, i*90, 90, 90);
            }
        }
    }

