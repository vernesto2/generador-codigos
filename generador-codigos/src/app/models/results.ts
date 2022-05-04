export class ResultData<T>
{
	message	: string
  data : T | T[]
	token	: string

  constructor(message:string, data:any = null, token: string = '')
	{
		this.message = message
		this.data = data
		this.token = token
	}
}

export class JwtPayLoad
{
	id : number
	email : string
	uuid : string

	constructor(id: number, email: string, uuid: string)
	{
		this.id = id
		this.email = email
		this.uuid = uuid
	}
}
