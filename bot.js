"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const player_1 = require("./assets/player");
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new grammy_1.Bot("5901762077:AAE3A1W0kLAEhpWjzUEgPb6oJb8E-1l1sjs"); // <-- put your bot token between the ""
// const menu = new Menu("my-menu-identifier")
//   .text("A", (ctx) => ctx.reply("You pressed A!")).row()
//   .text("B", (ctx) => ctx.reply("You pressed B!"));
// // Make it interactive.
// bot.use(menu);
// bot.command("start", async (ctx) => {
//   // Send the menu.
//   await ctx.reply("Check out this menu:", { reply_markup: menu });
// });
const buttonRows = player_1.attacks
    .map((label) => [grammy_1.Keyboard.text(label.name + ` (attack: ${label.strength})`)]);
const keyboard = grammy_1.Keyboard.from(buttonRows);
bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help text" },
    { command: "settings", description: "Open settings" },
]);
const user1 = { "name": "", "isDead": false, "strength": 1, "health": 10 };
const user2 = { "name": "", "isDead": false, "strength": 1, "health": 10 };
let state = "";
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    state = "";
    user1.name = "";
    user2.name = "";
    user1.isDead = false;
    user2.isDead = false;
    user1.strength = 4;
    user2.strength = 3;
    user1.health = Math.floor(Math.random() * 11) + 20;
    user2.health = Math.floor(Math.random() * 11) + 20;
    state = "set1";
    // Send the menu.
    // await ctx.reply("Set player 1 name", { reply_markup: keyboard });
    yield ctx.reply("Set player 1 name", { reply_markup: { remove_keyboard: true } });
    // await ctx.replyWithSticker("AgAD3BQAApFJyUs")
    // await bot.api.sendSticker(ctx.chat.id, "CgACAgQAAx0CXNn6EAACCuZkrcOVi9HFhBmM1RoMgSrwh6N_-QACIgMAArScBFNDXrwg65Xv-i8E");
    // await bot.api.sendAnimation(ctx.chat.id, "CgACAgIAAx0CXNn6EAACBLlieQLcsxtHq7zzsofcnzLKmY3F3AACLAMAAnFmEErLuJtuO6tBFSQE", {reply_markup: keyboard});
}));
// "animation": { "file_name": "animation.gif.mp4", "mime_type": "video\/mp4", "duration": 14, "width": 220, "height": 130, "thumb": { "file_id": "AAMCBAADGQEAAvm0YjCE_77q4sRZuyajonsMPJKawxIAAt4LAAI10YlQ4TUozmV-dUsBAAdtAAMjBA", "file_unique_id": "AQAD3gsAAjXRiVBy", "file_size": 6589, "width": 220, "height": 130 }, "file_id": "CgACAgQAAxkBAAL5tGIwhP--6uLEWbsmo6J7DDySmsMSAALeCwACNdGJUOE1KM5lfnVLIwQ", "file_unique_id": "AgAD3gsAAjXRiVA", "file_size": 447040 }, "document": { "file_name": "animation.gif.mp4", "mime_type": "video\/mp4", "thumb": { "file_id": "AAMCBAADGQEAAvm0YjCE_77q4sRZuyajonsMPJKawxIAAt4LAAI10YlQ4TUozmV-dUsBAAdtAAMjBA", "file_unique_id": "AQAD3gsAAjXRiVBy", "file_size": 6589, "width": 220, "height": 130 }, "file_id": "CgACAgQAAxkBAAL5tGIwhP--6uLEWbsmo6J7DDySmsMSAALeCwACNdGJUOE1KM5lfnVLIwQ", "file_unique_id": "AgAD3gsAAjXRiVA", "file_size": 447040 } } }
bot.on("message", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log((_a = ctx.message.animation) === null || _a === void 0 ? void 0 : _a.file_id);
    // console.log(ctx.message.sticker?.file_unique_id);
    console.log(state, "state");
    switch (state) {
        case "set1":
            if (ctx.message.text) {
                user1.name = ctx.message.text;
                state = "set2";
                yield ctx.reply("Please set player 2 name", { reply_markup: { remove_keyboard: true } });
            }
            break;
        case "set2":
            if (ctx.message.text) {
                user2.name = ctx.message.text;
                state = "player1";
                yield ctx.reply("Game start", { reply_markup: { remove_keyboard: true }, });
            }
        case "player1":
            state = "player1attac";
            yield ctx.reply(`${user1.name} (${user1.health} HP) turn`, { reply_markup: (0, player_1.generateActionKeyboard)(user1.name, user2.name) });
            break;
        case "player2":
            state = "player2attac";
            yield ctx.reply(`${user2.name} (${user2.health} HP) turn`, { reply_markup: (0, player_1.generateActionKeyboard)(user2.name, user1.name) });
            break;
        case "player1attac":
            if (!!((_b = ctx.message) === null || _b === void 0 ? void 0 : _b.text)) {
                let act = (0, player_1.getActionByName)(ctx.message.text);
                if (act !== null) {
                    yield bot.api.sendAnimation(ctx.chat.id, act.sticker_id, { reply_markup: { remove_keyboard: true } });
                    user2.health -= act.strength;
                    if (user2.health <= 0) {
                        user2.isDead = true;
                        state = "player2dead";
                        yield ctx.reply(`${user2.name} is dead`);
                    }
                    else {
                        state = "player2attac";
                        yield ctx.reply(`${user2.name} (${user2.health} HP) turn`, { reply_markup: (0, player_1.generateActionKeyboard)(user2.name, user1.name) });
                        break;
                    }
                }
            }
            break;
        case "player2attac":
            if (!!((_c = ctx.message) === null || _c === void 0 ? void 0 : _c.text)) {
                let act = (0, player_1.getActionByName)(ctx.message.text);
                if (act !== null) {
                    yield bot.api.sendAnimation(ctx.chat.id, act.sticker_id, { reply_markup: { remove_keyboard: true } });
                    user1.health -= act.strength;
                    if (user1.health <= 0) {
                        user1.isDead = true;
                        state = "player1dead";
                        yield ctx.reply(`${user1.name} is dead`);
                    }
                    else {
                        state = "player1attac";
                        yield ctx.reply(`${user1.name} (${user1.health} HP) turn`, { reply_markup: (0, player_1.generateActionKeyboard)(user1.name, user2.name) });
                        break;
                    }
                }
            }
            break;
        default:
    }
}));
bot.start();
