import { test, expect } from '@playwright/test';

test('user can add a todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    page.fill('.new-todo', 'Buy groceries');
    page.keyboard.press('Enter');

    await page.waitForTimeout(3000);

    const todos = await page.$$('.todo-list li');
    expect(todos.length == 1);

    const text = await page.$eval('.todo-list li label', el => el.innerText);
    if (text = 'Buy groceries') {
        console.log('Test passed');
    }
});
