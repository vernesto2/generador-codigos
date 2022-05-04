import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { camelCase, upperCase,  } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { TablesModel, ColumnsModel } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

const mssqlCode = [
  { mssql: 'VarChar', sql: 'varchar' },
  { mssql: 'NVarChar', sql: 'nvarchar' },
  { mssql: 'Text', sql: 'text' },
  { mssql: 'Int', sql: 'int' },
  { mssql: 'BigInt', sql: 'bigint' },
  { mssql: 'TinyInt', sql: 'tinyint' },
  { mssql: 'SmallInt', sql: 'smallint' },
  { mssql: 'Bit', sql: 'bit' },
  { mssql: 'Float', sql: 'float' },
  { mssql: 'Numeric', sql: 'numeric' },
  { mssql: 'Decimal', sql: 'decimal' },
  { mssql: 'Real', sql: 'real' },
  { mssql: 'Date', sql: 'date' },
  { mssql: 'DateTime', sql: 'datetime' },
  { mssql: 'DateTime2', sql: 'datetime2' },
  { mssql: 'DateTimeOffset', sql: 'datetimeoffset' },
  { mssql: 'SmallDateTime', sql: 'smalldatetime' },
  { mssql: 'Time', sql: 'time' },
  { mssql: 'UniqueIdentifier', sql: 'uniqueidentifier' },
  { mssql: 'SmallMoney', sql: 'smallmoney' },
  { mssql: 'Money', sql: 'money' },
  { mssql: 'Binary', sql: 'binary' },
  { mssql: 'VarBinary', sql: 'varbinary' },
  { mssql: 'Image', sql: 'image' },
  { mssql: 'Xml', sql: 'xml' },
  { mssql: 'Char', sql: 'char' },
  { mssql: 'NChar', sql: 'nchar' },
  { mssql: 'NText', sql: 'ntext' },
  { mssql: 'TVP', sql: 'tvp' },
  { mssql: 'UDT', sql: 'udt' },
  { mssql: 'Geography', sql: 'geography' },
  { mssql: 'Geometry', sql: 'geometry' },
  { mssql: 'Variant', sql: 'variant' }
]

@Component({
	selector: 'app-generator',
	templateUrl: './generator.component.html',
	styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit
{
	tablesList          : TablesModel[] = []
	columns             : ColumnsModel[] = []

	selectedTable       : TablesModel = new TablesModel()
	modelCode           : string = ''
  serviceCode         : string = ''
  storeProcedureCode  : string = ''
  apiCode             : string = ''
  componentCode       : string = ''

	constructor(
		private _spinner: NgxSpinnerService,
		private _api: ApiService
	) { }

	ngOnInit()
	{
		this.getTables()
	}

	getTables()
	{
		this.tablesList = []

		this._spinner.show()

		this._api.getTables().subscribe(
			(data) => {
				this.tablesList = data.sort((a,b) => a.tableName.localeCompare(b.tableName))
				this._spinner.hide()
			},
			(err) => {
				this._spinner.hide()
			}
		)
	}

	getColumns(tname: string)
	{
		this._spinner.show()
		this._api.getColumns(tname).subscribe(
			(data) => {
				this.columns = data
				this._spinner.hide()
			},
			(err) => {
				this._spinner.hide()
			}
		)
	}

	onSelectTable()
	{
		this._spinner.show()
		this._api.getColumns(this.selectedTable.tableName).subscribe(
			(data) => {
				this.columns = data
				this.generateModel(this.selectedTable, this.columns)
				this.generateService(this.selectedTable, this.columns)
				this.generateStoreProcedures(this.selectedTable, this.columns)
        this.generateApi(this.selectedTable, this.columns)
        this.generateComponent(this.selectedTable,this.columns)
				this._spinner.hide()
			},
			(err) => {
				this._spinner.hide()
			}
		)
	}
  generateComponent(table: TablesModel, columns: ColumnsModel[]) {
    /**
		 * GENERATE ANGULAR COMPONENT
		 */
    const tableName = camelCase(table.tableName)
    const codigoComple='//AGREGAR CODIGO COMPLEMENTARIO'
		this.componentCode = ''
    this.componentCode += `import { ${tableName}Service } from './../../services/${tableName}.service';\n`
    this.componentCode += `import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';\n`
    this.componentCode += `import Swal from 'sweetalert2';\n`
    this.componentCode += `import { ${tableName}Model } from './../../models/[NombreRutaModelo]'\n`
    this.componentCode += `import { NgxSpinnerService } from 'ngx-spinner';\n\n`


    this.componentCode +=`export class ${tableName}Component implements OnInit {\n`
    this.componentCode += `\t${tableName}List: ${tableName}Model[] = [];\n`
    this.componentCode += `\t${tableName}Model: ${tableName}Model = new ${tableName}Model();\n\n`
    this.componentCode += `\tconstructor(\n`
    this.componentCode += `\t\tprivate _${tableName}Service : ${tableName}Service,\n`
    this.componentCode += `\t\tprivate _spinner : NgxSpinnerService,\n`

    this.componentCode+=`\t){}\n\n`
    //Obtener Todo
    this.componentCode +=`\tobtener(){\n`
    this.componentCode +=`\t\tthis._spinner.show();\n`
    this.componentCode +=`\t\tthis._${tableName}Service.obtener()\n`
    this.componentCode +=`\t\t.subscribe((resp : any)=>{\n`
    this.componentCode +=`\t\t\tthis._spinner.hide(); \n`
    this.componentCode +=`\t\t\tthis.${tableName}List=resp; \n`
    this.componentCode +=`\t\t\t${codigoComple} \n`
    this.componentCode +=`\t\t},\n`
    this.componentCode +=`\t\t(error)=>{\n`
    this.componentCode +=`\t\t\tthis._spinner.hide(); \n`
    this.componentCode +=`\t\t\tSwal('Notificación','Ocurrio un problema','warning');\n`
    this.componentCode +=`\t\t},\n`
    this.componentCode +=`\t\t()=>{\n`
    this.componentCode +=`\t\t\tthis._spinner.hide();\n`
    this.componentCode +=`\t\t\t}\n`
    this.componentCode +=`\t\t)\n`
    this.componentCode +=`\t}\n\n`

     //Obtener Uno
     this.componentCode +=`\tobtenerUno(id:number){\n`
     this.componentCode +=`\t\tthis._spinner.show();\n`
     this.componentCode +=`\t\tthis._${tableName}Service.obtener(id)\n`
     this.componentCode +=`\t\t.subscribe((resp : any)=>{\n`
     this.componentCode +=`\t\t\tthis._spinner.hide(); \n`
     this.componentCode +=`\t\t\tthis.${tableName}Model=resp; \n`
     this.componentCode +=`\t\t\t${codigoComple} \n`
     this.componentCode +=`\t\t},\n`
     this.componentCode +=`\t\t(error)=>{\n`
     this.componentCode +=`\t\t\tthis._spinner.hide(); \n`
     this.componentCode +=`\t\t\tSwal('Notificación','Ocurrio un problema','warning');\n`
     this.componentCode +=`\t\t},\n`
     this.componentCode +=`\t\t()=>{\n`
     this.componentCode +=`\t\t\tthis._spinner.hide();\n`
     this.componentCode +=`\t\t\t}\n`
     this.componentCode +=`\t\t)\n`
     this.componentCode +=`\t}\n\n`

    //Guardar
    this.componentCode +=`\tguardar(){\n`
    this.componentCode +=`\t\tthis._spinner.show();\n`
    this.componentCode +=`\t\tthis._${tableName}Service.guardar(this.${tableName.toLowerCase()}Model)\n`
    this.componentCode +=`\t\t.subscribe((resp : any)=>{\n`
    this.componentCode +=`\t\t\tthis._spinner.hide(); \n`
    this.componentCode +=`\t\t\t${codigoComple} \n`
    this.componentCode +=`\t\t},\n`
    this.componentCode +=`\t\t(error)=>{\n`
    this.componentCode +=`\t\t\tthis._spinner.hide(); \n`
    this.componentCode +=`\t\t\tSwal('Notificación','Ocurrio un problema','warning');\n`
    this.componentCode +=`\t\t},\n`
    this.componentCode +=`\t\t()=>{\n`
    this.componentCode +=`\t\t\tthis._spinner.hide();\n`
    this.componentCode +=`\t\t\t}\n`
    this.componentCode +=`\t\t)\n`
    this.componentCode +=`\t}\n`
    this.componentCode +=`}\n`



  }

	generateModel(table: TablesModel, columns: ColumnsModel[])
	{
		const tableName = camelCase(table.tableName)
		this.modelCode = ''

		/**
		 * GENERATE ANGULAR MODEL
		 */

		this.modelCode += `export class ${tableName}Model\n{\n`
		columns.forEach(col => {
      const field = camelCase(col.columnName)

			switch (col.dataType) {
        case 'int': case 'bigint': case 'decimal': case 'float': case 'numeric' :
          this.modelCode += `\t${field} : number`
          this.modelCode += (col.isNullable == "YES") ? ' | null' : ''
          this.modelCode += `\n`
					break;

				case 'varchar' : case 'nvarchar' : case 'text':
          this.modelCode += `\t${field} : string`
          this.modelCode += (col.isNullable == "YES") ? ' | null' : ''
          this.modelCode += `\n`
					break;

        case 'date' : case 'time' : case 'datetime' : case 'datetime2' : case 'timestamp' :
          this.modelCode += `\t${field} : Date`
          this.modelCode += (col.isNullable == "YES") ? ' | null' : ''
          this.modelCode += `\n`
          break;
        case 'bit' : case 'tinyint' :
          this.modelCode += `\t${field} : boolean`
          this.modelCode += (col.isNullable == "YES") ? ' | null' : ''
          this.modelCode += `\n`
          break;

				default:
					break;
			}
		})
    this.modelCode += `\n\tconstructor()\n`
    this.modelCode += `\t{\n`
    columns.forEach(col => {
      const field = camelCase(col.columnName)

			switch (col.dataType) {
        case 'int': case 'decimal': case 'float': case 'numeric' :
          this.modelCode += `\t\tthis.${field} = 0`
          this.modelCode += `\n`
					break;

        case 'bigint':
          this.modelCode += `\t\tthis.${field} = -1`
          this.modelCode += `\n`
					break;

				case 'varchar' : case 'nvarchar' : case 'text':
          this.modelCode += `\t\tthis.${field} = ''`
          this.modelCode += `\n`
					break;

        case 'date' : case 'time' : case 'datetime' : case 'datetime2' : case 'timestamp' :
          this.modelCode += `\t\tthis.${field} = new Date()`
          this.modelCode += `\n`
          break;
        case 'bit' : case 'tinyint' :
          this.modelCode += `\t\tthis.${field} = 0`
          this.modelCode += `\n`
          break;

				default:
					break;
			}
		})
    this.modelCode += `\t}\n`
		this.modelCode += `}`
	}

	generateService(table: TablesModel, columns: ColumnsModel[])
	{
    const ruta='[CAMBIAR_RUTA]'
		const tableName = camelCase(table.tableName)
		this.serviceCode = ''

		/**
		 * GENERATE ANGULAR SERVICE
		 */

    this.serviceCode += `import { Injectable } from '@angular/core'\n`
    this.serviceCode += `import { HttpClient, HttpHeaders } from '@angular/common/http'\n`
    this.serviceCode += `import { getBaseUrl } from '../app.config'\n`
    this.serviceCode += `import Swal from 'sweetalert2'\n`
    this.serviceCode += `import { NgxSpinnerService } from 'ngx-spinner'\n`
    this.serviceCode += `import { DocumentsModel, ResponseModel } from '@app/models';\n`
    this.serviceCode += `import { Observable, throwError } from 'rxjs';\n`
    this.serviceCode += `import { catchError, map } from 'rxjs/operators';\n`
    this.serviceCode += `import { ConfigService } from './config.service';\n\n`
    this.serviceCode += `@Injectable({ providedIn: 'root' })\n\n`
    this.serviceCode += `export class ${tableName}Service\n{\n`
    this.serviceCode += `\tprivate UrlEndPoint: string = environment.apiUrl\n`
    this.serviceCode += `\tconstructor(\n`
    this.serviceCode += `\t\tprivate _http: HttpClient,\n`
    this.serviceCode += `\t\tprivate _config:ConfigService\n`
    this.serviceCode += `\t) { }\n\n`

    //obtener Todo o Uno
    this.serviceCode += `\tpublic obtener(id?:number) : Observable<ResponseModel[]>`
    this.serviceCode += `\t{\n`
    this.serviceCode += `\t\treturn this._http.post<ResponseModel>(\`$\{this.UrlEndPoint}/${ruta}\``
    this.serviceCode += `\n\t\t,{ 'id' : id },\n`
    this.serviceCode += `\t\t { 'headers' : this._config.headers })\n`
    this.serviceCode += `\t\t.pipe(\n`
    this.serviceCode += `\t\t\tmap((resp:ResponseModel) => {\n`
    this.serviceCode += `\t\t\t\treturn resp.data\n`
    this.serviceCode += `\t\t\t}),\n`
    this.serviceCode += `\t\t\tcatchError(err => {\n`
    this.serviceCode += `\t\t\treturn throwError(err);\n`
    this.serviceCode += `\t\t})\n`
    this.serviceCode += `\t)}\n\n`

    //guardar
    this.serviceCode += `\tpublic guardar(${tableName}Model: any): Observable<ResponseModel>`
    this.serviceCode += `\t{\n`
    this.serviceCode += `\t\treturn this._http.post<ResponseModel>(\`$\{this.UrlEndPoint}/${ruta}/\``
    this.serviceCode += `\n\t\t,${tableName}Model,\n`
    this.serviceCode += `\t\t{ 'headers' : this._config.headers })\n`
    this.serviceCode += `\t\t.pipe(\n`
    this.serviceCode += `\t\t\tmap((resp:ResponseModel) => {\n`
    this.serviceCode += `\t\t\t\treturn resp.data\n`
    this.serviceCode += `\t\t\t}),\n`
    this.serviceCode += `\t\t\tcatchError(err => {\n`
    this.serviceCode += `\t\t\treturn throwError(err);\n`
    this.serviceCode += `\t\t})\n`
    this.serviceCode += `\t)}\n`
    this.serviceCode += `}`

		/*this.modelCode += `export class ${tableName}Model\n{\n`
		columns.forEach(col => {
      const field = camelCase(col.columnName)

			switch (col.dataType) {
        case 'int': case 'bigint': case 'decimal': case 'float': case 'numeric' :
          this.modelCode += `\t${field} : number`
          this.modelCode += (col.isNullable == "YES") ? ' | null' : ''
          this.modelCode += `\n`
					break;

				case 'varchar' : case 'nvarchar' : case 'text':
          this.modelCode += `\t${field} : string`
          this.modelCode += (col.isNullable == "YES") ? ' | null' : ''
          this.modelCode += `\n`
					break;

        case 'date' : case 'time' : case 'datetime' : case 'datetime2' : case 'timestamp' :
          this.modelCode += `\t${field} : Date`
          this.modelCode += (col.isNullable == "YES") ? ' | null' : ''
          this.modelCode += `\n`
          break;
        case 'bit' : case 'tinyint' :
          this.modelCode += `\t${field} : number`
          this.modelCode += (col.isNullable == "YES") ? ' | null' : ''
          this.modelCode += `\n`
          break;

				default:
					break;
			}
		})
    this.modelCode += `\n\tconstructor()\n`
    this.modelCode += `\t{\n`
    columns.forEach(col => {
      const field = camelCase(col.columnName)

			switch (col.dataType) {
        case 'int': case 'decimal': case 'float': case 'numeric' :
          this.modelCode += `\t\tthis.${field} = 0`
          this.modelCode += `\n`
					break;

        case 'bigint':
          this.modelCode += `\t\tthis.${field} = -1`
          this.modelCode += `\n`
					break;

				case 'varchar' : case 'nvarchar' : case 'text':
          this.modelCode += `\t\tthis.${field} = ''`
          this.modelCode += `\n`
					break;

        case 'date' : case 'time' : case 'datetime' : case 'datetime2' : case 'timestamp' :
          this.modelCode += `\t\tthis.${field} = new Date()`
          this.modelCode += `\n`
          break;
        case 'bit' : case 'tinyint' :
          this.modelCode += `\t\tthis.${field} = 0`
          this.modelCode += `\n`
          break;

				default:
					break;
			}
		})
    this.modelCode += `\t}\n`
		this.modelCode += `}`*/
	}

	generateStoreProcedures(table: TablesModel, columns: ColumnsModel[])
  {
    /**
     * GENERATE STORE PROCEDURES
     */

    this.storeProcedureCode = ''

    /* SAVE INSTRUCTION */
    this.storeProcedureCode += `USE SivetWeb\nGO\n\n`

    this.storeProcedureCode += `CREATE PROCEDURE ${table.tableSchema}.sp_${table.tableName}_ver\n`
    this.storeProcedureCode += `\t@p_id BIGINT = NULL AS\nBEGIN\n`
    this.storeProcedureCode += `\tIF @p_id IS NOT NULL\n`
    this.storeProcedureCode += `\t\tSELECT * FROM ${table.tableName} WHERE id = @p_id\n`
    this.storeProcedureCode += `\tELSE\n`
    this.storeProcedureCode += `\t\tSELECT * FROM ${table.tableName}\n`
    this.storeProcedureCode += `END\nGO\n\n`

    this.storeProcedureCode += `CREATE PROCEDURE ${table.tableSchema}.sp_${table.tableName}_guardar\n`

    columns.forEach(col => {
      console.log(col.dataType);
      console.log(col.characterMaximumLength);

      const presicion = ((col.dataType == 'numeric' || col.dataType == 'decimal') && +col.numericPrecision > 0 ) ? `(${col.numericPrecision}, ${col.numericScale})` : ''
      const lenght = ((col.dataType == 'varchar') && +col.characterMaximumLength > 0 ) ? `(${col.characterMaximumLength})` : ( (+col.characterMaximumLength == -1) ? '(MAX)' : '' )
      const isId = (col.columnName != 'id') ? ',' : ''
      const field = camelCase(col.columnName)
      const dataType = upperCase(col.dataType)
      this.storeProcedureCode += `\t${isId}@p_${field} ${dataType}${presicion}${lenght}\n`
    })
    this.storeProcedureCode += `AS\nBEGIN\n`
    this.storeProcedureCode += `\tIF EXISTS (SELECT * FROM ${table.tableSchema}.${table.tableName} WHERE id = @p_id)\n`
    this.storeProcedureCode += `\t\tUPDATE ${table.tableSchema}.${table.tableName} SET\n`

    let counter = 0
    columns.forEach(col => {
      //const isId = (col.columnName != 'id') ? ',' : ''
      const isId = (counter == 1) ? '' : ','
      const field = camelCase(col.columnName)
      if(counter > 0)
      {
        if (field != 'creadoEn' && field != 'creadoPor')
        {
          if (field == 'modificadoEn') this.storeProcedureCode += `\t\t\t${isId}${col.columnName} = GETDATE()\n`
          else this.storeProcedureCode += `\t\t\t${isId}${col.columnName} = @p_${field}\n`
        }
      }
      counter++
    })

    this.storeProcedureCode += `\t\tWHERE id=@p_id\n`
    this.storeProcedureCode += `\tELSE\n`
    this.storeProcedureCode += `\t\tINSERT INTO ${table.tableSchema}.${table.tableName} (\n`

    counter = 0
    columns.forEach(col => {
      //const isId = (col.columnName != 'id') ? ',' : ''
      const isId = (counter == 1) ? '' : ','
      if(counter > 0) this.storeProcedureCode += `\t\t\t${isId}${col.columnName}\n`
      counter++
    })

    this.storeProcedureCode += `\t\t)\n\t\tVALUES(\n`

    counter = 0

    columns.forEach(col => {
      //const isId = (col.columnName != 'id') ? ',' : ''
      const isId = (counter == 1) ? '' : ','
      const field = camelCase(col.columnName)
      if(counter > 0)
      {
        if (field == 'creadoEn' || field == 'modificadoEn') this.storeProcedureCode += `\t\t\t${isId}GETDATE()\n`
        else this.storeProcedureCode += `\t\t\t${isId}@p_${field}\n`
      }
      counter++
    })

    this.storeProcedureCode += `\t\t)\n\tEND\nGO\n\n`
  }

  generateApi(table: TablesModel, columns: ColumnsModel[])
  {
    const tableName = camelCase(table.tableName)

    this.apiCode = ''

    this.apiCode += `static ${tableName}Obtener = async(req: Request, resp: Response) => {\n`
    this.apiCode += `\ttry\n`
    this.apiCode += `\t{\n`
    this.apiCode += `\t\tconst { id } = req.body\n\n`
    this.apiCode += `\t\tmssql.connect(CONFIG.MSSQL).then(pool => {\n`
    this.apiCode += `\t\t\treturn pool.request()\n`
    this.apiCode += `\t\t\t.input("p_id", mssql.BigInt, id)\n`
    this.apiCode += `\t\t\t.execute("sp_${table.tableName}_ver")\n`
    this.apiCode += `\t\t}).then(r => {\n`
    this.apiCode += `\t\t\tresp.status(200).json(new ResultData("ResultData", camelize(r.recordset)))\n`
    this.apiCode += `\t\t}).catch(err => {\n`
    this.apiCode += `\t\t\tresp.status(400).json(new ResultData(err))\n`
    this.apiCode += `\t\t})\n`
    this.apiCode += `\t}\n`
    this.apiCode += `\tcatch (e)\n`
    this.apiCode += `\t{\n`
    this.apiCode += `\t\tresp.status(400).json(new ResultData(e))\n`
    this.apiCode += `\t}\n`
    this.apiCode += `}\n\n`

    this.apiCode += `static ${tableName}Guardar = async(req: Request, resp: Response) => {\n`
    this.apiCode += `\ttry {\n`
    this.apiCode += `\t\tconst {\n`
    columns.forEach(col => {
      const field = camelCase(col.columnName)
      const isId = (col.columnName != 'id') ? ',' : ''
      this.apiCode += `\t\t\t${isId}${field}\n`
    })
    this.apiCode += `\t\t} = req.body\n`
    this.apiCode += `\t\tmssql.connect(CONFIG.MSSQL).then(pool => {\n`
    this.apiCode += `\t\t\treturn pool.request()\n`
    columns.forEach(col => {
      const field = camelCase(col.columnName)
      const type = mssqlCode.find( f => f.sql == col.dataType)?.mssql
      this.apiCode += `\t\t\t\t.input("p_${field}", mssql.${type}, ${field})\n`
    })
    this.apiCode += `\t\t\t\t.execute('sp_${table.tableName}_guardar')\n`
    this.apiCode += `\t\t}).then(r => {\n`
    this.apiCode += `\t\t\tif (id == -1) resp.status(201).json(new ResultData(_Crud.CRUD201, camelize(r.recordset)))\n`
		this.apiCode += `\t\t\telse if (id > 0) resp.status(201).json(new ResultData(_Crud.CRUD202, camelize(r.recordset)))\n`
    this.apiCode += `\t\t}).catch(err => {\n`
    this.apiCode += `\t\t\tresp.status(400).json(new ResultData(err))\n`
    this.apiCode += `\t\t})\n`
    this.apiCode += `\t} catch (err) {\n`
    this.apiCode += `\t\tresp.status(400).json(new ResultData(err))\n`
    this.apiCode += `\t}\n`
    this.apiCode += `}\n`
  }
}
