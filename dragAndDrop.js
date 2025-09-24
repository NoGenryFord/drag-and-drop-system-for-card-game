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
let originPosition = null;
let currentTargetPoint = null;

const preDragSystem = function () {
  const cardDragAndDropInFunction = cardDragAndDrop;
  let isOver = false;
  let isHeld = false;

  const checkDragCondition = () => {
    if (isOver && isHeld) {
      if (!isDragging && !originPosition) {
        const rect = cardDragAndDropInFunction.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(
          cardDragAndDropInFunction
        );
        originPosition = {
          left:
            computedStyle.left === "auto"
              ? rect.left
              : parseFloat(computedStyle.left),
          top:
            computedStyle.top === "auto"
              ? rect.top
              : parseFloat(computedStyle.top),
          position: computedStyle.position,
        };
        console.log("Origin position saved: ", originPosition);
      }

      const isDraggingInFunction = true;
      console.log("You can drag this card");
      isDragging = isDraggingInFunction;
      return isDragging;
    } else {
      isDragging = false;

      const nearestTarget = isCardInTarget();
      if (nearestTarget) {
        const snapped = snapToTarget(nearestTarget);
        if (snapped) {
          originPosition = null;
        }
      } else {
        setTimeout(() => resetToOriginalPosition(), 100);
      }
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

// Return to origin position
// *******************************************
const resetToOriginalPosition = () => {
  if (originPosition) {
    cardDragAndDrop.style.position = originPosition.position;
    cardDragAndDrop.style.left = originPosition.left + "px";
    cardDragAndDrop.style.top = originPosition.top + "px";

    currentTargetPoint = null;

    console.log("Reset to original position");
    originPosition = null;
  }
};
// *******************************************

// Manual Key points for drag-and-drop system
// *******************************************
const setTargetPointsFor = (elementById) => {
  const element = document.getElementById(elementById);

  if (!element) {
    console.log(`Element with id "${elementById}" not found`);
    return null;
  }

  const rect = element.getBoundingClientRect();
  const targetPoint = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    element: element,
    elementById: elementById,
  };

  console.log(`Target point set for "${elementById}":`, targetPoint);
  return targetPoint;
};
// *******************************************

// Automatic Key points for drag-and-drop system
// *******************************************
let allTargetPoints = [];
const initializeTargetPoints = () => {
  allTargetPoints = [];

  const targetElements = document.querySelectorAll("[id^='targetPosition']");

  targetElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const targetPoint = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      element: element,
      elementById: element.id,
    };
    allTargetPoints.push(targetPoint);
  });

  console.log("All target points initialized:", allTargetPoints);
};
// *******************************************

// Check if the card is over a target point
// *******************************************
const isCardInTarget = (targetPoint, threshold = 100) => {
  const cardRect = cardDragAndDrop.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width / 2;
  const cardCenterY = cardRect.top + cardRect.height / 2;

  for (let targetPoint of allTargetPoints) {
    const rect = targetPoint.element.getBoundingClientRect();
    const currentX = rect.left + rect.width / 2;
    const currentY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(cardCenterX - currentX, 2) + Math.pow(cardCenterY - currentY, 2)
    );

    console.log(
      `Distance to ${targetPoint.elementById}: ${distance.toFixed(
        2
      )} (${currentX}, ${currentY})`
    );

    if (distance <= threshold) {
      console.log(`Card is near ${targetPoint.elementById}`);

      targetPoint.x = currentX;
      targetPoint.y = currentY;

      return targetPoint;
    }
  }

  return null;
};
// *******************************************

// Snapping to target points
// *******************************************
const snapToTarget = (targetPoint) => {
  if (targetPoint) {
    const rect = targetPoint.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const cardRect = cardDragAndDrop.getBoundingClientRect();
    const newLeft = centerX - cardRect.width / 2;
    const newTop = centerY - cardRect.height / 2;

    cardDragAndDrop.style.position = "absolute";
    cardDragAndDrop.style.left = newLeft + "px";
    cardDragAndDrop.style.top = newTop + "px";

    currentTargetPoint = targetPoint;

    console.log(
      `Card snapped to target: ${targetPoint.elementById} at (${centerX}, ${centerY})`
    );
    return true;
  }
  return false;
};
// *******************************************

// Update target points coordinates on window resize
// *******************************************
const updateTargetPointsCoordinates = () => {
  allTargetPoints.forEach((targetPoint) => {
    const rect = targetPoint.element.getBoundingClientRect();
    targetPoint.x = rect.left + rect.width / 2;
    targetPoint.y = rect.top + rect.height / 2;
  });

  if (currentTargetPoint) {
    const updatedTarget = allTargetPoints.find(
      (target) => target.elementById === currentTargetPoint.elementById
    );

    if (updatedTarget) {
      const rect = updatedTarget.element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const cardRect = cardDragAndDrop.getBoundingClientRect();
      const newLeft = centerX - cardRect.width / 2;
      const newTop = centerY - cardRect.height / 2;

      cardDragAndDrop.style.left = newLeft + "px";
      cardDragAndDrop.style.top = newTop + "px";

      currentTargetPoint = updatedTarget;

      console.log(
        `Card repositioned with target: ${updatedTarget.elementById}`
      );
    }
  }
  console.log("Target points coordinates updated");
};
window.addEventListener("resize", updateTargetPointsCoordinates);
// *******************************************

// Call the functions
// *******************************************
initializeTargetPoints();
preDragSystem();
dragSystem();
// setTargetPointsFor("targetPosition1");
// setTargetPointsFor("targetPosition2");
// *******************************************
