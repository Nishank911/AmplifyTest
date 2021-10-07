import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
 })
export class ApiEndpoint {
   constructor() {}
   public Quality_Inspection_API = 'https://zrzg20oloe.execute-api.us-east-1.amazonaws.com/api/honda_quality_inspection_defects';
   public Quality_Inspection_Image_API="https://zrzg20oloe.execute-api.us-east-1.amazonaws.com/api/honda-quality-inspection";
   public Quality_Inspection_Defects_Comments_API="https://zrzg20oloe.execute-api.us-east-1.amazonaws.com/api/honda_quality_inspection_defects-comments";
   public API_Key="ZOSXPsq11h0STq29Xh6c7QClkbmExDR3xceNw2Y4"
}
