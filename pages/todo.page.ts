import { type Page, type Locator, expect } from '@playwright/test';

export class TodoPage {
    readonly page: Page;

    // Header
    readonly inputText: Locator;
    readonly toggleAll: Locator;

    // View
    readonly view: Locator;
    readonly todoList: Locator;
    readonly todoItem: Locator;
    readonly todoTitle: Locator;

    // Action
    readonly edit: Locator;
    readonly delete: Locator;
    readonly toggleToDo: Locator;

    // Footer
    readonly footer: Locator;
    readonly todoCount: Locator;
    readonly filters: Locator;
    readonly listFilter: Locator;
    readonly clear: Locator;

    constructor(page: Page) {
        this.page = page;

        // Input
        this.inputText = page.locator('.new-todo, [placeholder="What needs to be done?"]'); // Todo text input
        this.toggleAll = page.locator('#toggle-all, .toggle-all'); // Toggle all

        // Action
        this.edit = page.locator('.todo-list li .edit, input.edit'); // Edit input
        this.delete = page.locator('.destroy, [aria-label="Delete"]'); // Delete button
        this.clear = page.locator('.clear-completed, [data-testid="clear-completed"]'); // Clear completed button
        this.toggleToDo = page.locator('.todo-list li .toggle, input.toggle'); // Toggle checkbox within item

        // View
        this.view = page.locator('.view'); // Display all todo lists
        this.todoList = page.locator('.todo-list'); // List of todo items
        this.todoItem = page.locator('.todo-list li'); // A single todo item
        this.todoTitle = page.locator('[data-testid="todo-title"], .todo-list li label'); // The title of a todo item

        // Footer
        this.footer = page.locator('.footer'); // Footer of the todo list
        this.todoCount = page.locator('[data-testid="todo-count"], .todo-count'); // Number of todo items
        this.filters = page.locator('.filters'); // Filters for todo items
        this.listFilter = page.locator('.filters a'); // Filter links
    }

    async goto(path: string = '') {
        await this.page.goto(path);
        await this.page.waitForLoadState('domcontentloaded');
    }

    getTodoItem(text: string): Locator {
        return this.todoItem.filter({ hasText: text });
    }

    async addTodo(text: string) {
        await this.inputText.fill(text);
        await this.inputText.press('Enter');
    }

    async deleteTodo(text: string) {
        const item = this.getTodoItem(text);
        const deleteBtn = item.locator('.destroy, [aria-label="Delete"]');
        await item.hover();
        await expect(deleteBtn).toBeVisible();
        await deleteBtn.click();
    }

    async toggleTodo(text: string) {
        const item = this.getTodoItem(text);
        await item.locator('.toggle, input[type="checkbox"]').click();
    }

    async editTodo(text: string, newText: string) {
        const item = this.getTodoItem(text);
        await item.locator('label').dblclick();
        const editInput = item.locator('.edit');
        await editInput.fill(newText);
        await editInput.press('Enter');
    }

    async filterTodos(filter: 'all' | 'active' | 'completed' | string) {
        await this.filters.getByRole('link', { name: new RegExp(`^${filter}$`, 'i') }).click();
    }

    async clearCompleted() {
        await this.clear.click();
    }
}
