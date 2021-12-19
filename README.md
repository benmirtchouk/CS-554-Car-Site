# Cargslist

## Project Members

* Ari Birnbaum
* Deborah Harrington
* Joseph Allen
* Mohammad Khan
* Ben Mirtchouk

## Github Repository

* [github/benmirtchouk/CS-554-Car-Site](https://github.com/benmirtchouk/CS-554-Car-Site.git)

## High Level Description

Carigslist is a website to support a platform for buying and selling used automobiles. As a seller, you will be able to get analytics of recent prices of sold cars to better understand what value your vehicle should be listed for. Each listing will have the ability to show seller ratings, comments, and discussions link to aid in showing why this model of car is a great buy. 

As a buyer, Carigslist will have those same price points to give you a basis on what to expect for the desired make and model, and allow visualization of price trends using Recharts with data sourced from APIs like the DOT or Kelly Blue Book. The best part of using Carigslist is it removes the need to go to a Car dealer which will try and upsell you on everything!

## How to Run
Installation steps are below, tested on Linux (Ubuntu) and Windows


### Server
- Prerequisites: Mongo db daemon running on local host, Redis daemon running on local host, port 3001 is free
- cd into `server` directory
- run `npm i`
- run `npm run seed`
- Ensure a firebase config is populated in `firebase/serviceAccount.json`
- run `npm start`

### Client
- Prerequisites: Server is running on localhost 3001
- cd into `client` directory
- run `npm i`
- Ensure a `.env` is populated in the client root with the client firebase file
- run `npm start`


## Seed data
- Seed data populates ~15,000 listings, with ~4000 images and 15 accounts
- Default accounts in seed data have standard test credentials, `username@email.com` have passwords `username123!`. If using a seperate firebase config, the UUIDs in the seed file should be updated.
   -  Example accounts: 
   -  tsmith@yahoo.com 
   -  gclooney@gmail.com 



## APIs and Frameworks integrated with 

Client:
- React
- Bootstrap 
- Leaflet
- Recharts
- Socket.Io
- Firebase

Server:
- Node
- MongoDB
 - Including GridFS
- Redis
- www.nhtsa.gov
- nominatim.openstreetmap.org
- Firebase

