# report_project_Angular

**report_project_Angular** is a web application built using Angular, serving as the frontend for the **report_project_FastAPI** backend. It provides an intuitive interface for managing invoices, users, cost centers, and generating expense reports.

## Contents

- [Running the Application](#running-the-application)
- [Application Structure](#application-structure)
- [Environment Setup](#environment-setup)
- [Features](#features)
- [Technologies](#technologies)

---

## Running the Application

To run the project locally, follow these steps:

1. **Clone the Repository**:

    If you are downloading the project from GitHub, clone the repository using `git clone`:

    ```bash
    git clone https://github.com/anasicic/report_project_angular.git
    ```

2. **Navigate to the Project Directory**:

    After cloning the project, navigate to the project directory:

    ```bash
    cd report_project_Angular
    ```

3. **Install Required Packages**:

    Install all the necessary dependencies specified in the `package.json` file using `npm`:

    ```bash
    npm install
    ```

4. **Run the Development Server**:

    Start the Angular development server:

    ```bash
    ng serve
    ```

5. **Open a Browser and Go To**:

    Open the following URL in your browser to access the application:

    ```url
    http://localhost:4200/
    ```

---

## Application Structure

The application is organized into the following main modules and directories:

- **auth**: Handles user authentication (login/logout) and route guards for protected routes.
- **dashboard**: Displays key metrics and visualizations, such as expenses grouped by cost centers.
- **invoices**: Provides functionality for adding, updating, deleting, and listing invoices.
- **users**: Manages user accounts, including profile updates and role assignments.
- **shared**: Contains reusable components, services, and directives used throughout the application.

The codebase adheres to Angular's best practices, ensuring maintainability and scalability.

---

## Environment Setup

The application uses Angular's environment configuration files located in the `src/environments` directory:

- `environment.ts`: Used for local development.
- `environment.prod.ts`: Used for production builds.

### Customizing the Backend API URL

To modify the API URL, update the `apiUrl` property in the relevant environment file. Example:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
