# Sheetful

> The easiest way to turn your Google Sheet into a Restful API.

That means you can GET, POST, PUT and DELETE to any spreadsheet with just a few lines of code.

[![Build Status](https://travis-ci.com/saasify-sh/sheetful.svg?branch=master)](https://travis-ci.com/saasify-sh/sheetful) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- 💯 **Open source**
- 💪 Use Google Sheets as a simple DB / CMS
- ⚡ Perfect for low / no-code workflows
- 🤖 An OpenAPI spec is auto-generated from the code
- 💰 [Saasify](https://saasify.sh) makes it easy to monetize these types of APIs

## Local Usage

```bash
# install dependencies
yarn
```

```bash
# configure your GOOGLE_API_KEY
echo GOOGLE_API_KEY='XXX' > .env

# run the development server
yarn dev

# or run the production server
yarn build
yarn start
```

Now you can access any of your Google Sheets via simple HTTP REST commands:

```bash
curl localhost:4000/<document-id>/<sheet-id-or-index> | jq .

# for example
curl localhost:4000/1qoK-nrybNcgkrSiXPZd7bsZa-4KBuGUZx3WAfV_vnD0/0 | jq .
```

This example returns all rows in a public [Google Sheet](https://docs.google.com/spreadsheets/d/1qoK-nrybNcgkrSiXPZd7bsZa-4KBuGUZx3WAfV_vnD0) as JSON. Note that it assumes you've provided a `GOOGLE_API_KEY` environment variable (see below for details).

Example output:

```json
[
  {
    "Price": "$300,000",
    "Address": "45 Grace Ct # 3D, Brooklyn, NY 11201",
    "Type": "Co-op for sale",
    "Image": "https://photos.zillowstatic.com/p_e/ISble2jd41y6ry0000000000.jpg"
  },
  {
    "Price": "",
    "Address": "81 Pierrepont St, Brooklyn, NY 11201",
    "Type": "Townhouse for sale",
    "Image": "https://photos.zillowstatic.com/p_e/IS3r1ehrg64gph1000000000.jpg"
  },
  {
    "Price": "$849,000",
    "Address": "251 Pacific St APT 11, Brooklyn, NY 11201",
    "Type": "Co-op for sale",
    "Image": "https://photos.zillowstatic.com/p_e/ISzv6yuetksjfs0000000000.jpg"
  },
  {
    "Price": "",
    "Address": "360 Furman St APT 1216, Brooklyn, NY 11201",
    "Type": "Condo for sale",
    "Image": "https://photos.zillowstatic.com/p_e/ISadsnq9f2ahh51000000000.jpg"
  },
  {
    "Price": "$999,000",
    "Address": "114 Clinton St APT 5C, Brooklyn, NY 11201",
    "Type": "Co-op for sale",
    "Image": "https://photos.zillowstatic.com/p_e/IS7e2ppvpy2v7i0000000000.jpg"
  },
  // redacted...
  {
    "Price": "$4,750,000",
    "Address": "169 Columbia Hts APT 5A, Brooklyn, NY 11201",
    "Type": "Condo for sale",
    "Image": "https://photos.zillowstatic.com/p_e/ISfob57za37h381000000000.jpg"
  }
]
```

## Authentication

All endpoints support two forms of authentication depending on your use case.

If an oauth access token is provided for a given call, it will take precedence. Otherwise, the default is to use an API key if `process.env.GOOGLE_API_KEY` exists.

If neither form of authentication is provided, the server will return a `401 Unauthorized` error.

#### API Key

This allows **read-only access to public Google Sheets** and is great for getting started.

See [this guide](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=api-key) for acquiring an API key.

You can then add your `GOOGLE_API_KEY` as an environment variable directly or via `.env` which will be loaded by the server.

Be careful to never check your API key into version control.

#### OAuth2

This is the most flexible and powerful form of authentication.

It allows your API to **read and write a user's private Google Sheets**.

**OAuth access tokens take precedence over API keys**.

All endpoints accept an optional header `x-google-access-token` which takes a valid Google oauth2 access token that's been granted the granted the [https://www.googleapis.com/auth/spreadsheets](https://www.googleapis.com/auth/spreadsheets) scope.

Here are the same examples as above only this time using oauth (replace XXX with your access token).

```bash
curl localhost:4000/<document-id>/<sheet-id-or-index> -H 'x-google-access-token: XXX' | jq .

# for example
curl localhost:4000/1qoK-nrybNcgkrSiXPZd7bsZa-4KBuGUZx3WAfV_vnD0/0 -H 'x-google-access-token: XXX' | jq .
```

Be careful to never check your oauth access tokens into version control.

## Deploying to ZEIT now

This project exposes a standard Koa server that's transpiled from `src/server.ts` to `build/server.js`.

Here's an example of this service hosted as a ZEIT now lambda: `https://sheetful-transitive-bullshit.saasify.now.sh`.

In terms of best practices, it'd be nice to break up each endpoint into its own lambda, but the potential perf delta is likely negligible.

## Why

Google Sheets is a simple, familiar interface that allows anyone to easily manage their data and content.

By treating Google Sheets as a DB / CMS and providing a basic RESTful JSON API on top, we can build thousands of potential no-code workflows.

This results in a DB / CMS with the perfect blend of power and simplicity, enabling creative makers to build all sorts of dynamic websites and apps.

## Commercial Products

These are all commercial versions of this project that are **not open source**.

- [Sheetsu](https://sheetsu.com)
- [Sheety](https://sheety.co)
- [SheetAPI](https://sheetapi.co)
- [SheetDB](https://sheetdb.io)

## Inspiration

- [table2site](https://table2site.com) - Build sites without coding, using an Airtable base as your CMS.
- [sheet2site](https://sheet2site.com) - Create your own website without writing code using only Google Sheets.
- [AwesomeTable](https://awesome-table.com) - Use spreadsheets to power dynamic views and apps.
- [ActionDesk](https://www.actiondesk.io) - A spreadsheet natively connected with apps & data sources.

## License

MIT © [Saasify](https://saasify.sh)
