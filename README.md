# University of Helsinki - Full Stack Open 2021
Taking the University of Helsinki [Full Stack Open 2021 MOOC Course](https://fullstackopen.com/en) 💪

## About the course
> This course serves as an introduction to modern web application development with JavaScript. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js. The course also contains a section on GraphQL, a modern alternative to REST APIs.
>
> The course covers testing, configuration and environment management, and the use of MongoDB for storing the application’s data.
>
> The course is worth 5-12 credits, and the content is the same as in the Full stack course held at the Department of Computer Science at the University of Helsinki in Spring 2020. There is also an associated project that is worth 1-10 credits.
>
> Partners and affiliates of the course include Houston Inc, Terveystalo, Elisa, K-ryhmä, Unity Technologies and Konecranes. See here for guest lectures on course-related topics given by various experts from our partners and affiliates.
>
> Participants are expected to have good programming skills, basic knowledge of web programming and databases, and to know the basics of working with the Git version-control system. You are also expected to have perseverance and the ability for independent problem solving and information seeking.
>
> Part 0 of the course material goes through the content and conduct of the course in more detail. Make sure to read the material and instructions thoroughly.

## Certificates

TBA

## Course exercises

### Part 0 - Fundamentals of Web apps
> In this part, we will familiarize ourselves with the practicalities of taking the course. After that we will have an overview of the basics of web development, and also talk about the advances in web application development during the last few decades.
- a General info
- b Fundamentals of Web apps
- [x] Finished

### Part 1 - Introduction to React
> In this part, we will familiarize ourselves with the React-library, which we will be using to write the code that runs in the browser. We will also look at some features of JavaScript that are important for understanding React.
- a Introduction to React
- b JavaScript
- c Component state, event handlers
- d A more complex state, debugging React apps
- [x] Finished

### Part 2 - Communicating with server
> Let's continue our introduction to React. First, we will take a look at how to render a data collection, like a list of names, to the screen. After this, we will inspect how a user can submit data to a React application using HTML forms. Next, our focus shifts towards looking at how JavaScript code in the browser can fetch and handle data stored in a remote backend server. Lastly, we will take a quick look at a few simple ways of adding CSS styles to our React applications.
- a Rendering a collection, modules
- b Forms
- c Getting data from server
- d Altering data in server
- e Adding styles to React app
- [x] Finished

### Part 3 - Programming a server with NodeJS and Express
> In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.
- a Node.js and Express
- b Deploying app to internet
- c Saving data to MongoDB
- d Validation and ESLint
- [x] Finished

### Part 4 - Testing Express servers, user administration
> In this part, we will continue our work on the backend. Our first major theme will be writing unit and integration tests for the backend. After we have covered testing, we will take a look at implementing user authentication and authorization.
- a Structure of backend application, introduction to testing
- b Testing the backend
- c User administration
- d Token authentication
- [x] Finished

### Part 5 - Testing React apps
> In this part we return to the frontend, first looking at different possibilities for testing the React code. We will also implement token based authentication which will enable users to log in to our application.
- a Login in frontend
- b props.children and proptypes
- c Testing React apps
- d End to end testing
- [x] Finished

### Part 6 - State management with Redux
> So far, we have placed the application's state and state logic directly inside React-components. When applications grow larger, state management should be moved outside React-components. In this part, we will introduce the Redux-library, which is currently the most popular solution for managing the state of React-applications. 
- a Flux-architecture and Redux
- b Many reducers
- c Communicating with server in a redux application
- d connect
- [x] Finished

### Part 7 - React router, custom hooks, styling app with CSS and webpack
> The seventh part of the course touches on several different themes. First, we'll get familiar with React router. React router helps us divide the application into different views that are shown based on the URL in the browser's address bar. After this, we'll look at a few more ways to add CSS-styles to React applications. During the entire course we've used create-react-app to generate the body of our applications. This time we'll take a look under the hood: we'll learn how Webpack works and how we can use it to configure the application ourselves. We shall also have a look on hook-functions and how to define a custom hook.
- a React-router
- b Custom hooks
- c More about styles
- d Webpack
- e Class components, Miscellaneous
- f Exercises: extending the bloglist
- [x] Finished

### Part 8 - GraphQL
> This part of the course is about GraphQL, Facebook's alternative to REST for communication between browser and a server.
- a GraphQL-server
- b React and GraphQL
- c Database and user administration
- d Login and updating the cache
- e Fragments and subscriptions
- [x] Finished

### Part 9 - Typescript
> This part is all about TypeScript: an open-source typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript.
> 
> In this part we will be using the tools previously introduced to build end-to-end features to an existing ecosystem with linters predefined and an existing codebase writing TypeScript. After doing this part you should be able to understand, develop and configure projects using TypeScript.
>
> This part is created by Tuomo Torppa, Tuukka Peuraniemi and Jani Rapo the awesome developers of Terveystalo, the largest private healthcare service provider in Finland. Terveystalo’s nationwide network covers 300 locations across Finland. The clinic network is supplemented by 24/7 digital services.
- a Background and introduction
- b First steps with TypeScript
- c Typing the express app
- d React with types
- [x] Finished

### Part 10 - React Native
> In this part, we will learn how to build native Android and iOS mobile applications with JavaScript and React using the React Native framework. We will dive into the React Native ecosystem by developing an entire mobile application from scratch. Along the way, we will learn concepts such as how to render native user interface components with React Native, how to create beautiful user interfaces, how to communicate with a server, and how to test a React Native application.
- a Introduction to React Native
- b React Native basics
- c Communicating with server
- d Testing and extending our application
- https://github.com/Shirajuki/rate-repository-app
- [ ] Finished

### Part 11 - CI/CD
> So you have a fresh feature ready to be shipped. What happens next? Do you upload files to a server manually? How do you manage the version of your product running in the wild? How do you make sure it works, and roll back to a safe version if it doesn’t?
> 
> Doing all the above manually is a pain and doesn’t scale well for a larger team. That’s why we have Continuous Integration / Continuous Delivery systems, A.K.A. CI/CD systems. In this module, you will gain an understanding of why you should use a CI/CD system, what can one do for you, and how to get started with GitHub Actions which is available to all GitHub users by default.
> 
> This module was crafted by the Engineering Team at Smartly.io. At Smartly.io, we automate every step of social advertising to unlock greater performance and creativity. We make every day of advertising easy, effective, and enjoyable for more than 650 brands worldwide, including eBay, Uber, and Zalando. We are one of the early adopters of GitHub Actions in wide-scale production use. Contributors: Anna Osipova, Anton Rautio, Mircea Halmagiu, Tomi Hiltunen.
- a Introduction to CI/CD
- b Getting started with GitHub Actions
- c Deployment
- d Keeping green
- e Expanding Further
- TBD
- [ ] Finished
