# Setting Up Node.js and React with TypeScript and Tailwind CSS

This guide will walk you through the steps to install Node.js and set up a React project with TypeScript and Tailwind CSS.

## Install Node.js

Node.js is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. Follow these steps to install Node.js:

1. Open your terminal.  
2. Run the following command to install Node.js using `nvm` (Node Version Manager):  
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```
3. Close and reopen your terminal, or run the following command to start using `nvm`:  
```bash
source ~/.bashrc
```
4. Install the latest LTS version of Node.js:  
```bash
nvm install --lts
```
5. Verify the installation by checking the Node.js version:  
```bash
node --version
```

## Set Up a React Project

Now that you have Node.js installed, you can set up a React project. We'll use `create-react-app` to bootstrap our project:

1. Open your terminal or command prompt.  
2. Run the following command to create a new React project with TypeScript:  
```bash
npx create-react-app my-epytodo-front --template typescript
```
3. Navigate to your project directory:  
```bash
cd my-epytodo-front
```

## Add Tailwind CSS

Tailwind CSS is a utility-first CSS framework[^1]. Here's how you can add it to your React project:

1. Install Tailwind CSS:  
&nbsp;&nbsp;&nbsp;&nbsp;Install tailwindcss and its peer dependencies via npm, and create your ``tailwind.config.js`` file.  
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```
2. Add Tailwind to your PostCSS configuration:  
&nbsp;&nbsp;&nbsp;&nbsp;Add tailwindcss and autoprefixer to your ``postcss.config.js`` file, or wherever PostCSS is configured in your project.  
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
3. Configure your template paths:  
&nbsp;&nbsp;&nbsp;&nbsp;Add the paths to all of your template files in your ``tailwind.config.js`` file.  
```js
export const content = [
  './src/**/**/*.{js,jsx,ts,tsx}'
];
export const theme = {};
export const plugins = [];
```

4. Add the Tailwind directives to your CSS:  
&nbsp;&nbsp;&nbsp;&nbsp;Add the @tailwind directives for each of Tailwind’s layers to your main CSS file (``src/index.css``).  
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Start the Development Server

You're now ready to start the development server and see your React app in action:

1. Run the following command:  
```bash
npm start
```
2. Open your browser and navigate to `http://localhost:3000` to view your React app.

## Conclusion

You've successfully installed Node.js, set up a React project with TypeScript, and added Tailwind CSS for styling. You're now ready to start building your EpyTodo frontend application!


[^1]: [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build designs directly in your markup. It is a great tool to rapidly build custom designs without leaving your HTML.