import { test, expect } from '../fixtures/todo.fixture';
import { TODO_LIST } from '../types/todo';

test.describe('Test Todo App', () => {

  test('Scenario 1: Add a todo item - verify it appears in the list and the items-left counter updates correctly.', async ({ todoPage }) => {
    // Add first todo
    await todoPage.addTodo(TODO_LIST[0].title);

    // Auto-waiting assertions
    await expect(todoPage.inputText).toBeEmpty();
    await expect(todoPage.todoTitle).toHaveText([TODO_LIST[0].title]);
    await expect(todoPage.todoCount).toHaveText(/1 item left/);

    // Add second todo
    await todoPage.addTodo(TODO_LIST[1].title);
    await expect(todoPage.todoTitle).toHaveText([TODO_LIST[0].title, TODO_LIST[1].title]);
    await expect(todoPage.todoCount).toHaveText(/2 items left/);
  });

  test('Scenario 2: Mark a todo item as complete - verify it gets the "completed" styling/state and the counter updates.', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_LIST[2].title);
    await todoPage.addTodo(TODO_LIST[3].title);

    const todoItem1 = todoPage.getTodoItem(TODO_LIST[2].title);
    const todoItem2 = todoPage.getTodoItem(TODO_LIST[3].title);

    // Toggle the first item as completed
    await todoPage.toggleTodo(TODO_LIST[2].title);

    // Auto-waiting assertion for class change, checkbox checked state, and count update
    await expect(todoItem1).toHaveClass(/completed/);
    await expect(todoItem1.locator('.toggle')).toBeChecked();
    await expect(todoItem2).not.toHaveClass(/completed/);
    await expect(todoPage.todoCount).toHaveText(/1 item left/);
  });

  test(`Scenario 3: Delete a todo item - verify it's removed from the list.`, async ({ todoPage }) => {
    await todoPage.addTodo(TODO_LIST[4].title);
    await todoPage.addTodo(TODO_LIST[5].title);

    await expect(todoPage.todoItem).toHaveCount(2);

    // Delete target todo
    await todoPage.deleteTodo(TODO_LIST[4].title);

    // Auto-waiting assertions verifying removal
    await expect(todoPage.todoItem).toHaveCount(1);
    await expect(todoPage.todoTitle).toHaveText([TODO_LIST[5].title]);
    await expect(todoPage.getTodoItem(TODO_LIST[4].title)).toBeHidden();
    await expect(todoPage.todoCount).toHaveText(/1 item left/);
  });

  test(`Scenario 4: Filter todos - add at least 3 items, complete one, then verify the "Active" and "Completed" filters show the correct items.`, async ({ todoPage }) => {
    await todoPage.addTodo(TODO_LIST[6].title);
    await todoPage.addTodo(TODO_LIST[7].title);
    await todoPage.addTodo(TODO_LIST[8].title);

    // Complete one todo
    await todoPage.toggleTodo(TODO_LIST[6].title);

    // Filter by Active
    await todoPage.filterTodos('active');
    await expect(todoPage.todoTitle).toHaveText([TODO_LIST[7].title, TODO_LIST[8].title]);
    await expect(todoPage.getTodoItem(TODO_LIST[6].title)).toBeHidden();

    // Filter by Completed
    await todoPage.filterTodos('completed');
    await expect(todoPage.todoTitle).toHaveText([TODO_LIST[6].title]);
    await expect(todoPage.getTodoItem(TODO_LIST[7].title)).toBeHidden();
    await expect(todoPage.getTodoItem(TODO_LIST[8].title)).toBeHidden();

    // Filter by All
    await todoPage.filterTodos('all');
    await expect(todoPage.todoTitle).toHaveText([TODO_LIST[6].title, TODO_LIST[7].title, TODO_LIST[8].title]);
    await expect(todoPage.todoItem).toHaveCount(3);
    await expect(todoPage.todoCount).toHaveText(/2 items left/);
  });

  test('Scenario 5 (Edge Case): Adding empty to do list', async ({ todoPage }) => {
    await todoPage.addTodo('');
    await expect(todoPage.todoItem).toHaveCount(0);
  });

});