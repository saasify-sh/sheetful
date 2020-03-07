import {
  Body,
  Controller,
  Get,
  Header,
  Query,
  Post,
  Put,
  Request,
  Route
} from 'tsoa'
import * as koa from 'koa'

import { GoogleSpreadsheetRow } from '@saasify/google-spreadsheet'

import pMap = require('p-map')
import pick = require('lodash.pick')

import { Any, SheetRow } from './types'
import * as utils from './utils'

@Route()
export class SheetController extends Controller {
  @Get('{documentId}/{sheetId}')
  public async getRows(
    documentId: string,
    sheetId: string,
    @Request() request: koa.Request,
    @Header('x-google-access-token') accessToken?: string,
    @Query() offset: number = 0,
    @Query() limit: number = 100
  ): Promise<SheetRow[]> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)
    const { offset: _, limit: __, ...query } = request.ctx.query

    console.log('GET', `/${documentId}/${sheetId}`, {
      doc: doc.title,
      sheet: sheet.title,
      query,
      offset,
      limit
    })

    return utils.getSheetRows(sheet, { offset, limit, query })
  }

  @Get('{documentId}/{sheetId}/info')
  public async getSheetInfo(
    documentId: string,
    sheetId: string,
    @Header('x-google-access-token') accessToken?: string
  ): Promise<Any> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)

    console.log('GET', `/${documentId}/${sheetId}/info`, {
      doc: doc.title,
      sheet: sheet.title
    })

    return pick(sheet, [
      'sheetId',
      'title',
      'index',
      'headerValues',
      'rowCount',
      'columnCount',
      'cellStats',
      'sheetType',
      'gridProperties',
      'hidden',
      'tabColor',
      'rightToLeft'
    ])
  }

  @Get('{documentId}/{sheetId}/{rowId}')
  public async getRow(
    documentId: string,
    sheetId: string,
    rowId: number,
    @Header('x-google-access-token') accessToken?: string
  ): Promise<SheetRow> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)

    console.log('GET', `/${documentId}/${sheetId}/${rowId}`, {
      doc: doc.title,
      sheet: sheet.title
    })

    const rows = await utils.getSheetRows(sheet, {
      offset: rowId,
      limit: 1
    })

    return rows[0]
  }

  @Put('{documentId}/{sheetId}/{rowId}')
  public async updateRow(
    documentId: string,
    sheetId: string,
    rowId: number,
    @Body() body: SheetRow,
    @Header('x-google-access-token') accessToken?: string
  ): Promise<SheetRow> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)

    console.log('PUT', `/${documentId}/${sheetId}/${rowId}`, {
      doc: doc.title,
      sheet: sheet.title,
      body
    })

    const gRows = await sheet.getRows({
      offset: rowId,
      limit: 1
    })

    const gRow = gRows[0]
    const row = body
    for (const key of sheet.headerValues) {
      gRow[key] = row[key]
    }

    await gRow.save()
    return utils.encodeSheetRow(sheet, gRow)
  }

  @Put('{documentId}/{sheetId}/{rowId}/bulk')
  public async updateRowsBulk(
    documentId: string,
    sheetId: string,
    rowId: number,
    @Body() body: SheetRow[],
    @Header('x-google-access-token') accessToken?: string
  ): Promise<void> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)

    console.log('PUT', `/${documentId}/${sheetId}/${rowId}/bulk`, {
      doc: doc.title,
      sheet: sheet.title,
      body
    })

    const gRows: GoogleSpreadsheetRow[] = await sheet.getRows({
      offset: rowId,
      limit: body.length
    })

    for (let i = 0; i < gRows.length; ++i) {
      const gRow = gRows[i]
      const row = body[i]

      for (const key of sheet.headerValues) {
        gRow[key] = row[key]
      }
    }

    await pMap(gRows, (gRow) => gRow.save(), { concurrency: 4 })
  }

  @Post('{documentId}/{sheetId}')
  public async createRow(
    documentId: string,
    sheetId: string,
    @Body() body: SheetRow,
    @Header('x-google-access-token') accessToken?: string
  ): Promise<SheetRow> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)

    console.log('POST', `/${documentId}/${sheetId}`, {
      doc: doc.title,
      sheet: sheet.title,
      body
    })

    const gRow = await sheet.addRow(body)
    return utils.encodeSheetRow(sheet, gRow)
  }

  @Post('{documentId}/{sheetId}/bulk')
  public async createRowsBulk(
    documentId: string,
    sheetId: string,
    @Body() body: SheetRow[],
    @Header('x-google-access-token') accessToken?: string
  ): Promise<void> {
    const doc = await utils.getDocument(documentId, accessToken)
    const sheet = await utils.getSheet(doc, sheetId)

    console.log('POST', `/${documentId}/${sheetId}/bulk`, {
      doc: doc.title,
      sheet: sheet.title,
      body
    })

    await sheet.addRows(body)
  }

  @Get('{documentId}')
  public async getDocumentInfo(
    documentId: string,
    @Header('x-google-access-token') accessToken?: string
  ): Promise<Any> {
    const doc = await utils.getDocument(documentId, accessToken)

    console.log('GET', `/${documentId}`, { doc: doc.title })

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
