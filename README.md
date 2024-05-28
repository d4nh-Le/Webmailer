# Webmailer - An  analytic tool for web developers.

Webmailer is a website analytic tool, which notifies the developer whenever there are visitors coming into you website. Notifications will be conveniently sent to registered email, so the developers can always check their website traffics anywhere - thus, no app download needed. Built using `NodeJS` and `ReactJS`, Webmailer offers a fast, smooth and reliable experience. You might visit Webmailer's registration website [here](https://w3bmailer.site).

## Features
* Instantly notify the developer through their email about their website's traffic.
* Notification includes **real-time**: `Page Visited`, `Time Visited`, `Location of visitor` (optional) and `Website Referer - from where the visitor comes from` (optional).
* Encrypted registration information - **All information are encrypted and protected. No information would ever be sold**
* Although Webmailer is recommended to be inserted as a middleware to the main entry point of the web application/website, it is possible to insert this middleware at any routes within the application.

## Languages and Technologies
This project was built using:
* __ReactJS__ (registration and docs website)
* __NodeJS__ 18.15.0.
* __Javascript__ for server logics, controllers, utilities and database handling.
* __Postgres__ for data persistance and manipulation.
* Of course, __HTML5__ and __CSS__.

## Development Process

### Versions

* v1.0 - Launch of the Webmailer (Initial deployment - beta release)
    * Real-time analytics sent to registered email address, including `Page Visited`, `Time Visited`, `Location of visitor` (optional) and `Website Referer` (optional).
    * Unique Token-based Authentication for each users, ensuring security and privacy of registered users.
    * Minimalistic design frontend, including sections how to get started, how to sign up and external resources.
    * Registration functionality for developer to register to try out beta version.
    * 2-steps verifications for registered email.

## Webmailer Middleware Setup and Development Guide
### 1. Webmailer Middleware

Middleware are  layers between your server API endpoints and the server infrastructure itself. Before your server executes incoming requests from outside, it will often need to pass through middleware. Middleware often handles tasks such as:
 * Request authentication and authorization.
 * Query sanitization and validation.
 * Adding or making changes to request headers and body
 * etc...
 
**Webmailer should be set up as a middleware** in a way so that everytime your server receive a request, it also trigger Webmailer middleware to send data to Webmailer's server.

![Webmailer Middleware.](https://github.com/d4nh-Le/webmailer/blob/main/src/assets/userguide.jpeg?raw=true "Before Cache")

### 2. Creating Webmailer Middleware
This is an example of Webmailer Middleware in NodeJS:

```
const axios = require('axios');

const webmailerTrigger = async (req, res, next) => {
    const key = [YOUR_API_KEY]; 
    const page = [YOUR_WEBSITE_NAME];
    const ip = req.ip; 
    const referer = req.get('Referer') || ''; 

    try {
     await axios.post('https://w3bmailer.site/trigger', { key, page, ip, referer });
    } catch (error) {
     console.error('Error sending to server:', error);
    }

    next();
}
```
* `[YOUR_API_KEY]` - Your Token sent to your registered email after successful verification.
* `[YOUR_WEBSITE_NAME]` - The name of the Page in which the visitor visits (ex: myshop.com/home - page should be "home"). This parameter will let you know specifically the visitor visits which route in your application.
* `ip` (optional) - This parameter will also send the request ip address to Webmailer server. Our server will analyze and return the **visitor approximate location** in the report sent through email.
* `referer` - This parameter will let you know where they come to your website from (such as from Google, Facebook, etc.)

**IMPORTANT**: `ALL PARAMETERS SENT TO WEBMAILER SERVER SHOULD BE WRITTEN AS IN THE CODE SAMPLE.` Parameters such as `key`, `page`, `ip`, `referer` should be written as it is (lowercase). Any other parameters will not be accepted.

### 3. Place Webmailer middleware into your route
After creating the middleware, place the function into your route. This is an example in NodeJS:

```
app.get('/home', webmailerTrigger, (req, res) => {
...
});
```

By placing the middleware into your route, everytime this route is visited, it also trigger the middleware to send necessary information to create a report to notify through your email.

## Challenges and Solutions


### Learning and Adapting to ReactJS
Prior to Webmailer, majority of my experience working with web development is working with **Angular** - a web development `framework` created and supported by Google. Unlike libraries, frameworks can be understood as a "whole complete package". It contains everything needed to do the job - in this case, Angular contains all tools, inferfaces and methods needed to build a complete web application. 

Unlike Angular, **ReactJS** is only a library, designed specifically to build user-interface, especially single-page web applications. ReactJS does not contain all tools needed to build a complete web application, because ReactJS itself is only a library. However, ReactJS has an advantage that is considered as it biggest strength - **Huge community support and a vast amount of library to support it**. For example, while Angular has a built-in routing system that can direct page URLs of the application, ReactJS can achieve the same through installing an external library needed to implement routing. 

Therefore, the first thing when I need to understand is that while ReactJS is not a complete package, as a developer, I have the complete  control of the process of the development. If my React application needed a certain functionality, I can install the exact React library needed to do the job, without having to install other unnecessary tools. Therefore, React is often suitable for small-medium scale applications and often can enable the developers to deliver a working version out to production in a short time. 

However, at its core, `Angular` and `React` have a great similarity that enable me as a web developer to learn React a lot easier and a lot faster - it is `Component-Based Architecture`.

Component-Based Architecture describes a principle in web development where components of the application is built separarely, enable easy maintainability, scalability and high decoupling. Angular framework and ReactJS library is built around this principle, offer versitility and reusability to the developers.

![React_vs_Angular](https://github.com/d4nh-Le/Webmailer/blob/main/src/assets/angular_vs_react.jpeg?raw=true "Before Cache")

### Test Driven Development (TDD) and Unit Tests

Test Driven Developemt (TDD) is a programming methodology emphasizes in writing a component's requirements as a test. When finished designing  a component requirements, the developer will then implement the actual code for the component, with the goal of passing all the designed tests. 

When developing Webmailer, the application required me to design and build several core components that is crucial for the security and interity of the application, specifically, `Validation` and `Sanitization` middlewares, I had the chance to learn and apply this methodology into my workflow, allow me to build core component faster and more efficiently. For example, `Mailer.sanitize.js` is a middleware component within Webmailer. This components serve as a protection for the server by cleaning and sanitizing incoming requests to the server. `Mailer.sanitize.js` has several crucial tasks:
* Prevent malicious script from entering the server.
* Prevent SQL Injection Attack
* Prevent Cross-Site Scripting Attacks

When building this crucial middleware component, I followed TDD methodology:
1. Write unit tests - requirements for a function in a component.
```
// Mailer.sanitize.test
it('Token parameter is REQUIRED', async () => {
    const response = await request(app)
        .get('/testToken');

    expect(response.status).toBe(400);
    expect(response.text).toBe('S101 - Missing required parameter: token');
    });
```
2. Once I clearly identified what a function needed to do in the unit test, start writing implementation for the function, just write barely enough to have the unit test pass.
```
// Mailer_sanitize.utility
const sanitizeKey = [
    check('key').exists().withMessage('MS101 - Missing required parameter: key'),
];
```
3. Repeat those two step for the other requirements of the component.

By following this, when the requirements of the test file is satisfied, I have also built a complete component for the project. This component is now fully functional and unitly tested. 

### Implement Unique Personal Access Tokens (PATs)
Webmailer implements Unique Personal Access Tokens (PATs) mechanism for security of its APIs. Due to being relying heavily on APIs for communication between other server with Webmailer server, `Authentication` and `Authorization` are two crucial security aspects. 

When register for a Webmailer account, the user only needs to enter necessary information regarding its destination website and email addresses. The users do not need to create username and password for their account, instead, when finish filling necessary information, the user will receive their `unique token`. 

This token serves as the credential of the user. When connecting with Webmailer server, this token will be red by the server and user information will be retrieved. 

![React_vs_Angular](https://github.com/d4nh-Le/Webmailer/blob/main/src/assets/traditional_vs_pats.jpeg?raw=true "Before Cache")

Webmailer mainly offers its service through APIs, there are several benefits by implementing PATs for its process of authentication:


* Tokens are unique, preventing password guessing or password reuse across services. 
* Webmailer is stateless, by using PATs, it simplify management process. When receive request from another server, Webmailer will compare `hashed request token` vs `hashed stored token` to authenticate users.
* PATs is a more suitable solution for authentication when the service requires little to no human intervention.

However, by choosing to simplify authentication process on client side, Webmailer server side will consequently need to implement more complex and robust security system:
* Generate unique tokens
* Token encryption and hashing aglorithm.
* Token storage and expiration mechanism.

## Future Plans
Some features I would like to add in the futures:
- [ ] Responsive design for tablets and mobile devices.
- [ ] Implement Rate Limiting mechanism - additionally increase server security and integrity.
- [ ] Additional options for users to choose how many times and when Webmailer will send reports.
- [ ] Weekly/Monthly report functionality for registered website.
- [ ] User panel - users can update their notification preferences.

## Disclaimer

* **Webmailer is stateless and does not collect any information that sent to the server.** 
* **The server does not retain any knowledge of variable values, user information, or any other data between different requests from the same user or client.**
* **Registered user information is encrypted and protected securely.**

TL;DR : I am not interested in user data nor having any intention to sell or use it, this tool is made out of passion ;).

## Contact
If you would like to contact me (__Danh Le - Junior Software Developer__) for support or suggestion, please send me an email me at danhle002@gmail.com.


@2024
