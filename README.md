# Listnr Analytics Challenge

1. Find out the Device Type and Geolocation (Country) when a user acceses an endpoint and store it in a database.
2. Retrieve the data using query parameters.

### Endpoints:

* GET   **/track ?targetURL=url**    (endpoint to create a User based on his data fetched)
* GET   **/trackingStats?url=URL&rangeFrom="Date"&rangeTo="Date"**   (endpoint to fetch a user data from mongodb database)

*Date* must be of the form DDMMYY (eg: 05062021 )

### User Model:

{<br>
    **url** : targetURL<br>
    **timeStamp** : Date<br>
    **deviceType** : Type of device (eg: Desktop, Tablet, Mobile)<br>
    **country** : Country of the User<br>
}

### Setup:

Database:

1. Mongo Atlas (Cloud) has been used as a database. Create a .env file in the main directory and put the following in it;
    ```
    mongoURI = <your mongo uri>
    ```
Server:

2. ```
    git clone https://github.com/4molybdenum2/listnr-analytics-challenge.git
    ```
3. ```yarn``` to install all the dependencies (if yarn is not available use npm install).
4. ```yarn dev``` (or ```npm run dev```) to run the development server.
5. Access **localhost:5000/<your endpoint>** to create the necessary API requests.