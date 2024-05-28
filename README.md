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

## Future Plans
Some features I would like to add in the futures:
- [ ] Reponsive design for tablets and mobile devices.
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
