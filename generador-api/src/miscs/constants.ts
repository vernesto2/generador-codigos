import { JwtPayLoad } from '../models';
import { camelCase } from "lodash"

export const defaultDateTime: Date = new Date('1900-01-01 00:00:00');

export const validationOpt = { validationError : { target: false, value: false } }

export const getJwtPayLoad = (obj: any) => {
	const { id, email, uuid } = obj
	return new JwtPayLoad(Number(id), email, uuid)
}

export enum emailTemplates {
	WELLCOME = "WellcomeTemplate",
	RESETPWD = "ResetPwdTemplate",
	RIDECOMPL = "RideComplete"
}

export enum logActions {
	ACTLGN = "Login",
	ACTLOU = "Logout",
	ACTADD = "CreateRecord",
	ACTUPD = "UpdateRecord",
	ACTDEL = "DeleteRecord",
	ACTCHS = "ChangeStatus",
	ACTAUT = "Authorize",
	ACTREV = "Review",
	ACTRPT = "Reporting",
	ACTREG = "UserRegistered"
}

export const camelize = (obj:any) => {
	if (Array.isArray(obj)) {
		return obj.map((v) => camelize(v))
	} else if (obj !== null && obj.constructor === Object) { // (obj !== null && obj.constructor === Object) 
		return Object.keys(obj).reduce(
			(result, key) => ({
				...result,
				[String(camelCase(key))]: camelize(obj[key]),
			}),
			{},
		)
	}

	return obj
}

export const objMap = (obj: Object) => {
	for (const key in obj)
	{
		if (Object.prototype.hasOwnProperty.call(obj, key))
		{
			const element = obj[key]
			console.log(element);
			
		}
	}
}