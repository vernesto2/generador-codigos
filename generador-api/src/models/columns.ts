export class ColumnsModel
{
	ordinalPosition: Number
	tableName: string
	columnName: string
	dataType: string
	characterMaximumLength: number
	numericPrecision: number
	numericScale: number
	isNullable: string

	constructor()
	{
		this.ordinalPosition = 0
		this.tableName = ''
		this.columnName = ''
		this.dataType = ''
		this.characterMaximumLength = 0
		this.numericPrecision = 0
		this.numericScale = 0
		this.isNullable = ''
	}
}