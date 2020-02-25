# Sheetful

> (WIP) The easiest way to turn your Google Sheet into a Restful API.

Currently dependent on https://github.com/theoephraim/node-google-spreadsheet/pull/306.

## Hosted Usage

TODO

## Local Usage

```
# install dependencies
yarn
```

```
# to run the development server
yarn dev

# or to run the production server
yarn build
yarn start
```

Now you can access any of your Google Sheets via simple HTTP REST commands:

```
curl localhost:4000/<document-id>/<sheet-id-or-index> -H 'x-saasify-google-auth-access-token: XXX' | jq .

# for example
curl localhost:4000/1qoK-nrybNcgkrSiXPZd7bsZa-4KBuGUZx3WAfV_vnD0/0 -H 'x-saasify-google-auth-access-token: XXX' | jq .
```

Note that you have to replace `XXX` with a valid Google oauth2 access token that's been granted the `https://www.googleapis.com/auth/spreadsheets` scope.

## License

MIT © [Saasify](https://saasify.sh)
