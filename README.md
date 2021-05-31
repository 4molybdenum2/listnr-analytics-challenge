# Listnr Analytics Challenge

1. Find out the Device Type and Geolocation (Country) when a user acceses an endpoint and store it in a database.
2. Retrieve the data using query parameters.

### Endpoints:

* GET   **/track ?targetURL=url**    (endpoint to create a User based on his data fetched)
* GET   **/trackingStats?url=URL&rangeFrom="Date"&rangeTo="Date"**   (endpoint to fetch a user data from mongodb database)

*Date* must be of the form DDMMYY (eg: 05062021 )

### Setup:

Database:

1. Mongo Atlas (Cloud) has been used as a database. Create a .env file in the main directory and put the following in it;
    ```
    mongoURI = <your mongo uri>
    ```
2. ```yarn``` to install all the dependencies (if yarn is not available use npm install).
3. ```yarn dev``` (or ```npm run dev```) to run the development server.
4. Access **localhost:5000/<your endpoint>** to create the necessary API requests.