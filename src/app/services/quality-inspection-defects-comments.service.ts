import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '../config/api-endpoint';


@Injectable({
  providedIn: 'root'
})
export class QualityInspectionDefectsCommentsService {
  constructor(private httpClient:HttpClient, private api:ApiEndpoint) { }
  private QualityInspectionDefectsCommentsAPI=this.api.Quality_Inspection_Defects_Comments_API


  getById(tokenID:any,Defect_ID:string){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', `*/*`);
    headers=headers.append('x-api-key',this.api.API_Key);
    headers = headers.append("Authorization",tokenID);

    return this.httpClient.get(this.QualityInspectionDefectsCommentsAPI+"/"+Defect_ID, { headers });

  }


  post(tokenID:any,qualityInspectionComments:any){
    let headers= new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', `*/*`);
    headers=headers.append('x-api-key',this.api.API_Key);
    headers = headers.append("Authorization",tokenID);
    
    let body=qualityInspectionComments

    return this.httpClient.post(this.QualityInspectionDefectsCommentsAPI,body,{headers})

  }

  



}
