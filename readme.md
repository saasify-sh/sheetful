# Sheetful

> The easiest way to turn your Google Sheet into a Restful API.

That means you can GET, POST, PUT and DELETE to any spreadsheet with just a few lines of code.

## Features

- 💯 Open source
- 💪 Use Google Sheets as a simple CMS
- ⚡ Perfect for low/no-code workflows
- 🤖 OpenAPI spec is auto-generated from the code

## Local Usage

```bash
# install dependencies
yarn
```

```bash
# to run the development server
yarn dev

# or to run the production server
yarn build
yarn start
```

Now you can access any of your Google Sheets via simple HTTP REST commands:

```bash
curl localhost:4000/<document-id>/<sheet-id-or-index> -H 'x-saasify-google-auth-access-token: XXX' | jq .

# for example
curl localhost:4000/1qoK-nrybNcgkrSiXPZd7bsZa-4KBuGUZx3WAfV_vnD0/0 -H 'x-saasify-google-auth-access-token: XXX' | jq .
```

This example uses a public [Google Sheet](https://docs.google.com/spreadsheets/d/1qoK-nrybNcgkrSiXPZd7bsZa-4KBuGUZx3WAfV_vnD0) and returrns the following JSON:

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

Note that you have to replace `XXX` with a valid Google oauth2 access token that's been granted the `https://www.googleapis.com/auth/spreadsheets` scope.

## Deploying to ZEIT now

This project exposes a standard Koa server that's transpiled from `src/index.ts` to `build/index.js`.

Here's an example of this service hosted as a ZEIT `now` lambda: `https://sheetful-transitive-bullshit.saasify.now.sh`.

In terms of best practices, it'd be nice to break up each endpoint into its own lambda, but the potential perf delta is likely negligible.

## Why

Google Sheets is an easy, familiar interface for non-developers to manage their content and data.

By treating Google Sheets as a DB / CMS and providing a simple RESTful JSON API on top, we can build thousands of potential no-code workflows.

This creates a DB / CMS with the perfect blend of power and simplicity, enabling creative makers to power all sorts of dynamic websites and apps.

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
