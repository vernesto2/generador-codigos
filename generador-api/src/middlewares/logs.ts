// import { Logs } from '../entities/Logs';
// import { getRepository } from 'typeorm';

// export const SaveOnLogs = async (idUser:number, action:string, tableName: string, oldData:string="", newData:string="") =>
// {
	
// 	const logsRepository = getRepository(Logs);
// 	const logs = new Logs();
// 	logs.idUser = idUser
// 	logs.action = action
// 	logs.table = tableName
// 	logs.oldData = oldData
// 	logs.newData = newData

// 	try
// 	{
// 		await logsRepository.save(logs)
// 		return true
// 	}
// 	catch (e)
// 	{
// 		return false
// 	}
// }