import { Controller, Get, Header, Route } from 'tsoa'
import { GoogleSpreadsheet } from 'google-spreadsheet'

export interface IRecordOfAny {
  [key: string]: any
}

@Route()
export class SheetController extends Controller {
  @Get('{documentId}/{sheetId}')
  public async getRows(
    documentId: string,
    sheetId: string,
    @Header('x-saasify-google-auth-access-token') accessToken: string
  ): Promise<IRecordOfAny[]> {
    console.log({ accessToken })
    const doc = new GoogleSpreadsheet(documentId)

    if (!accessToken) {
      throw { message: 'Missing required access token', status: 400 }
    }

    doc.useAccessToken(accessToken)

    try {
      await doc.loadInfo()
    } catch (err) {
      throw {
        message: `Error loading document "${documentId}": ${err.message}`,
        status: 400
      }
    }

    const sheetIndex = parseInt(sheetId)
    const sheet =
      doc.sheetsById[sheetId] ||
      (isNaN(sheetIndex) ? undefined : doc.sheetsByIndex[sheetIndex])

    if (!sheet) {
      throw { message: `Sheet not found "${sheetId}"`, status: 404 }
    }

    console.log(doc.title, sheet.title)

    await sheet.loadHeaderRow()
    const { headerValues } = sheet
    const rows = await sheet.getRows()

    return rows.map((row) => {
      const json = {}
      for (const header of headerValues) {
        json[header] = row[header]
      }

      return json
    })
  }
}
