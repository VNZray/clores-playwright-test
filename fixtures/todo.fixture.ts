import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

type TodoFixtures = {
    todoPage: TodoPage;
};

export const test = base.extend<TodoFixtures>({
    todoPage: async ({ page }, use) => {
        // 1. Initialize POM
        const todoPage = new TodoPage(page);

        // 2. Automatically navigate before the test
        await todoPage.goto();

        // 3. Provide fixture to the test
        await use(todoPage);
    },
});

export { expect } from '@playwright/test';
