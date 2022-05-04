export enum _Auth
{
	AUTH400	= "YouAreLost",
	AUTH401	= 'EmailPassRequired',
	AUTH402	= 'EmailPassWrong',
	AUTH403	= 'OldNewPassRequired',
	AUTH404	= 'SomethingIsWrong',
	AUTH405	= 'OldPwdDoesntMatch',
	AUTH406	= 'PendingApproval',
	AUTH407	= 'MissingDocumentation',
	AUTH408	= 'TemporarilySuspended',
	AUTH409	= 'BlockedOut',
	AUTH410 = 'EmailNotRegistered',
	AUTH411 = 'ConfirmPwdDoesntMarch',
	AUTH412 = 'EmailRegistered',
	AUTH201	= "SuccessLogin",
	AUTH202	= "SuccessLogout",
	AUTH203	= 'PassChanged'
}

export enum _Jwt
{
	JWT400	= 'NotAuthorized'
}

export enum _Crud
{
	CRUD400	= 'NoResult',
	CRUD401	= 'AlreadyExist',
	CRUD402	= 'NotFound',
	CRUD403	= 'NoParams',
	CRUD200	= 'ResultData',
	CRUD201	= 'RecordCreated',
	CRUD202	= 'RecordUpdated',
	CRUD203	= 'RecordDeleted'
}