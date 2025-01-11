// textbook data
const textbookItems = [
    { type: "textbook", price: 20 },
    { type: "textbook", price: 200 }
];

// logic to check if price is reasonable
function evaluateAllTextbook(item) {
    if (item.type === "textbook") {
        if (item.price >= 20 && item.price <= 200) {
            return "Reasonable";
        } else {
            return "Not Reasonable";
        }
    } else {
        return "Unknown Textbook Type";
    }
}

// evaluate all items
function evaluateAllTextbook(items) {
    items.forEach((item) => {
      const result = evaluateTextbook(item);
      console.log(`Item: ${item.type}, Price: $${item.price} - ${result}`);
    });
  }
  
  // Run the evaluation
  evaluateAllTextbook(textbookItems);
