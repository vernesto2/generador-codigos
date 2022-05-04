import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ColumnsModel, ResultData, TablesModel } from '../models';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	url           = environment.apiUrl;
	obj           : any
	carnet        : number = 0
	registroType  : string = ''

	private HttpOptionsPost = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

	constructor(
		private http: HttpClient,
    private spinner: NgxSpinnerService
	) { }

	getTables(): Observable<TablesModel[]>
	{
		return new Observable<TablesModel[]>(
			(observer) => {
				this.http.post<ResultData<TablesModel[]>>(`${environment.apiUrl}generator/tables`, {}, this.HttpOptionsPost).subscribe(
					(resp: ResultData<TablesModel[]>) => {
						let respData = Object.assign([], resp.data)
						let data: TablesModel[] = new Array<TablesModel>()
						if(resp.data == null) data = []
						else respData.forEach(item => { data.push(item) })
						observer.next(data)
					},
					async err => {
						this.handleError(err)
						observer.error(err)
					}
				)
			}
		)
	}

	getColumns(tname: string): Observable<ColumnsModel[]>
	{
		return new Observable<ColumnsModel[]>(
			(observer) => {
				this.http.post<ResultData<ColumnsModel[]>>(`${environment.apiUrl}generator/columnstable`, { table_name: tname }, this.HttpOptionsPost).subscribe(
					(resp: ResultData<ColumnsModel[]>) => {
						let respData = Object.assign([], resp.data)
						let data: ColumnsModel[] = new Array<ColumnsModel>()
						if(resp.data == null) data = []
						else respData.forEach(item => { data.push(item) })
						observer.next(data)
					},
					async err => {
						this.handleError(err)
						observer.error(err)
					}
				)
			}
		)
	}

	handleError(err: any): Observable<never>
	{
		let errMsg = 'An error ocurred retrieving data'
		if(err) errMsg = `Error: code ${err}`
		Swal.fire("Error", errMsg, 'error')
		this.spinner.hide()
		return throwError(errMsg)
	}
}
