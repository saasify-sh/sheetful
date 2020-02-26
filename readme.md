# Sheetful

> (WIP) The easiest way to turn your Google Sheet into a Restful API.

Currently dependent on https://github.com/theoephraim/node-google-spreadsheet/pull/306.

## Hosted Usage

TODO

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

## License

MIT © [Saasify](https://saasify.sh)
