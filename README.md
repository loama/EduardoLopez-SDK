# Lord Of The Rings JS Library

The Lord Of The Rings (LOTR) JS Library provides convenient access to the [LOTR API](https://the-one-api.dev/) from applications written in Javascript, both server and client side.

## Installation

Install the package with

```
npm i @loama18/eduardolopez-sdk
```

## Usage

The package needs to be configured with your account's secret key, which is available in the [LOTR API Account Page](https://the-one-api.dev/account), sign up for free if you haven't already, to get an API Key.
Otherwise you will only be able to access the book endpoints.

---

&nbsp;

Require it with the key's value:

```javascript
const LOTR = require("@loama18/eduardolopez-sdk");

LOTR.setup("<your-key>"); // replace <your-key> for the key you got

// do the actual call to get info, in this case for books
LOTR.get("book")
  .then((res: any) => {
    console.log(res);
  })
  .catch((e: any) => {
    console.log(e.response.data);
  });
```

&nbsp;

Or using ES modules and async/await::

```javascript
import LOTR from "@loama18/eduardolopez-sdk";

LOTR.setup("<your-key>"); // replace <your-key> for the key you got

(async () => {
  const book = await LOTR.get("book");

  console.log(book);
})();
```

> depending on your environment, you might need to replace `LOTR.setup` for `LOTR.default.setup`

&nbsp;

&nbsp;

## Which routes are available?

All routes that you can find in [LOTR API docs](https://the-one-api.dev/documentation#4) are also available here, with the `LOTR.get(<endpoint>)` method.

### Complete List

| Endpoint             | Response                                                                                 | Token required |
| -------------------- | ---------------------------------------------------------------------------------------- | -------------- |
| book                 | List of all "The Lord of the Rings" books                                                | no             |
| /book/{id}           | Request one specific book                                                                | no             |
| book/{id}/chapter    | Request all chapters of one specific book                                                | no             |
| movie                | List of all movies, including the "The Lord of the Rings" and the "The Hobbit" trilogies | yes            |
| movie/{id}           | Request one specific movie                                                               | yes            |
| movie/{id}/quote     | Request all movie quotes for one specific movie (only working for the LotR trilogy)      | yes            |
| character            | List of characters including metadata like name, gender, realm, race and more            | yes            |
| character/{id}       | Request one specific character                                                           | yes            |
| character/{id}/quote | Request all movie quotes of one specific character                                       | yes            |
| quote                | List of all movie quotes                                                                 | yes            |
| quote/{id}           | Request one specific movie quote                                                         | yes            |
| chapter              | List of all book chapters                                                                | yes            |
| chapter/{id}         | Request one specific book chapter                                                        | yes            |

&nbsp;

## GraphQL

You can also use graphQL to query the API, doing something like this

```javascript
LOTR.graphQL(<query>)
```

In there, you have access to every single point of data in the API at the same time.

To get all the data in the API at once you would do something like this:

```javascript
LOTR.graphQL(
  `{
  book {
    _id,
    name
  },
  chapter {
    _id,
    chapterName,
    book
  },
  character {
    _id,
    height,
    race,
    gender,
    birth,
    spouse,
    death,
    realm,
    hair,
    name,
    wikiUrl
  },
  movie {
    _id,
    name,
    runtimeInMinutes,
    budgetInMillions,
    boxOfficeRevenueInMillions,
    academyAwardNominations,
    academyAwardWins,
    rottenTomatoesScore,
    quote {
      _id,
      dialog,
      movie,
      character,
      id
    }
  }
  quote {
    _id,
    dialog,
    movie,
    character,
    id
  }
}`
)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
```

This is an extreme case, feel free to remove whatever fields that you don't require, to make the request faster and smaller.

Note that from within `movie` you are able to request the `quotes` that belong to that movie.

&nbsp;

## Caching

By default, the SDK will cache the responses of each call made, it is setup to last 1 hour, so you might notice considerably faster responses after the first call within the same hour.

If you are running it from Node, it will use `cachios`.

If you are running it from the Browser (most likely with something like Vue or React), it will use `axios-cache-adapter`

&nbsp;

## Test

Run

```
npm run test
```

&nbsp;

## Pending To Do for next release:

- Make `book/quotes` available directly
- Make `character/quoutes` available directly
- Add ability to paginate, slice and filter with graphQL like:

  ```javascript
    movies(first:2) {
      _id,
      name
    }

    // or

    movies(id: "5cd95395de30eff6ebccde57") {
      _id,
      name
    }
  ```
