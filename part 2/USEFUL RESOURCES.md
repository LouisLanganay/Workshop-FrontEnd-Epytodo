# Integrate Drag and Drop
In this section, we will integrate the `react-dnd` library to enable drag and drop functionality in the Todolist application.

1. **Install the `react-dnd` library:**
Open your terminal and run the following command to install the `react-dnd` library:

```bash
npm install react-dnd @types/react-dnd
```

> [!TIP]
> Use the official documentation of the `react-dnd` library to learn more about its features and usage. [react-dnd Documentation](https://react-dnd.github.io/react-dnd/docs/overview)

2. Example of drag and drop functionality:

```js
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DragAndDropExample = () => {
  const [items, setItems] = useState([
    { type: 'item', id: 1, index: 0 },
    { type: 'item', id: 2, index: 1 },
    { type: 'item', id: 3, index: 2 },
  ]);

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      return newItems.map((item, index) => ({ ...item, index }));
    });
  };

  const renderItem = (item, index) => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: 'item', id: item.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'item',
      hover: (item) => {
        if (item.index !== index) {
          moveItem(item.index, index);
        }
      },
    });

    return (
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {item.id}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    </DndProvider>
  );
};

export default DragAndDropExample;

```

# Modals

In this section, we will introduce the concept of modals.
A modal is a dialog box or popup window that is displayed on top of the current page to provide additional information or functionality.

1. **Create your modal component:**
Open the `src/components` folder and create a new file named `Modal.tsx`. This file will contain the code for your modal component.

2. **Implement the modal component:**
Implement the `Modal` component using the following code:
```js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-4 rounded-md'>
        {children}
        <button onClick={onClose}>Close modal</button>
      </div>
    </div>
  );
};

export default Modal;

```

3. **Use the modal component:**

You can use the `Modal` component in your application by passing the `isOpen` and `onClose` props.

```js
import React, { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Edit task</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        { /* Your task edit form */ }
      </Modal>
    </div>
  );
};

export default App;
```

# Tailwind CSS

:arrow_right: Refer to the [previous workshop](../part%201/USEFUL%20RESOURCES.md#how-to-style-using-tailwind-css) for more information on how to style using Tailwind CSS.