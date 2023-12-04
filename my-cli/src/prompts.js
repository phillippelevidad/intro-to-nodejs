import Enquirer from "enquirer";
const { prompt } = Enquirer;
import { log, error } from "./logs.js";
import { categories } from "./categories.js";
import { add, update, listCategories, listCategoryItems } from "./utils.js";

const categoryQuestions = [
  {
    type: "autocomplete",
    name: "category",
    message: "Category",
    choices: categories,
  },
];

export const promptListIds = async () => {
  const { category } = await prompt(categoryQuestions);
  return listCategoryItems(category);
};

const orderQuestions = [
  ...categoryQuestions,
  {
    type: "input",
    name: "id",
    message: "ID",
  },
  {
    type: "input",
    name: "name",
    message: "Name",
  },
  {
    type: "input",
    name: "amount",
    message: "Amount",
  },
  {
    type: "input",
    name: "info",
    message: "Info",
  },
];

export const promptAddOrder = async () => {
  const { category, id, name, amount, info } = await prompt(orderQuestions);
  return add(category, id, name, amount, info);
};

const updateQuestions = [
  {
    type: "input",
    name: "id",
    message: "ID",
  },
  {
    type: "input",
    name: "amount",
    message: "Amount",
  },
];

export const promptUpdate = async () => {
  const { id, amount } = await prompt(updateQuestions);
  return update(id, amount);
};

const commandsList = ["add", "update", "list", "list by ID's", "help", "exit"];
const commandsQuestions = [
  {
    type: "autocomplete",
    name: "command",
    message: "Command",
    choices: commandsList,
  },
];

export const promptCommand = async () => {
  const { command } = await prompt(commandsQuestions);
  return command;
};

export const interactiveApp = async (cmd) => {
  log("Back office for My App");
  log("Interactive Mode");
  try {
    const command = cmd ?? (await promptCommand());
    switch (command) {
      case "add":
        log("Add Order");
        await promptAddOrder();
        return interactiveApp();
      case "update":
        log("Update Order");
        await promptUpdate();
        return interactiveApp();
      case "list":
        log("List Categories");
        await listCategories();
        return interactiveApp();
      case "list by ID's":
        log("List Category Items");
        await promptListIds();
        return interactiveApp();
      case "help":
        program.help();
      case "exit":
        process.exit(0);
    }
  } catch (err) {
    error(err);
    process.exit(1);
  }
};
