import { Bot, Context, Keyboard } from "grammy";
import {attacks, User, generateActionKeyboard, getActionByName} from "./assets/player"
import { Menu } from "@grammyjs/menu";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("5901762077:AAE3A1W0kLAEhpWjzUEgPb6oJb8E-1l1sjs"); // <-- put your bot token between the ""

// const menu = new Menu("my-menu-identifier")
//   .text("A", (ctx) => ctx.reply("You pressed A!")).row()
//   .text("B", (ctx) => ctx.reply("You pressed B!"));

// // Make it interactive.
// bot.use(menu);

// bot.command("start", async (ctx) => {
//   // Send the menu.
//   await ctx.reply("Check out this menu:", { reply_markup: menu });
// });


const buttonRows = attacks
.map((label) => [Keyboard.text(label.name + ` (attack: ${label.strength})`)]);
const keyboard = Keyboard.from(buttonRows);

bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help text" },
    { command: "settings", description: "Open settings" },
]);

const user1: User = {"name":"", "isDead":false, "strength": 1, "health": 10};
const user2: User = {"name":"", "isDead":false, "strength": 1, "health": 10};
let state: string = "";
bot.command("start", async (ctx) => {
    state = ""
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
    await ctx.reply("Set player 1 name", {reply_markup: { remove_keyboard: true }});
    // await ctx.replyWithSticker("AgAD3BQAApFJyUs")
    // await bot.api.sendSticker(ctx.chat.id, "CgACAgQAAx0CXNn6EAACCuZkrcOVi9HFhBmM1RoMgSrwh6N_-QACIgMAArScBFNDXrwg65Xv-i8E");
    // await bot.api.sendAnimation(ctx.chat.id, "CgACAgIAAx0CXNn6EAACBLlieQLcsxtHq7zzsofcnzLKmY3F3AACLAMAAnFmEErLuJtuO6tBFSQE", {reply_markup: keyboard});
});
// "animation": { "file_name": "animation.gif.mp4", "mime_type": "video\/mp4", "duration": 14, "width": 220, "height": 130, "thumb": { "file_id": "AAMCBAADGQEAAvm0YjCE_77q4sRZuyajonsMPJKawxIAAt4LAAI10YlQ4TUozmV-dUsBAAdtAAMjBA", "file_unique_id": "AQAD3gsAAjXRiVBy", "file_size": 6589, "width": 220, "height": 130 }, "file_id": "CgACAgQAAxkBAAL5tGIwhP--6uLEWbsmo6J7DDySmsMSAALeCwACNdGJUOE1KM5lfnVLIwQ", "file_unique_id": "AgAD3gsAAjXRiVA", "file_size": 447040 }, "document": { "file_name": "animation.gif.mp4", "mime_type": "video\/mp4", "thumb": { "file_id": "AAMCBAADGQEAAvm0YjCE_77q4sRZuyajonsMPJKawxIAAt4LAAI10YlQ4TUozmV-dUsBAAdtAAMjBA", "file_unique_id": "AQAD3gsAAjXRiVBy", "file_size": 6589, "width": 220, "height": 130 }, "file_id": "CgACAgQAAxkBAAL5tGIwhP--6uLEWbsmo6J7DDySmsMSAALeCwACNdGJUOE1KM5lfnVLIwQ", "file_unique_id": "AgAD3gsAAjXRiVA", "file_size": 447040 } } }



bot.on("message", async (ctx) => {
    console.log(ctx.message.animation?.file_id);
    // console.log(ctx.message.sticker?.file_unique_id);
    console.log(state, "state")
    switch (state) {
        case "set1":
            if (ctx.message.text) { 
                user1.name = ctx.message.text;
                state = "set2";
                await ctx.reply("Please set player 2 name", {reply_markup: { remove_keyboard: true }});
            }
            break;
        case "set2":
            if (ctx.message.text) { 
                user2.name = ctx.message.text;
                state = "player1";
                await ctx.reply("Game start", {reply_markup: { remove_keyboard: true },});
            }
        case "player1":
            state = "player1attac";
            await ctx.reply(`${user1.name} (${user1.health} HP) turn`, {reply_markup: generateActionKeyboard(user1.name, user2.name)});
            break;
        case "player2":
            state = "player2attac";
            await ctx.reply(`${user2.name} (${user2.health} HP) turn`, {reply_markup: generateActionKeyboard(user2.name, user1.name)});
            break;
        case "player1attac":
            if (!!ctx.message?.text) {
                let act = getActionByName(ctx.message.text)
                if (act !== null) {
                    await bot.api.sendAnimation(ctx.chat.id, act.sticker_id, {reply_markup: { remove_keyboard: true }});
                    user2.health -= act.strength;
                    if (user2.health <= 0) {
                        user2.isDead = true;
                        state = "player2dead";
                        await ctx.reply(`${user2.name} is dead`);
                    } else {
                        state = "player2attac";
                        await ctx.reply(`${user2.name} (${user2.health} HP) turn`, {reply_markup: generateActionKeyboard(user2.name, user1.name)});
                        break;
                    }
                }
            }
            break;
        case "player2attac":
            if (!!ctx.message?.text) {
                let act = getActionByName(ctx.message.text)
                if (act !== null) {
                    await bot.api.sendAnimation(ctx.chat.id, act.sticker_id, {reply_markup: { remove_keyboard: true }});
                    user1.health -= act.strength;
                    if (user1.health <= 0) {
                        user1.isDead = true;
                        state = "player1dead";
                        await ctx.reply(`${user1.name} is dead`);
                    } else {
                        state = "player1attac";
                        await ctx.reply(`${user1.name} (${user1.health} HP) turn`, {reply_markup: generateActionKeyboard(user1.name, user2.name)});
                        break;
                    }
                }
            }
            break;
        default:   
    }

});
bot.start();

