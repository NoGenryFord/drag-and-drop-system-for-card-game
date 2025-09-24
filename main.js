// Temporary disable right-click context menu and clear console on right-click
// *******************************************
const root = document.getElementById("root");
root.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  console.clear();
});
// *******************************************

// First part of drag-and-drop system: pre-drag system
// *******************************************
const cardDragAndDrop = document.getElementById("cardDad");
let isDragging = false;

const preDragSystem = function () {
  const cardDragAndDropInFunction = cardDragAndDrop;
  let isOver = false;
  let isHeld = false;

  const checkDragCondition = () => {
    if (isOver && isHeld) {
      const isDraggingInFunction = true;
      console.log("You can drag this card");
      isDragging = isDraggingInFunction;
      return isDragging;
    } else {
      isDragging = false;
    }
  };

  // Mouse events
  cardDragAndDropInFunction.addEventListener("mouseover", () => {
    console.log("Over on the card");
    isOver = true;
    checkDragCondition();
    console.log(`isDragging in preDragSystem: ${isDragging}`);
  });

  cardDragAndDropInFunction.addEventListener("mouseout", () => {
    console.log("Out of the card");
    isOver = false;
    checkDragCondition();
  });

  cardDragAndDropInFunction.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    console.log("Card is held");
    isHeld = true;
    checkDragCondition();
    console.log(`isDragging in preDragSystem: ${isDragging}`);
  });

  cardDragAndDropInFunction.addEventListener("mouseup", (event) => {
    if (event.button !== 0) return;
    console.log("Card is dropped");
    isHeld = false;
    checkDragCondition();
  });

  // Touch events
  cardDragAndDropInFunction.addEventListener("touchstart", (event) => {
    event.preventDefault(); // Cancel scroll
    console.log("Touch start - Card is held");
    isOver = true;
    isHeld = true;
    checkDragCondition();
    console.log(`isDragging in preDragSystem: ${isDragging}`);
  });
  cardDragAndDropInFunction.addEventListener("touchend", (event) => {
    event.preventDefault(); // Cancel scroll
    console.log("Touch end - Card is dropped");
    isOver = false;
    isHeld = false;
    checkDragCondition();
  });

  return isDragging;
};
// *******************************************

// Second part of drag-and-drop system: drag system
// *******************************************

const dragSystem = () => {
  const cardDragAndDropInFunction = cardDragAndDrop;
  let newX;
  let newY;
  let offsetX;
  let offsetY;
  console.log("In second stage: " + isDragging);

  // Mouse events
  cardDragAndDropInFunction.addEventListener("mousedown", (event) => {
    const rect = cardDragAndDropInFunction.getBoundingClientRect();
    offsetX = rect.width / 2;
    offsetY = rect.height / 2;
  });

  cardDragAndDropInFunction.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    newX = event.clientX - offsetX;
    newY = event.clientY - offsetY;
    cardDragAndDropInFunction.style.position = "absolute";
    cardDragAndDropInFunction.style.left = newX + "px";
    cardDragAndDropInFunction.style.top = newY + "px";
    console.log(`Dragging: X: ${newX}, Y: ${newY}`);
  });

  // Touch events
  cardDragAndDropInFunction.addEventListener("touchstart", (event) => {
    event.preventDefault();
    const rect = cardDragAndDropInFunction.getBoundingClientRect();
    offsetX = rect.width / 2;
    offsetY = rect.height / 2;
  });

  cardDragAndDropInFunction.addEventListener("touchmove", (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const touch = event.touches[0];
    newX = touch.clientX - offsetX;
    newY = touch.clientY - offsetY;
    cardDragAndDropInFunction.style.position = "absolute";
    cardDragAndDropInFunction.style.left = newX + "px";
    cardDragAndDropInFunction.style.top = newY + "px";
    console.log(`Dragging: X: ${newX}, Y: ${newY}`);
  });
};

// *******************************************

// Call the functions
// *******************************************
preDragSystem();
dragSystem();
// *******************************************
