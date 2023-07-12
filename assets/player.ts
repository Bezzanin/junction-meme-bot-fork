import { Keyboard } from "grammy";

interface User {
    name: string;
    isDead: boolean;
    strength: number;
    health: number;
}

interface actions {
    id: number;
    strength: number;
    name: string;
    sticker_id: string;
}

const attacks: actions[] = [
                            {"id": 1, "strength": 3, "name": "Rickroll Rumble", "sticker_id":"CgACAgQAAxkBAAICWWSugQTZ4LurEZ61qRSm6qcfYzh0AAIiAwACtJwEU3soVgABjC87AAEvBA"},
                            {"id": 2, "strength": 4, "name": "Trololo Tornado", "sticker_id":"CgACAgQAAxkBAAICWmSugV6y_IiZ-lrhSB4PKuTtDVDsAALoAgAC8zwMU2qKzfGqae3ZLwQ"},
                            {"id": 3, "strength": 5, "name": "Doge Lick", "sticker_id":"CgACAgQAAxkBAAICW2SugYDcqKIbNout5JfcG0gkUjyxAALJAgACtsINU1MKyppknl4_LwQ"},
                            {"id": 3, "strength": 6, "name": "Keyboard Warrior Wallop", "sticker_id":"CgACAgQAAxkBAAICXGSugdbSucZHS_zHIAZ7MHt7wcI8AALWAgACE2kNUzIhGmyy0qr7LwQ"},
                            {"id": 3, "strength": 7, "name": "Double Rainbow Roundhouse", "sticker_id":"CgACAgQAAxkBAAICXWSugf22c6Jk3SV2aHFYgZweTq03AALlAgACQ_hMUx3BaLhnKnWrLwQ"},
                            {"id": 3, "strength": 3, "name": "Pepe Pounce", "sticker_id":"CgACAgQAAxkBAAICXmSugi1y9rLQjQeISODSxQPK6BYNAAI5AwACaf5EU0ScQ6gg0yn1LwQ"},
                            {"id": 3, "strength": 4, "name": "Rick and Morty Rampage", "sticker_id":"CgACAgQAAxkBAAICX2Sugkp0Nd_IOQ7VDSKPjWvcnZtsAAIKAwACKpANU2GUAWz7HWo2LwQ"},
                            {"id": 3, "strength": 5, "name": "\"This is Fine\" Firestorm", "sticker_id":"CgACAgQAAxkBAAICYGSugnLW9icRhnbVR3kLmyeWtCyhAAIOAwAC26VcU9StO1TBF2OoLwQ"},
                            {"id": 3, "strength": 6, "name": "Heavenly Male Spin", "sticker_id":"CgACAgQAAxkBAAICYWSugp5-0oHMSpxOn-XSl_OAT0lPAAIwAwACsNcFU0UgrF-R2IIsLwQ"},
                            {"id": 3, "strength": 7, "name": "SuperEffective distraction", "sticker_id":"CgACAgQAAxkBAAICYmSugrhBIqBbxNOdfNdTzeNMh_p2AAI8AwAC6coEU7yc4enlrIVjLwQ"},
                        ];


const generateActionKeyboard = (atacker: string, defender: string) => {
    const result = [];
  
    const elements = attacks.slice();
    
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * elements.length);
      
      const selectedElement = elements.splice(randomIndex, 1)[0];
      result.push(selectedElement);
    }
    
    let buttonRows = result.map((label) => [Keyboard.text(atacker + " performs a " + label.name + " on " + defender + ` (attack: ${label.strength})`)]);
    const keyboard = Keyboard.from(buttonRows);

    return keyboard
}

const getActionByName = (actionName: string): actions | null => {
    let ret = null;
    attacks.map((action) => {
        if (actionName.includes(action.name)) {
            ret = action
        }
    })
    return ret
}

// const checkIsDead = (player: User) {
    
// }

export {User, attacks, generateActionKeyboard, getActionByName}