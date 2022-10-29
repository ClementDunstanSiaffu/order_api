import express,{Request,Response,NextFunction} from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';


export type AppType = {
    get: (
            arg0: string, 
            arg1: (
                req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, 
                res: express.Response<any, Record<string, any>>) => void
        ) => void
    ,
    post: (
        arg0: string, 
        arg1: (
            req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, 
            res: express.Response<any, Record<string, any>>) => void
    ) => void,
    delete: (
        arg0: string, 
        arg1: (
            req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, 
            res: express.Response<any, Record<string, any>>) => void
    ) => void
}

