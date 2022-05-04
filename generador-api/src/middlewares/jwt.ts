import { Request, Response, NextFunction } from 'express'
import { _Jwt } from '../miscs';
import { ResultData } from '../models';
import config from '../config/config'
import * as jwt from 'jsonwebtoken'

/**
 * Checking if JWT is valid
 * @param req 
 * @param resp 
 * @param next 
 */
export const checkJwt = (req: Request, resp: Response, next: NextFunction) =>
{
	// Get bearer token from header
	const bearerHeader = req.headers.authorization;

	// Initialize variables
	let token
	let jwtPayLoad

	// Evaluate if token exist
	if (typeof bearerHeader !== 'undefined')
	{
		// Extract token
		token = bearerHeader.split(" ")[1]
	}
	else
	{
		// If token is null return Not Authorized
		return resp.status(401).json(new ResultData(_Jwt.JWT400))
	}

	try
	{
		// Verify if token is valid
		jwtPayLoad = <any>jwt.verify(token, config.jwtSecret)
		
		// Save on local response
		resp.locals.jwtPayload = jwtPayLoad
	}
	catch (error)
	{
		// If token is expired return Not Authorized
		return resp.status(401).json(new ResultData(_Jwt.JWT400))
	}

	// Generate new Token
	const { id, email, uuid } = jwtPayLoad
	const newToken = jwt.sign({ id, email, uuid }, config.jwtSecret, { expiresIn: '1y' })
	resp.setHeader('token', newToken)

	// Go to next function
	next()
}

export const getJwtData = (req: Request, resp: Response) =>
{
	const bearerHeader = req.headers.authorization;
	const token = bearerHeader.split(" ")[1]
	return <any>jwt.verify(token, config.jwtSecret)
}