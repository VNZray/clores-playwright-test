# Todo List Automation Tests

## Commands

- `npm run test` - Run all tests (headless mode)
- `npm run test:ui` - Run tests in UI mode
- `npm run test:headed` - Run tests in headed mode
- `npm run test:debug` - Run tests in debug mode
- `npm run test:report` - Show test report

## Project Structure

```
clores-playwright-test/
├── pages/                # Page Object Model classes
│   └── todo.page.ts      # Todo page
├── tests/                # Test files
│   ├── todo.spec.ts      # Todo tests
├── fixtures/             # Fixtures for tests
│   └── todo.fixture.ts   # Todo fixtures
├── playwright.config.ts   # Playwright configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm i
   ```

   ```bash
   npm install
   ```

2. **Run tests (headless mode)**

   ```bash
   npm run test
   ```

3. **Run tests (UI mode)**

   ```bash
   npm run test:ui
   ```

4. **Run tests (headed mode)**

   ```bash
   npm run test:headed
   ```

5. **Run tests (debug mode)**

   ```bash
   npm run test:debug
   ```

6. **Show test report**

   ```bash
   npm run test:report
   ```

## Tips

If the test files are not detected move the project outside ONEDRIVE folder.
For example PS C:\Users\clores\Project\clores-playwright-test\>
