#!/usr/bin/env node

import { Command } from "commander";
import {
  add,
  listCategories,
  listCategoryItems,
  update,
} from "../src/utils.js";

const program = new Command();

// node bin/cmd.js --help
program.name("my-cli").description("Back-office for my app").version("1.0.0");

// // node bin/cmd.js help add
// node bin/cmd.js add electronics A3 Laptop 599 "Best laptop money can buy"
program
  .command("add")
  .description("Add Product by ID to a Category")
  .argument("<CATEGORY>", "Product Category")
  .argument("<ID>", "Product ID")
  .argument("<NAME>", "Product Name")
  .argument("<AMOUNT>", "Product RRP")
  .argument("[INFO...]", "Product Info")
  .action(add);

// node bin/cmd.js help update
// node bin/cmd.js update A2 12
program
  .command("update")
  .description("Update Order by ID with Amount")
  .argument("<ID>", "Order ID")
  .argument("<AMOUNT>", "Amount")
  .action(update);

// node bin/cmd.js help list
// node bin/cmd.js list --all
// node bin/cmd.js list electronics
program
  .command("list")
  .description("List categories")
  .argument("[CATEGORY]", "Category to list IDs for")
  .option("-a, --all", "List all categories")
  .action(async (args, opts) => {
    if (args && opts.all)
      throw new Error("Cannot specify both category and 'all'");
    if (opts.all || args === "all") {
      listCategories();
    } else if (args === "confectionery" || args === "electronics") {
      await listCategoryItems(args);
    } else {
      throw new Error("Invalid category specified");
    }
  });

program.parse();
