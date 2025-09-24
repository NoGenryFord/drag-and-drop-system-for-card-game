# Drag and Drop System / Система перетягування

Універсальна система перетягування елементів для веб-додатків з підтримкою сенсорних пристроїв.

A universal drag and drop system for web applications with touch device support.

## 🚀 Особливості / Features

### Українською:

- ✅ **Адаптивність** - працює з будь-якою кількістю drag і target елементів
- ✅ **Сенсорна підтримка** - повна підтримка планшетів та мобільних телефонів
- ✅ **Центрування** - елемент завжди центрується під курсором/пальцем
- ✅ **Анімації** - плавне повернення до початкової позиції
- ✅ **Прилипання** - автоматичне прилипання до target зон
- ✅ **Респонсивність** - адаптація при зміні розміру вікна

### English:

- ✅ **Adaptive** - works with any number of drag and target elements
- ✅ **Touch Support** - full tablet and mobile phone support
- ✅ **Centering** - element always centers under cursor/finger
- ✅ **Animations** - smooth return to original position
- ✅ **Snapping** - automatic snapping to target zones
- ✅ **Responsive** - adapts on window resize

## 📦 Інсталяція / Installation

### Українською:

1. Скопіюйте файл `dargAndDrop.js` в ваш проект
2. Підключіть скрипт в HTML:

```html
<script src="dargAndDrop.js"></script>
```

### English:

1. Copy the `dargAndDrop.js` file to your project
2. Include the script in your HTML:

```html
<script src="dargAndDrop.js"></script>
```

## 🛠️ Використання / Usage

### Українською:

#### Базове використання:

```javascript
// Створити екземпляр системи
const dragDropSystem = new DragDropSystem();

// Ініціалізувати з ID елементів
dragDropSystem.init(
  ["card1", "card2", "card3"], // ID елементів для перетягування
  ["target1", "target2", "dropZone"] // ID цільових зон
);
```

#### HTML структура:

```html
<!-- Drag елементи -->
<div id="card1" class="draggable-card">Картка 1</div>
<div id="card2" class="draggable-card">Картка 2</div>
<div id="card3" class="draggable-card">Картка 3</div>

<!-- Target зони -->
<div id="target1" class="drop-zone">Зона 1</div>
<div id="target2" class="drop-zone">Зона 2</div>
<div id="dropZone" class="drop-zone">Зона 3</div>
```

### English:

#### Basic Usage:

```javascript
// Create system instance
const dragDropSystem = new DragDropSystem();

// Initialize with element IDs
dragDropSystem.init(
  ["card1", "card2", "card3"], // IDs of draggable elements
  ["target1", "target2", "dropZone"] // IDs of target zones
);
```

#### HTML Structure:

```html
<!-- Draggable elements -->
<div id="card1" class="draggable-card">Card 1</div>
<div id="card2" class="draggable-card">Card 2</div>
<div id="card3" class="draggable-card">Card 3</div>

<!-- Target zones -->
<div id="target1" class="drop-zone">Zone 1</div>
<div id="target2" class="drop-zone">Zone 2</div>
<div id="dropZone" class="drop-zone">Zone 3</div>
```

## 🎨 CSS Стилі / CSS Styles

### Українською:

#### Обов'язкові властивості для drag елементів:

```css
.your-drag-style {
  /* ОБОВ'ЯЗКОВО для правильної роботи */
  user-select: none; /* Запобігає виділенню тексту */
  cursor: grab; /* Вказує що елемент можна перетягувати */

  /* РЕКОМЕНДОВАНО для кращої UX */
  transition: transform 0.2s ease; /* Плавні анімації */
}

.your-drag-style:active {
  cursor: grabbing; /* Зміна курсора при перетягуванні */
}
```

#### Рекомендовані властивості для target зон:

```css
.your-target-style {
  /* Візуально виділити як зону для скидання */
  border: 2px dashed #ccc;
  background-color: rgba(0, 0, 0, 0.1);

  /* РЕКОМЕНДОВАНО для кращої UX */
  transition: all 0.3s ease;
}
```

### English:

#### Required properties for drag elements:

```css
.your-drag-style {
  /* REQUIRED for proper functionality */
  user-select: none; /* Prevents text selection */
  cursor: grab; /* Indicates draggable element */

  /* RECOMMENDED for better UX */
  transition: transform 0.2s ease; /* Smooth animations */
}

.your-drag-style:active {
  cursor: grabbing; /* Cursor change during drag */
}
```

#### Recommended properties for target zones:

```css
.your-target-style {
  /* Visually indicate as drop zone */
  border: 2px dashed #ccc;
  background-color: rgba(0, 0, 0, 0.1);

  /* RECOMMENDED for better UX */
  transition: all 0.3s ease;
}
```

## ⚙️ Конфігурація / Configuration

### Українською:

#### Налаштування чутливості прилипання:

```javascript
// В класі можна змінити threshold (за замовчуванням 100px)
findNearestTarget(dragItem, threshold = 150) {
  // Більший threshold = легше прилипає
}
```

#### Додавання нових елементів динамічно:

```javascript
// Поки що система не підтримує динамічне додавання
// Потрібно повторно викликати init() з новими ID
dragDropSystem.init(
  ["card1", "card2", "newCard"],
  ["target1", "target2", "newTarget"]
);
```

### English:

#### Configuring snap sensitivity:

```javascript
// You can change threshold in the class (default 100px)
findNearestTarget(dragItem, threshold = 150) {
  // Higher threshold = easier snapping
}
```

#### Adding new elements dynamically:

```javascript
// Currently system doesn't support dynamic addition
// Need to call init() again with new IDs
dragDropSystem.init(
  ["card1", "card2", "newCard"],
  ["target1", "target2", "newTarget"]
);
```

## 📱 Мобільна підтримка / Mobile Support

### Українською:

- ✅ Повна підтримка touch events
- ✅ Запобігання скролу під час перетягування
- ✅ Оптимізація для iPad та планшетів
- ✅ Підтримка multi-touch (перший дотик)

### English:

- ✅ Full touch events support
- ✅ Scroll prevention during dragging
- ✅ iPad and tablet optimization
- ✅ Multi-touch support (first touch)

## 🐛 Наявні обмеження / Temporary Limitations

### Українською:

1. Немає підтримки динамічного додавання елементів
2. Тільки один елемент може перетягуватися одночасно
3. Target зони повинні існувати в DOM при ініціалізації
4. Немає callbacks для користувацьких дій

### English:

1. No dynamic element addition support
2. Only one element can be dragged at a time
3. Target zones must exist in DOM at initialization
4. No callbacks for custom actions

## 🔄 Майбутні покращення / Future Improvements

### Українською:

- [ ] Callbacks для подій (onDrop, onDragStart, onDragEnd)
- [ ] Динамічне додавання/видалення елементів
- [ ] Групування drag елементів
- [ ] Кастомні анімації
- [ ] Обмеження зон перетягування

### English:

- [ ] Event callbacks (onDrop, onDragStart, onDragEnd)
- [ ] Dynamic element addition/removal
- [ ] Drag element grouping
- [ ] Custom animations
- [ ] Drag area constraints
