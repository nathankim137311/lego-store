# Lego Clone

## Description
A clone of the Lego.com which features: authentication / authorization with JWT, mobile-responsive design, a functional shopping cart, Stripe-Integration and multiple pages of navigation. 

## Features
* Shopping Cart
* Mobile-responsive design
* Stripe-Integration
* Login / Register
* Routing / navigation 

## Technologies
* MongoDB
  * I used MongoDB because it is a non-relational database, the data I was storing was not very complex and is not relational. 
* Express
  * I used Express because of the simplicity of setting up a server, and creating routing components 
* React
  * I used React because the component-based architecture allowed for greater ease when it came to building UIs. Managing states with React is a lot easier and robust than just using vanilla JavaScript. 
* Node
  * I used Node because I wanted to use JavaScript as my back-end language :smile:

## Questions

### What was your motivation? 
I wanted to learn as much as possible about the process of building a full stack application with the MERN stack.

### Why did you build this project? 
The idea came from the result of a week of binging old Lego stop-motion videos on Youtube. I decided that I wanted to recreate the Lego website because the design has a lot of charm and I just really like Legos. 

### What did you learn? 
I learned about authentication / authorization with JWT, mobile-responsive design, react-routing, private routes, useContext hook, useEffect hook, Stripe API integration, storing data in MongoDB, and deploying a full stack application on Heroku.  

## Challenges
* Deployment
* API design
* Tailwind CSS / Media queries
* Shopping cart

### Deployment
Reorganized my project directories so that the server files were in the root of my project directory. This allowed Heroku to find the package.json folder and execute post-build scripts. 

### API design
Used regex on the image tags source query string and ommitted portions of the string that was causing the images to return blurry and tiny. 

### Tailwind CSS / Media queries
Designed for mobile-first to save me headache. Added custom breakpoints to tailwind config file. 

### Shopping cart 
Built the shopping cart three times in other directories and used the best version for this project. Utilized the useContext hook to pass states to the Navbar component. 

## Reflection

### What would you have done differently? 
I would have set-up my project with a hosting option in mind, for this project I didn’t know if I was going to host this project myself, or host with Heroku or any other free hosting service. It would have saved me a lot of headache to deploy my project on Heroku right from the beginning. Once the site is up and running on Heroku then I would add features and deploy new versions from there. 

Media queries portion of the project ended up being very tedious. In the beginning of the project I designed the site for desktop screen sizes first and then added my breakpoints for each of the smaller screens. I would have saved a lot of time if I had designed for mobile first. It is considered best practice to do so. Also I would have added a smaller breakpoint than 320px, because… the galaxy fold exists 😒 

I would have configured my API in a different way, there were little issues that kept piling up, prices extracted from the web scraper returned “49” rather than “50”, this led to a lot of tinkering with the front-end code to display the prices in the correct way. Another issue was with the images returned from my API, all of the images returned blurry and tiny, I had to use regex on the query string to fix the images back to HD. All of those little issues could have been addressed from the very beginning when I was building the API. 

The shopping cart component was definitely the most complex, with a lot of useEffect hooks and states. It definitely could use a face-lift, some refactoring and organization. I would have simplified this page and broken it up into multiple components, perhaps I could have made another directory called “Cart” and put all of my sub-components inside of it. When I was building this page I had no idea what the useReducer hook was, I realize now having learned more about it, that I could have used that hook to handle the complex states for my Cart component. Perhaps I’ll refactor the page some time… 








  


