# Setting Up Node.js and React with TypeScript and Tailwind CSS

This guide will walk you through the steps to install Node.js and set up a React project with TypeScript and Tailwind CSS.

## 1. Install Node.js

Node.js is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. Follow these steps to install Node.js:

- **Linux**:
    - Open your terminal.
    - Run the following command to install Node.js using `nvm` (Node Version Manager):
        ```bash
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
        ```
    - Close and reopen your terminal, or run the following command to start using `nvm`:
        ```bash
            source ~/.bashrc
        ```
    - Install the latest LTS version of Node.js:
        ```bash
            nvm install --lts
        ```
    - Verify the installation by checking the Node.js version:
        ```bash
            node --version
        ```

## 2. Set Up a React Project

Now that you have Node.js installed, you can set up a React project. We'll use `create-react-app` to bootstrap our project:

- Open your terminal or command prompt.

- Run the following command to create a new React project with TypeScript:
    ```bash
        npx create-react-app my-epytodo-front --template typescript
    ```

- Navigate to your project directory:
    ```bash
        cd my-epytodo-front
    ```

## 3. Add Tailwind CSS

Tailwind CSS is a utility-first CSS framework. Here's how you can add it to your React project:

- Install Tailwind CSS
    Install tailwindcss and its peer dependencies via npm, and create your ``tailwind.config.js`` file.
    ```bash
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init
    ```

- Add Tailwind to your PostCSS configuration
    Add tailwindcss and autoprefixer to your ``postcss.config.js`` file, or wherever PostCSS is configured in your project.
    ```bash
        module.exports = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        }
    ```

- Configure your template paths:
    Add the paths to all of your template files in your ``tailwind.config.js`` file.
    ```bash
        /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: ["./src/**/*.{html,js}"],
          theme: {
            extend: {},
          },
          plugins: [],
        }
    ```

- Add the Tailwind directives to your CSS
    Add the @tailwind directives for each of Tailwind’s layers to your main CSS file.
    ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
    ```

## 4. Start the Development Server

You're now ready to start the development server and see your React app in action:

- Run the following command:
    ```bash
        npm start
    ```

- Open your browser and navigate to `http://localhost:3000` to view your React app.

## Conclusion

You've successfully installed Node.js, set up a React project with TypeScript, and added Tailwind CSS for styling. You're now ready to start building your EpyTodo frontend application!
