# Experimental Offline-first GraphQL Angular Application

## Not done yet!

This project does not currently do anything offiline yet.
Still, this project does enough interesting stuff (persisted queries, jwt authentication, etc) that it may be worth taking a look at.

## Purpose for this project

This is super experimental. GraphQL brings many advantages to the client-server API and the architecture of client-server applications.
Unfortunately, it seems like GraphQL ecosystem does not have a good solution for offline-first at the moment.
The goal of this project is to build a solid example of a GraphQL offline-first application using angular/ngrx and server service worker
running Apollo GraphQL server. 
Entire project is architected in TypeScript, and long term goal would be to leverage TypeORM to help build GraphQL schema, resolvers, 
and ngrx actions and models. Not really sure how possible all of this is. Your feedback is most welcome.

## Getting started
This project uses postgres as the db. Set up the db username and password in server/connectionOptions.js . TypeORM will create the db schema for you.

## Client
Angular CLI. Eventually with ngrx, Apollo Client. Goal is to keep GraphQL queries co-located with container components yet keep state sanely managed by ngrx.
It is an open question if ngrx store should be somehow combined with Apollo Client store implemented with redux, but this is not an immediate concern.

## Service worker
Apollo Graphql server with pouchdb

## Server
Apollo Graphql Server and TypeORM with Postgres backend db. As currently envisioned, Couchdb instances will be created for each client. 
Or maybe there is a better solution I haven't thought of yet?

## Goals
The architecture I am envisioning works as follows:

Client will combine apollo angular client and ngrx such that graphql queries will be co-located with container components. 
ngrx actions will execute the queries.
If no service worker, server will serve graphql response.
If service worker, we will set up an apollo graphql server with pouchdb, sync'd with a couchdb on the server side.
Queries will be cached by the server in the couchdb instance, which will get sync'd to the client. 
Graphql queries will be executed both client side and server side. Server response will take precendence.

If no service worker, mutations will be served by the server as normal.
If service worker, mutations will be executed against the service worker pouchdb,
which will get sync'd with the server pouchdb which will get sync'd with the Postgres db.

Subscriptions will also be handled since all the db's involved support pubsub.

## Known issues
Angular CLI does not currently support TypeScript 2.1 which makes it incompatible with TypeORM. 
Therefore I had to split client and server into separate projects. But maybe that's better to keep the client and server projects more decoupled.
