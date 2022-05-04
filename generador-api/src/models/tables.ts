export class TablesModel
{
	tableCatalog: string
	tableSchema: string
	tableName: string
	tableType: string

	constructor()
	{
		this.tableCatalog = ''
		this.tableSchema = ''
		this.tableName = ''
		this.tableType = ''
	}
}