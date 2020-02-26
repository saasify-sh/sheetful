import { Controller, Get, Header, Query, Request, Route } from 'tsoa'
import * as koa from 'koa'
import pick = require('lodash.pick')

import { IRecordOfAny } from './types'
import * as utils from './utils'

@Route()
export class SheetController extends Controller {
  @Get('{documentId}/{sheetId}')
  public async getRows(
    documentId: string,
    sheetId: string,
    @Request() request: koa.Request,
    @Header('x-saasify-google-auth-access-token') accessToken: string,
    @Query() offset: number = 0,
    @Query() limit: number = 100
  ): Promise<IRecordOfAny[]> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)
    const { offset: _, limit: __, ...query } = request.ctx.query

    console.log('GET', `${documentId}/${sheetId}`, {
      ...query,
      doc: doc.title,
      sheet: sheet.title,
      query,
      offset,
      limit
    })

    await sheet.loadHeaderRow()
    return utils.getSheetRows(sheet, { offset, limit, query })
  }

  @Get('{documentId}/{sheetId}/info')
  public async getSheetInfo(
    documentId: string,
    sheetId: string,
    @Header('x-saasify-google-auth-access-token') accessToken: string
  ): Promise<object> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)

    console.log('GET', `${documentId}/${sheetId}/info`, {
      doc: doc.title,
      sheet: sheet.title
    })

    await sheet.loadHeaderRow()
    return pick(sheet, [
      'sheetId',
      'title',
      'index',
      'headerValues',
      'sheetType',
      'gridProperties',
      'hidden',
      'tabColor',
      'rightToLeft'
    ])
  }

  @Get('{documentId}')
  public async getDocumentInfo(
    documentId: string,
    @Header('x-saasify-google-auth-access-token') accessToken: string
  ): Promise<object> {
    const doc = await utils.getDocument(documentId, accessToken)

    console.log('GET', `${documentId}`, { doc: doc.title })

    return pick(doc, [
      'spreadsheetId',
      'title',
      'locale',
      'timeZone',
      'autoRecalc',
      'defaultFormat',
      'spreadsheetTheme',
      'iterativeCalculationSettings',
      'sheetCount'
    ])
  }
}
