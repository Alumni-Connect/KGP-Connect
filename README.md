# KGPConnect: Commit Message Guide

## Commit Message Rules

### Structure

1. **Title (Required)**: A concise, imperative summary of the change (max 50 characters).
   - Example: `Fix broken navigation link`
2. **Body (Optional)**: Detailed explanation of what and why (wrapped at 72 characters).
   - Example:
     ```
     Refactored navigation logic to improve performance. Removed redundant DOM manipulations.
     ```
3. **Footer (Optional)**: References to issue IDs or breaking changes.
   - Example:
     ```
     Fixes #123
     BREAKING CHANGE: Updated middleware; reconfigure client-side login.
     ```

### Guidelines

1. Use the imperative mood.
   - **Good**: `Add feature toggle for settings`
   - **Bad**: `Added feature toggle for settings`
2. Be specific and avoid vague messages.
   - **Good**: `Remove unused dashboard styles`
   - **Bad**: `Fix issues`
3. Capitalize the first word.
4. Keep the title short (max 50 characters).
5. Explain why changes were made in the body.

### Common Commit Types

| Prefix      | Description                                  |
| ----------- | -------------------------------------------- |
| `feat:`     | Introduces a new feature                     |
| `fix:`      | Fixes a bug                                  |
| `docs:`     | Updates or adds documentation                |
| `style:`    | Code formatting changes (no logic changes)   |
| `refactor:` | Code refactoring (no features/bug fixes)     |
| `test:`     | Adds or modifies tests                       |
| `chore:`    | Maintenance tasks (e.g., dependency updates) |

---

By following these rules, we ensure clarity, traceability, and maintainability in the KGPConnect codebase.
