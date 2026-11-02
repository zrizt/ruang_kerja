# RuangKerja

## Project overview

RuangKerja is a creative portfolio and community web app. The current implementation is a Vite + React single-page prototype with seeded in-memory project and profile data. Interactions such as search, filtering, likes, saves, follows, and adding a project are client-side only; they do not persist across reloads.

## Development setup

- Install dependencies with `npm install`.
- Start the local development server with `npm run dev`.
- Verify production compilation with `npm run build`.
- Preview a production build with `npm run preview`.
- The main app is in `src/main.jsx`; global styles and responsive layouts are in `src/styles.css`. The HTML entry point is `index.html`.
- There is currently no test, lint, or type-check script. Do not claim those checks passed unless they have been added and run.

## Guidance for future changes

- Preserve the warm, editorial visual identity and responsive behavior when extending the interface.
- Keep user-visible actions honest about whether data is local, saved, or shared. Do not imply persistence or successful remote actions until they are implemented.
- Prefer accessible native controls, meaningful labels, keyboard-operable interactions, and clear empty, loading, and error states.
- Validate user-provided project fields and uploaded images; enforce stated file type and size limits in code, not only in the interface.
- Keep changes focused, reuse existing dependencies where practical, and run `npm run build` after app changes.
- Confirm product and infrastructure decisions (especially backend, authentication, file storage, and hosting) before implementing integrations.

## Future development plan

This roadmap is directional. Validate product requirements and choose the backend and hosting approach before work that depends on them.

1. **Establish a maintainable, testable foundation**
   - Break the large page into focused components and separate mock data from presentation.
   - Add a test setup and cover key interactions: search, filters, likes/saves, follows, project creation, and modal behavior.
   - Improve accessibility and responsive behavior; validate project form input and image upload limits.
   - **Ready when:** the core flows have automated coverage and the production build succeeds.

2. **Deliver real accounts and portfolios**
   - Decide on the backend, authentication, persistence, and image-storage services.
   - Implement profile editing and durable project create, read, update, and delete flows.
   - Add authorization and user-facing loading, validation, and failure states.
   - **Ready when:** users can securely manage their profiles and projects across sessions.

3. **Make discovery and networking real**
   - Connect search, format filters, latest sorting, saved work, likes, and follows to persisted data.
   - Add pagination or another bounded loading strategy as the project collection grows.
   - **Ready when:** discovery and engagement state is consistent across sessions and users.

4. **Build community features**
   - Define requirements for activity, notifications, collections, and community events before implementation.
   - Add selected features using the established account and persistence model.
   - **Ready when:** each shipped community action has a clear user flow and persisted outcome.

5. **Prepare for release and ongoing operation**
   - Add CI checks for builds and tests, and document environment configuration and deployment.
   - Review accessibility, performance, privacy, and security; establish error monitoring and backup expectations appropriate to the chosen services.
   - **Ready when:** a documented deployment can be repeated and critical user flows are verified in the target environment.
