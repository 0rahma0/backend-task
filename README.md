# backend-task

## Project Setup
open a terminal in project root directory and type the following to install dependencies
- ```npm i```
- ```npm i dotenv```

 finally create a ```.env``` file and add fields for API_KEY, URL, PORT with their respective values, preferably 4000 for port number

## API  routes
all the following were tested on postman

#### Sports
- /sports
- /sports/:id

these are used for all request types with /:id added for specific entry fetch, update, and delete  

#### Members
- /members
- /members/:id

these are used for all request types with /:id added for specific entry fetch, update, and delete  
an automatically geenrated created_at field is used as the subscription filed

#### Subscriptions
a subscriptions table was added to handle members subscribing adn unsubsribing to sports
- /subscriptions
- /subscriptions/:id

these are used for all request types with /:id added for delete  
adding a new row is subscribing and deleting a row is unsubsrcibing with table entries being {sport_id,member_id}
