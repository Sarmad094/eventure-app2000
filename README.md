# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Eventure Frontend

Eventure is a React-based web application for event booking. It connects students with organizations that host courses and events.

## Technologies

- React 18  
- React Router DOM  
- Axios  
- JavaScript (ES6+)  
- Custom CSS styling  

## Getting Started

### Prerequisites

- Node.js (version X.X or later)  
- npm or yarn

### Installation

1. Clone the repository:  
   `git clone https://github.com/username/projectname-frontend.git`

2. Navigate to the project directory:  
   `cd projectname-frontend`

3. Install dependencies:  
   `npm install`

4. Start the development server:  
   `npm run dev`

The application will run at: `http://localhost:3000`

## Environment Variables

The frontend connects to the backend API using:



This value is hardcoded in service files but can be modified if necessary.

## Available Scripts

- `npm start` – Start development server  
- `npm run build` – Build the app for production  
- `npm test` – Run the test suite  
- `npm run eject` – Eject configuration (irreversible)

## Features

- Student registration and login  
- Organization login and event publishing  
- Event browsing, booking, and payment  
- Responsive design for desktop and mobile

## Important Pages

- `/welcome/1` – Welcome page  
- `/login/1` – Student login  
- `/orglogin` – Organization login  
- `/home/1` – Student homepage  
- `/comphome` – Organization homepage  
- `/profile` – Student profile and bookings

## Folder Structure

src/
├── Components/ # React components
├── Services/ # API service modules
├── State management/ # Context providers (AuthContext, etc.)
├── Styles/ # CSS files
├── Api/ # Axios configuration and helpers
└── App.jsx # Main application file with routes


## Contributing

1. Fork the repository  
2. Create a new branch: `git checkout -b feature/your-feature`  
3. Commit your changes: `git commit -m "Add new feature"`  
4. Push the branch: `git push origin feature/your-feature`  
5. Open a pull request

## License

This project is licensed under the MIT License.
