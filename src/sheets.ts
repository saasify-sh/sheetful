import { Controller, Get, Route } from 'tsoa'

export interface IRecordOfAny {
  [key: string]: any
}

@Route()
export class SheetController extends Controller {
  @Get('{project}/{sheet}')
  public async getRows(
    project: string,
    sheet: string
  ): Promise<IRecordOfAny[]> {
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
