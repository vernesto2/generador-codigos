import { camelCase } from 'lodash'

export const camelize = (obj:any) : any => {
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
