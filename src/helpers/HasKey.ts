import { constants } from "buffer";
import { Item, Obstacle, Floor, Player } from '../constants'

function hasKey(items: (Item|Obstacle|Floor|Player)[], door: string) {
    if(items.includes(Item.KEY1) && door == "door1") {
        return true;
    } else if(items.includes(Item.KEY2) && door == "door2") {
        return true;
    } else if(items.includes(Item.KEY3) && door == "door3") {
        return true;
    } else if(items.includes(Item.KEY4) && door == "door4") {
        return true;
    } else if(items.includes(Item.KEY5) && door == "door5") {
        return true;
    } else {
        return false;
    }
}

export { hasKey };