# Part 3 - Written Questions

1. What is the difference between page.click() and page.locator().click()? Why does Playwright recommend locators?

- page.click() it queries the DOM and perform actions immediately. While page.locator().click() uses a lazy pointer that only execute when the action is performend and the element is ready. Playwright recommend page.locator().click() over page.click() because it is lazy, enforeces stricter auto-waiting, and reusable.

2. Explain Playwright's auto-waiting mechanism. Why is waitForTimeout() generally discouraged?

- Auto-waiting in playwright ensures the element is visible, stable, enabled, and ready before performing an actions. waitForTimeout() is generally discouraged because it pauses the execution for a fixed duration (seconds/miliseconds), making the test brittle and slow.

3. What is a Playwright fixture, and give one example of when you'd create a custom one?

- Fixture is a reusable environment or piece of setup state that automatically injected directly into a test via dependency injection. It uses is similar to beforeEacch or afterEach in unit test. One example that I would create a fixture s when testing page that requires authentication with role based access to avoid writing login step on each test.

4. Your test suite takes 20 minutes to run sequentially.Name one Playwright feature that could speed this up, and briefly explain how it works.

- Parallel Workers. This feature run the individual test cases in a test file or multiple test files concurrently across multiple browser. Each workers has its own isolated environment including its browser instance, test state, and context. The workers proceed to the next available test once the previous test is completed instead of running test sequentially one by one.

5. A test passes locally but fails intermittently in CI. List two possible causes you'd investigate first.

- Missing Awaits: I would check if the test is missing any 'await' keyword on async functions.
- Execution Latency: I would check first the number of workers running on CI, since the CI runners are typically have fewer CPU cores and less RAM than local machines.
