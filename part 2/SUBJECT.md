# Review of concepts from Part 1
Before proceeding with Todolist functionality and drag and drop integration, let's review the concepts covered in Part 1. Ensure you have completed the following:

- Creation of a React project with JavaScript  
- Integration of Tailwind CSS for styling  
- Implementation of login, register, home, and not found pages  
- Familiarity with React Router for page navigation  

If you haven't completed Part 1, please refer back to the [Workshop Frontend EpyTodo - Part 1](../part1/SUBJECT.md) subject.

# Introduction to Todolist functionality and Drag and Drop

In this section, we will introduce the Todolist functionality and the concept of drag and drop. The Todolist functionality will allow users to create, read, update, and delete tasks. The drag and drop feature will enable users to rearrange the tasks in the Todolist.

## Integration of Drag and Drop library

To integrate drag and drop functionality, we will use the `react-dnd` library. This library provides a smooth and seamless drag and drop experience for users.

:arrow_right: Follow the steps described [here](INSTALL%20AND%20SETUP.md#Integrate Drag and Drops) to integrate the `react-dnd` library into your React project.

## Designing the Todolist

:checkered_flag: <u>Objectives of the Todolist</u>:
- ``Todolist`` component to display the list of tasks. Use the `DndProvider` component from the `react-dnd` library to wrap the `TodoColumn` component.
- ``TodoColumn``: This component will contain the list of tasks. Use the `DndProvider` component from the `react-dnd` library to wrap the `TodoColumn` component.
- ``TodoTask``: This component will represent a single task in the Todolist and will contain the task details (``title``, ``description``, ``created_at``, ``due_time``, ``status``). Use the `useDrag` hook from the `react-dnd` library to make the task draggable.


> [!NOTE]
> For more information on how to use the `react-dnd` library, you can refer to the [official documentation](https://www.npmjs.com/package/react-dnd).

> [!TIP]
> For rendering the list of tasks, you can use the ``map`` function to iterate over the tasks and render the ``TodoTask`` component for each task in the TodoColumn.

<details>
  <summary>If you need help for the TodoColumn, you can refer to the following example (SPOILER).</summary>

    ```js
      import React from 'react';
      import TodoTask from './TodoTask';
      import { DndProvider, useDrag, useDrop } from 'react-dnd';
      import { HTML5Backend } from 'react-dnd-html5-backend';

      const TodoColumn = ({ tasks, status, onMoveTask, onDragStart, onDragEnd }) => {
        const [{ isOver }, drop] = useDrop({
          accept: 'task',
          drop: (item) => onMoveTask(item.id, status),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
          }),
        });

        return (
          <div ref={drop} className='w-1/3 p-4 border-2 border-gray-300 rounded-md'>
            <h2 className='text-lg font-bold'>{status}</h2>
            {tasks.map((task, index) => (
              <TodoTask
                key={task.id}
                task={task}
                index={index}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))}
          </div>
        );
      };

      export default TodoColumn;
    ```
</details>

<details>
  <summary>If you need help for the TodoTask, you can refer to the following example (SPOILER).</summary>

    ```js
      import React from 'react';
      import { useDrag } from 'react-dnd';

      const TodoTask = ({ task, index, onDragStart, onDragEnd }) => {
        const [{ isDragging }, drag] = useDrag({
          type: 'task',
          item: { id: task.id, index },
          begin: () => onDragStart(task.id),
          end: () => onDragEnd(),
          collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
          }),
        });

        return (
          <div ref={drag}>
            { /* Your task card */ }
          </div>
        );
      };

      export default TodoTask;
    ```
</details>

<details>
  <summary>If you need help for the Todolist, you can refer to the following example (SPOILER).</summary>

    ```js
      import React, { useState } from 'react';
      import TodoColumn from './TodoColumn';
      import { DndProvider } from 'react-dnd';
      import { HTML5Backend } from 'react-dnd-html5-backend';

      const Todolist = () => {
        const [tasks, setTasks] = useState([]);

        const onMoveTask = (taskId, status) => {
          // Move the task to the new status
        };

        const onDragStart = (taskId) => {
          // Set the dragging task
        };

        const onDragEnd = () => {
          // Reset the dragging task
        };

        return (
          <DndProvider backend={HTML5Backend}>
            <div className='flex justify-center space-x-4'>
              <TodoColumn
                tasks={tasks.filter((task) => task.status === 'todo')}
                status='Todo'
                onMoveTask={onMoveTask}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
              <TodoColumn
                tasks={tasks.filter((task) => task.status === 'in-progress')}
                status='In Progress'
                onMoveTask={onMoveTask}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
              <TodoColumn
                tasks={tasks.filter((task) => task.status === 'done')}
                status='Done'
                onMoveTask={onMoveTask}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            </div>
          </DndProvider>
        );
      };

      export default Todolist;
    ```
</details>

> [!NOTE]
> To get the list of tasks of the user, you can make a request to the backend using the `axios` library. You can refer to the [official documentation](https://www.npmjs.com/package/axios) for more information on how to use the `axios` library.


## Add, update, and delete tasks

:checkered_flag: <u>Objectives of the Todolist</u>:
- Add a form to create a new task with the following fields: ``title``, ``description``, ``due_time``.
- Add a dropable area to delete the dragged task.
- Add a form to update the task details.

The form to create a new task should is the same as the form to register a new user. You can refer to the [previous workshop](../part%201/SUBJECT.md#register-page) for the form design and validation.

> [!TIP]
> Use the `axios` library to make requests to the backend. [How to use axios?](USEFUL%20RESOURCES.md#axios).

> [!TIP]
> [How to save the user's authentication state?](USEFUL%20RESOURCES.md#how-to-save-the-users-authentication-state)

<details>
  <summary>If you need help for the DeleteTaskArea, you can refer to the following example (SPOILER).</summary>

```js
import React from 'react';
import { useDrop } from 'react-dnd'; // Add the missing import statement
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  due_time: string;
}

interface DeleteTaskAreaProps {
  onDropToDelete: (taskId: number) => void;
}

const DeleteTaskArea: React.FC<DeleteTaskAreaProps> = ({ onDropToDelete }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: Task) => onDropToDelete(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className='w-1/3 p-4 border-2 border-gray-300 rounded-md'>
      <h2 className='text-lg font-bold'>Delete</h2>
    </div>
  );
};

export default DeleteTaskArea;
```
</details>

How to edit the fields of a task? How to display the task details in a form? How to handle the form submission? Think about [modals](USEFUL%20RESOURCES.md#modals) to display the form to update the task details.

> [!TIP]
> _:sparkles: **Congratulations!** You have successfully implemented the Todolist functionality and drag and drop integration. You can now customize the Todolist according to your requirements and add more features to enhance the user experience._
