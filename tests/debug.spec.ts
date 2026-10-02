import { test, expect } from '@playwright/test';

test('user can add a todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Bug: Missing 'await' on async operations and using legacy page.fill() without locator-based auto-waiting.
    // Fix: Replaced with page.locator().fill() and added 'await' to both operations.
    await page.locator('.new-todo').fill('Buy groceries');
    await page.keyboard.press('Enter');

    // Bug: Causes flakiness and slow runs.
    // Fix: Removed explicit waitForTimeout because auto-waiting is already handled by Playwright's web-first assertions.

    // Bug: Legacy Locator page.$$ returns a static ElementHandle array without auto-waiting.
    // Fix: Used page.locator() for lazy evaluation and auto-retrying.
    const todos = page.locator('.todo-list li');

    // Bug: Synchronous and uses non-polling check on a locator property instead of an assertion.
    // Fix: Used web-first assertion.
    await expect(todos).toHaveCount(1);

    // Bug:  innerText is not supported for SVG elements and unnecessary if statement for checking and logging the test result. = is an assignment operator not an equality operator 
    // Fix: Used expect().toHaveText() for automatic polling and test failure on text mismatch.
    await expect(page.locator('.todo-list li label')).toHaveText('Buy groceries');
});