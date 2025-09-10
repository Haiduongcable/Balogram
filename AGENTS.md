# AGENTS.md

## Build, Lint, and Test Commands
- **Start app:** `npm start` or `expo start`
- **Start on Android:** `npm run android`
- **Start on iOS:** `npm run ios`
- **Start web:** `npm run web`
- **Eject:** `npm run eject`
- **No lint/test scripts defined by default`

## Code Style Guidelines
- Use ES6 imports: `import ... from '...'`.
- Indentation: 2 spaces.
- Prefer arrow functions for components and handlers.
- Naming: PascalCase for components, camelCase for variables and functions.
- Avoid unused variables and imports.
- For Redux: Actions in `actions/`, reducers in `reducers/`, store in `store.js`.
- Place API calls in `handle_api/` using Axios.
- Error handling: catch and handle exceptions, show user-friendly error messages.
- Use prop-types for components props validation.
- Organize assets in `assets/` and `images/` directories.
- Prefer functional components over class components.
- Keep UI logic in `components/`, screen logic in `screen/`, and business logic in helpers/.

- No Cursor or GitHub Copilot rules found in this project.
