/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SheetController } from './sheets';
import * as KoaRouter from 'koa-router';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  "SheetRow": {
    "dataType": "refObject",
    "properties": {
    },
    "additionalProperties": { "dataType": "any" },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Any": {
    "dataType": "refObject",
    "properties": {
    },
    "additionalProperties": { "dataType": "any" },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  router.get('/:documentId/:sheetId',
    async (context: any, next: any) => {
      const args = {
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        sheetId: { "in": "path", "name": "sheetId", "required": true, "dataType": "string" },
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        accessToken: { "in": "header", "name": "x-google-access-token", "dataType": "string" },
        offset: { "default": 0, "in": "query", "name": "offset", "dataType": "double" },
        limit: { "default": 100, "in": "query", "name": "limit", "dataType": "double" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new SheetController();

      const promise = controller.getRows.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get('/:documentId/:sheetId/info',
    async (context: any, next: any) => {
      const args = {
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        sheetId: { "in": "path", "name": "sheetId", "required": true, "dataType": "string" },
        accessToken: { "in": "header", "name": "x-google-access-token", "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new SheetController();

      const promise = controller.getSheetInfo.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get('/:documentId/:sheetId/:rowId',
    async (context: any, next: any) => {
      const args = {
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        sheetId: { "in": "path", "name": "sheetId", "required": true, "dataType": "string" },
        rowId: { "in": "path", "name": "rowId", "required": true, "dataType": "double" },
        accessToken: { "in": "header", "name": "x-google-access-token", "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new SheetController();

      const promise = controller.getRow.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.put('/:documentId/:sheetId/:rowId',
    async (context: any, next: any) => {
      const args = {
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        sheetId: { "in": "path", "name": "sheetId", "required": true, "dataType": "string" },
        rowId: { "in": "path", "name": "rowId", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "SheetRow" },
        accessToken: { "in": "header", "name": "x-google-access-token", "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new SheetController();

      const promise = controller.updateRow.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.put('/:documentId/:sheetId/:rowId/bulk',
    async (context: any, next: any) => {
      const args = {
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        sheetId: { "in": "path", "name": "sheetId", "required": true, "dataType": "string" },
        rowId: { "in": "path", "name": "rowId", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "dataType": "array", "array": { "ref": "SheetRow" } },
        accessToken: { "in": "header", "name": "x-google-access-token", "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new SheetController();

      const promise = controller.updateRowsBulk.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.post('/:documentId/:sheetId',
    async (context: any, next: any) => {
      const args = {
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        sheetId: { "in": "path", "name": "sheetId", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "SheetRow" },
        accessToken: { "in": "header", "name": "x-google-access-token", "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new SheetController();

      const promise = controller.createRow.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.post('/:documentId/:sheetId/bulk',
    async (context: any, next: any) => {
      const args = {
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        sheetId: { "in": "path", "name": "sheetId", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "dataType": "array", "array": { "ref": "SheetRow" } },
        accessToken: { "in": "header", "name": "x-google-access-token", "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new SheetController();

      const promise = controller.createRowsBulk.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get('/:documentId',
    async (context: any, next: any) => {
      const args = {
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        accessToken: { "in": "header", "name": "x-google-access-token", "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new SheetController();

      const promise = controller.getDocumentInfo.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
    return Promise.resolve(promise)
      .then((data: any) => {
        if (data || data === false) {
          context.body = data;
          context.status = 200;
        } else {
          context.status = 204;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            context.set(name, headers[name]);
          });

          const statusCode = controllerObj.getStatus();
          if (statusCode) {
            context.status = statusCode;
          }
        }
        return next();
      })
      .catch((error: any) => {
        context.status = error.status || 500;
        context.throw(context.status, error.message, error);
      });
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, context: any): any[] {
    const errorFields: FieldErrors = {};
    const values = Object.keys(args).map(key => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return context.request;
        case 'query':
          return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, { "specVersion": 3 });
        case 'path':
          return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, { "specVersion": 3 });
        case 'header':
          return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, { "specVersion": 3 });
        case 'body':
          return validationService.ValidateParam(args[key], context.request.body, name, errorFields, name + '.', { "specVersion": 3 });
        case 'body-prop':
          return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', { "specVersion": 3 });
      }
    });
    if (Object.keys(errorFields).length > 0) {
      throw new ValidateError(errorFields, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
