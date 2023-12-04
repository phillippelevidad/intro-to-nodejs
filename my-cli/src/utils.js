import { got } from "got";
import { log, error } from "./logs.js";
import { categories } from "./categories.js";

const API = "http://localhost:3000";

export async function add(...args) {
  let [category, id, name, amount, info] = args;
  log(`Adding item ${id} with amount ${amount}`);
  try {
    if (isNaN(+amount)) {
      error("Error: <AMOUNT> must be a number");
      process.exit(1);
    }
    await got.post(`${API}/${category}`, {
      json: {
        id,
        name,
        rrp: +amount,
        info: info.join(" "),
      },
    });
    log(`Item "${id}:${name}" has been added to the ${category} category`);
  } catch (err) {
    error(err.message);
    process.exit(1);
  }
}

export async function update(id, amount) {
  log(`Updating order ${id} with amount ${amount}`);
  try {
    if (isNaN(+amount)) {
      log("Error: <AMOUNT> must be a number");
      process.exit(1);
    }
    await got.post(`${API}/orders/${id}`, {
      json: { amount: +amount },
    });
    log(`Order ${id} updated with amount ${amount}`);
  } catch (err) {
    error(err.message);
    process.exit(1);
  }
}

export function listCategories() {
  log("Listing categories");
  try {
    for (const cat of categories) log(cat);
  } catch (err) {
    error(err.message);
    process.exit(1);
  }
}

export async function listCategoryItems(category) {
  log(`Listing IDs for category ${category}`);
  try {
    const result = await got(`${API}/${category}/`).json();
    for (const item of result) {
      log(
        `${item.id}: ${item.name} - $${item.rrp}\nProduct Info:\t${item.info}`
      );
    }
  } catch (err) {
    error(err.message);
    process.exit(1);
  }
}
