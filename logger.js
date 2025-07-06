const { GlobalKeyboardListener } = require("node-global-key-listener");

const keyboard = new GlobalKeyboardListener();
const heldModifiers = new Set();
const loggedCombos = new Set();

const MODIFIERS = new Set([
  "LEFT CTRL", "RIGHT CTRL",
  "LEFT SHIFT", "RIGHT SHIFT",
  "LEFT ALT", "RIGHT ALT",
  "LEFT META", "RIGHT META"
]);

keyboard.addListener((e) => {
  const key = e.name.toUpperCase();

  if (e.state === "DOWN") {
    if (MODIFIERS.has(key)) {
      heldModifiers.add(normalizeModifier(key));
    } else {
      const combo = heldModifiers.size > 0
        ? [...heldModifiers, key].join(" + ")
        : key;

      if (!loggedCombos.has(combo)) {
        loggedCombos.add(combo);
        console.log(combo);
      }
    }
  } else if (e.state === "UP") {
    if (MODIFIERS.has(key)) {
      heldModifiers.delete(normalizeModifier(key));
    } else {
      loggedCombos.clear();
    }
  }
});

function normalizeModifier(key) {
  if (key.includes("CTRL")) return "Ctrl";
  if (key.includes("SHIFT")) return "Shift";
  if (key.includes("ALT")) return "Alt";
  if (key.includes("META")) return "Meta";
  return key;
}
