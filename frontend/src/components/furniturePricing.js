// furniture data
const furnitureItems = [
  { type: "couch", price: 500 },
  { type: "couch", price: 1200 },
  { type: "bed", price: 700 },
  { type: "bed", price: 2000 },
  { type: "sheets", price: 30 },
  { type: "sheets", price: 150 },
  { type: "table", price: 100 },
  { type: "table", price: 500 },
  { type: "bookshelf", price: 50 },
  { type: "bookshelf", price: 300 },
  { type: "chair", price: 50 },
  { type: "chair", price: 200 },
  { type: "cabinet", price: 150 },
  { type: "cabinet", price: 500 }
];

// logic to check if a price is reasonable
function evaluateFurniture(item) {
  if (item.type === "couch") {
    if (item.price >= 300 && item.price <= 1000) {
      return "Reasonable";
    } else {
      return "Not Reasonable";
    }
  } else if (item.type === "bed") {
    if (item.price >= 500 && item.price <= 1500) {
      return "Reasonable";
    } else {
      return "Not Reasonable";
    }
  } else if (item.type === "sheets") {
    if (item.price >= 20 && item.price <= 100) {
      return "Reasonable";
    } else {
      return "Not Reasonable";
    }
  } else if (item.type === "table") {
    if (item.price >= 100 && item.price <= 500) {
      return "Reasonable";
    } else {
      return "Not Reasonable";
    }
  } else if (item.type === "bookshelf") {
    if (item.price >= 50 && item.price <= 300) {
      return "Resonable";
    } else {
      return "Not Reasonable";
    }
  } else if (item.type === "chair") {
    if (item.price >= 50 && item.price <= 200) {
      return "Resonable";
    } else {
      return "Not Reasonable";
    }
  } else if (item.type === "cabinet") {
    if (item.price >= 150 && item.price <= 500) {
      return "Reasonable";
    } else {
      return "Not Reasonable";
    }
  } else {
    return "Unknown Furniture Type";
  }
}

// Evaluate all items
function evaluateAllFurniture(items) {
  items.forEach((item) => {
    const result = evaluateFurniture(item);
    console.log(`Item: ${item.type}, Price: $${item.price} - ${result}`);
  });
}

// Run the evaluation
evaluateAllFurniture(furnitureItems);
