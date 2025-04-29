# test-automation-wdio

Test automation with WDIO

# Groceries Automation Project

This project contains automated tests for various features, including UI tests for a Rick and Morty application and API tests for JSONPlaceholder.

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or later recommended)
- [npm](https://www.npmjs.com/) (Comes bundled with Node.js)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd groceries-automation
    ```

2.  **Install dependencies:**
    It's recommended to use `npm ci` for clean installs, especially in CI environments, as it uses the `package-lock.json`. For local development, `npm install` also works.
    ```bash
    npm ci
    ```
    or
    ```bash
    npm install
    ```

## Running Tests Locally

You can run different sets of tests using the defined npm scripts in `package.json`. Here are some common examples:

- **Run all regression tests (likely includes both UI and API):**

  ```bash
  npm run test:regression
  ```

- **Run only the Rick and Morty UI tests:**

  ```bash
  npm run test:RickAndMorty
  ```

- **Run only the JSONPlaceholder API tests:**
  ```bash
  npm run test:api
  ```

Refer to the `scripts` section in your `package.json` file for a complete list of available test execution commands.

## Running Tests via GitHub Actions (Manual Trigger)

You can manually trigger specific test runs using the GitHub Actions interface for workflows enabled with `workflow_dispatch`.

**To run the "Pickles" workflow:**

1.  Navigate to the repository on GitHub.
2.  Click on the **Actions** tab.
3.  In the left sidebar, find and click on the workflow named **Pickles**.
4.  You will see a message "This workflow has a `workflow_dispatch` event trigger." Click the **Run workflow** button located towards the right side.
5.  Select the branch you want to run the workflow on (usually `main`).
6.  Click the green **Run workflow** button to start the execution.
