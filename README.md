
# How It Works NodeShop.js

It is an online store, MVC project to learn about the fundamentals of NodeJs and Express, among other important topics of the Backend.

This app allows you to search, buy add products, from a personal account.

Based on the projects of the [NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL)](https://www.udemy.com/course/nodejs-the-complete-guide/)

![NodeShop.js](https://raw.githubusercontent.com/LuisCusihuaman/NodeShop.js/master/docs/imagen.png)

## Setup

Adjust `.env` with your own credentials
```bash
cp .env-dist .env
npm install
```
Change the `stripe-publishable-key` for your own key in `views⁄shop⁄checkout.ejs`.

```javascript
<button id="order-btn" class="btn">ORDER</button>
    <script src="<https://js.stripe.com/v3/>"></script>
    <script>
        var stripe = Stripe('your-stripe-publishable-key');
        var orderBtn = document.getElementById('order-btn');
        orderBtn.addEventListener('click', function () {
        stripe.redirectToCheckout({sessionId: '<%= sessionId %>'});
        });
    </script>

```

```bash
npm start
```

# What I Learned

-   How The Web Works and Node.js
-   The Node Lifecycle & Event Loop
-   Controlling the Node.js Process
-   HTTP Protocol
-   Understanding Event Driven Code Execution
-   Blocking and Non-Blocking Code
-   Using the Node Modules System
-   Express.js
-   How Middleware Works
-   Routing and Parsing Incoming Requests
-   Serving Files Statically
-   Templates Engines EJS
-   Dynamic Routes & Advanced Models
-   Extracting info of Dynamic Params
-   Using Query Params
-   Working with NoSQL & Using MongoDB
-   Mongoose
-   Authentication
-   Encrypting Passwords
-   Signin Functionality
-   Middleware to Protect Routes
-   Using a CSRF Token and CSRF Protection
-   Resetting Passwords
-   Authorization
-   Validation
-   Sending Emails
-   Error Handling
-   File Upload & Download
-   Pagination
-   Payments