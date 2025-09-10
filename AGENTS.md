# AGENTS.md

## Build, Lint, and Test Commands
- **Start app:** `npm start` or `expo start`
- **Start on Android:** `npm run android` or `expo start --android`
- **Start on iOS:** `npm run ios` or `expo start --ios`
- **Start web:** `npm run web` or `expo start --web`
- **Eject:** `npm run eject`
- **No lint/test scripts defined** - create them if needed

## Code Style Guidelines
- **Imports:** Use ES6 imports `import ... from '...'`; group React Native imports together
- **Indentation:** 2 spaces (no tabs)
- **Components:** Export default functional components, use arrow functions for handlers
- **Naming:** PascalCase for components/screens, camelCase for variables/functions/files
- **Props:** Use destructuring with spread operator `{...props}`, validate with prop-types
- **Styling:** Use StyleSheet.create(), place styles at bottom of file
- **State:** Use React hooks (useState, useEffect), Redux for global state
- **API:** Place calls in `handle_api/` using Axios, use async/await with try/catch
- **Error handling:** Show user-friendly messages with Toast, log errors to console
- **File organization:** Components in `components/`, screens in `screen/`, API in `handle_api/`
- **Dependencies:** React Native Paper for UI, React Navigation for routing, Expo SDK ~42
