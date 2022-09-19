![](https://github.com/Timbergrove/ophanim-2-angular-app/workflows/Ophanim%20CI/badge.svg?event=push)

# Ophanim 2 UI

The Angular front end for Ophanim 2

## Prerequisites

The following tools are needed to work with this repository:

- [Node.js](https://nodejs.org/en/) (LTS)
- [NPM](https://www.npmjs.com/) (latest)

Read how to install and set up both these tools [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Dependencies

Before running the application on your machine for the first time, install project dependencies:

```bash
npm install
```

This command also needs to be executed when you fetch the latest commits where somebody else updated the dependencies.

## Development

You can run the application locally using the following NPM script:

```bash
npm run start
```

The application will be run on http://localhost:4200 by default and it will fetch data from https://ophanim2-api-qa.timbergrove.com.

## Testing

### Storybook

Storybook runs outside of the main app so you can develop and test UI components in isolation without running the Angular application.
Just start the Storybook:

```
npm run storybook
```

http://localhost:6006/ will be opened in your web browser.

### Cypress

Start the Angular CLI Server first:

```
npm run start
```

Keep this process running and run Cypress in another window:

```
npm run cypress:open
```

Cypress Test Runner will launch.
Use this application to run and debug E2E tests.

### Continuous Integration (CI)

A small CI job is run every time a pull request is created or updated.
It primarily verifies that the applications can be built without any errors.
But it also checks if the code is properly formatted and there are no linting errors.

The formatting and linting tools are run automatically on your machine whenever you commit some changes.
If they are not run and the first time you see formatting errors is when a CI job fails, try to run the following command on your machine:

```bash
npm run format:fix:all
```

If you see linting errors in the output of the CI job, you need to fix them manually.
