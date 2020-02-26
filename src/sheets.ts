import { Controller, Get, Header, Query, Route } from 'tsoa'

import { IRecordOfAny } from './types'
import * as utils from './utils'

@Route()
export class SheetController extends Controller {
  @Get('{documentId}/{sheetId}')
  public async getRows(
    documentId: string,
    sheetId: string,
    @Header('x-saasify-google-auth-access-token') accessToken: string,
    @Query() offset: number = 0,
    @Query() limit: number = 100
  ): Promise<IRecordOfAny[]> {
    console.log({ accessToken })
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)

    console.log(doc.title, sheet.title)

    await sheet.loadHeaderRow()
    return utils.getSheetRows(sheet, { offset, limit })
  }
}
