import { Request, Response } from "express"
import { _Crud, camelize } from '../miscs'
import { ColumnsModel, ResultData, TablesModel } from '../models'
import * as mssql from 'mssql'
import { CONFIG } from "../config/config"

export class GeneratorController
{
	static GetColumns = async(req: Request, resp: Response) => {
		try
		{
			const { table_name } = req.body
			
			mssql.connect(CONFIG.MSSQL).then(pool => {
      			return pool.request()
					.input('TABLE_NAME', mssql.VarChar, table_name)
					//.output('output_parameter', mssql.VarChar(50))
					.execute('generator_get_columns')
			}).then(r => {
				let respData : ColumnsModel[] = Object.assign([], camelize(r.recordset))
				resp.status(201).json(new ResultData(_Crud.CRUD200,respData))
			}).catch(err => {
				resp.status(400).json(new ResultData(err))
			})
		}
		catch (e)
		{
			resp.status(400).json(new ResultData(e))
		}
	}

	static GetTablesName = async(req: Request, resp: Response) => {
		try
		{
			const { table_name } = req.body
			
			mssql.connect(CONFIG.MSSQL).then(pool => {
      			return pool.request()
					//.input('TABLE_NAME', mssql.VarChar, table_name)
					//.output('output_parameter', mssql.VarChar(50))
					.execute('generator_get_tables')
			}).then(r => {
				let respData : TablesModel[] = Object.assign([], camelize(r.recordset))
				resp.status(201).json(new ResultData(_Crud.CRUD200,respData))
			}).catch(err => {
				resp.status(400).json(new ResultData(err))
			})
		}
		catch (e)
		{
			resp.status(400).json(new ResultData(e))
		}
	}
}

export default GeneratorController