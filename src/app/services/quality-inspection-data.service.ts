import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '../config/api-endpoint';
import { QualityInspectionParameters } from '../models/quality-inspection-parameters';


@Injectable({
  providedIn: 'root'
})
export class QualityInspectionDataService {
  constructor(private httpClient:HttpClient, private api:ApiEndpoint) { }
  private QualityInspectionAPI=this.api.Quality_Inspection_API
  private QualityInspectionImageAPI=this.api.Quality_Inspection_Image_API

  get(tokenID:any){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', `*/*`);
    headers=headers.append('x-api-key',this.api.API_Key);
    headers = headers.append("Authorization",tokenID);
    
    return this.httpClient.get(this.QualityInspectionAPI, { headers });
  }

  post(tokenID:any,qualityParameters:QualityInspectionParameters):Observable<QualityInspectionParameters>{
    let headers= new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', `*/*`);
    headers=headers.append('x-api-key',this.api.API_Key);
    headers = headers.append("Authorization",tokenID);
    
    let body=qualityParameters

    return this.httpClient.post<QualityInspectionParameters>(this.QualityInspectionAPI,body,{headers})

  }

  put(tokenID:any,qualityParameters:any){
    let headers= new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', `*/*`);
    headers=headers.append('x-api-key',this.api.API_Key);
    headers = headers.append("Authorization",tokenID);
    
    let body=qualityParameters

    return this.httpClient.put(this.QualityInspectionAPI,body,{headers})

  }

  getImage(tokenID:any,key:any){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', `*/*`);
    headers=headers.append('x-api-key',this.api.API_Key);
    headers = headers.append("Authorization",tokenID);

    

    return this.httpClient.get(this.QualityInspectionImageAPI+"/"+key.Surface_Name+"/"+key.Defect_Type+"/"+key.Timestamp+"/"+key.Defect_ID, { headers });
  }

  postImage(tokenID:any,imageData:any){
    let headers= new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', `*/*`);
    headers=headers.append('x-api-key',this.api.API_Key);
    headers = headers.append("Authorization",tokenID);

    let body=imageData

    return this.httpClient.post(this.QualityInspectionImageAPI,body,{headers})
  }

}
