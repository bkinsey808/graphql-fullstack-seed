# Angular GraphQL Fullstack Seed

## Not done yet!

This project does not currently do anything offline yet.
Still, this project does enough interesting stuff (persisted queries, jwt authentication, lazy loading, etc) that it may be worth taking a look at.

## Purpose for this project

This is super experimental. GraphQL brings many advantages to the client-server API and the architecture of client-server applications.
Unfortunately, it seems like GraphQL ecosystem does not have a good solution for offline-first at the moment.
The goal of this project is to build a solid example of a GraphQL offline-first application using angular and server service worker
running Apollo GraphQL server. 
Entire project is architected in TypeScript. Not really sure how possible all of this is. Your feedback is most welcome.

## Getting started
This project uses postgres as the db. Set up the db username and password in server/db.js .

## Client
Angular CLI, Apollo Client. Goal is to keep GraphQL queries co-located with container components.

## Service worker
Apollo Graphql server with pouchdb?

## Server
Apollo GraphQL Server with Postgres backend db. As currently envisioned, Couchdb instances will be created for each client. Or maybe there is a better solution I haven't thought of yet?

## Goals
The architecture I am envisioning works as follows:

Client will combine apollo angular client  such that graphql queries will be co-located with container components. 
If no service worker, server will serve graphql response.
If service worker, we will set up an apollo graphql server with pouchdb, sync'd with a couchdb on the server side.
Queries will be cached by the server in the couchdb instance, which will get sync'd to the client. 
Graphql queries will be executed both client side and server side. Server response will take precendence.

If no service worker, mutations will be served by the server as normal.
If service worker, mutations will be executed against the service worker pouchdb,
which will get sync'd with the server pouchdb which will get sync'd with the Postgres db.

Subscriptions will also be handled since all the db's involved support pubsub.

## todo

* remove expired jwt token
* display server-side errors on the client
* mark fields as required
* authentication, including routes
* authorization, role-based security
* graphql subscriptions
* support persisted query whitelisting
* https
* http2?
* offline
