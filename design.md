# Design

I always try to keep my code and architecture as simple as possible, so that it can be understood easily, luckily, the [LOTR API](https://the-one-api.dev) on which this SDK is based, is also extremely simple.

It contains a few routes, a single HTTP method (get) and a straightforward authentication method.

&nbsp;

The main functionality is wrapping and mirroring the API, which is done by creating an `axios` instance that contains the correct authentication headers.
That takes a few lines of code so...

&nbsp;

So I was able to spend time in other things, like:

- making the SDK suitable for both Server and Client side environments
- adding cache to the requests
- creating a first implementation of GraphQL for the API

&nbsp;

As for the code, the whole SDK fits in just 2 files of code (`index.ts` and `graphql.js`), both of them below 150 lines.

So it is also extremely easy to maintain.
