import { Controller, Get, Header, Route } from 'tsoa'

export interface IRecordOfAny {
  [key: string]: any
}

@Route()
export class SheetController extends Controller {
  @Get('{project}/{sheet}')
  public async getRows(
    project: string,
    sheet: string,
    @Header('x-saasify-google-auth-access-token') accessToken?: string
  ): Promise<IRecordOfAny[]> {
    console.log({ accessToken })

    return [
      {
        foo: 'bar',
        nala: 'cat',
        project,
        sheet
      },
      {
        foo: 'baz',
        nala: 'kitten',
        project,
        sheet
      }
    ]
  }
}
