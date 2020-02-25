import { Controller, Get, Header, Route } from 'tsoa'
// import { GoogleSpreadsheet } from 'google-spreadsheet'

export interface IRecordOfAny {
  [key: string]: any
}

@Route()
export class SheetController extends Controller {
  @Get('{document}/{sheet}')
  public async getRows(
    document: string,
    sheet: string,
    @Header('x-saasify-google-auth-access-token') accessToken?: string
  ): Promise<IRecordOfAny[]> {
    console.log({ accessToken })
    // const doc = new GoogleSpreadsheet(document)
    // 1qoK-nrybNcgkrSiXPZd7bsZa-4KBuGUZx3WAfV_vnD0

    return [
      {
        foo: 'bar',
        nala: 'cat',
        document,
        sheet
      },
      {
        foo: 'baz',
        nala: 'kitten',
        document,
        sheet
      }
    ]
  }
}
