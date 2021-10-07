import { Component, OnInit, NgZone } from '@angular/core';
import { Chart, Tooltip, ChartType, ChartOptions} from 'chart.js'
import { Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { QualityInspectionParameters } from 'src/app/models/quality-inspection-parameters';
import { QualityInspectionDataService } from 'src/app/services/quality-inspection-data.service';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common';
import awsconfig from '../../../aws-exports';
import { DefectCategories } from 'src/app/models/defect-categories';
import { QualityInspectionDefectsCommentsService } from 'src/app/services/quality-inspection-defects-comments.service';
import { NgxSpinnerService } from "ngx-spinner";



// import consts from "../../config/constants"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
    // Doughnut 
  public doughnutChartLabels: Label[] = ['POROSITY', 'SCRATCHES', 'DENTS', 'BURRS','SCUFF MARKS'];
  public doughnutChartDataToday: MultiDataSet = [[],];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOption: ChartOptions[] = [{
    legend:{
      display:true,
      position:'bottom'
    }
    
  }];
  //Doughnut week//
  public doughnutChartDataWeek: MultiDataSet = [[],];
  //
  //Doughnut month//
  public doughnutChartDataMonth: MultiDataSet = [[],];
  //

  //date range
  minDate:any
  maxDate:any
  dt:any
  enddt:any

  //////
  
  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    beforeDraw:function(chart:any) { 
      const ctx = chart.ctx;
      const txt = 'Center Text';
      const sidePadding = 60;
      const innerRadius = 50;
      const sidePaddingCalculated = (sidePadding / 100) * (innerRadius * 2)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = (innerRadius * 2) - sidePaddingCalculated;
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = (innerRadius * 2);
      const fontSizeToUse = Math.min(newFontSize, elementHeight);
      ctx.font = fontSizeToUse + 'px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText('Total', centerX, centerY);
    
    }
  }];
  //barChart
  type = 'bar';
  data:{labels:string[],datasets:any} = {
    labels: [],
    datasets: [   
      {
        label: "POROSITY",
        data: [],
        type: 'line',
        borderColor:'#FFA1B5',
        backgroundColor:'#FFA1B5',
        fill: false
      },
      {
        label: "SCRATCHES",
        data: [],
        type: 'line',
        borderColor:'#86C7F3',
        backgroundColor:'#86C7F3',
        fill: false
      },
      {
        label: "DENTS",
        data: [],
        type: 'line',
        borderColor:'#FFE29A',
        backgroundColor:'#FFE29A',
        fill: false
      },
      {
        label: "BURRS",
        data: [],
        type: 'line',
        borderColor:'#F1F2F4',
        backgroundColor:'#F1F2F4',
        fill: false
      },
      {
        label: "SCUFF MARKS",
        data: [],
        type: 'line',
        borderColor:'#93D9D9',
        backgroundColor:'#93D9D9',
        fill: false
      },
      {
        label: "PRODUCTION",
        data: [],
        backgroundColor:'#006FBA',  
        CaretPosition:screenLeft     
      },
      {
        label: "DEFECTS",
        data: [],
        backgroundColor:'green'
      },
      {
        label: "FAIL DEFECTS",
        data: [],
        backgroundColor:'pink'
      },
    ]
  };
  
  options = {
    responsive: true,
  };

  //Months Data
  data1:{labels:string[],datasets:any} = {
    labels: [],
    datasets: [   
      {
        label: "POROSITY",
        data: [],
        type: 'line',
        borderColor:'#FFA1B5',
        backgroundColor:'#FFA1B5',
        fill: false
      },
      {
        label: "SCRATCHES",
        data: [],
        type: 'line',
        borderColor:'#86C7F3',
        backgroundColor:'#86C7F3',
        fill: false
      },
      {
        label: "DENTS",
        data: [],
        type: 'line',
        borderColor:'#FFE29A',
        backgroundColor:'#FFE29A',
        fill: false
      },
      {
        label: "BURRS",
        data: [],
        type: 'line',
        borderColor:'#F1F2F4',
        backgroundColor:'#F1F2F4',
        fill: false
      },
      {
        label: "SCUFF MARKS",
        data: [],
        type: 'line',
        borderColor:'#93D9D9',
        backgroundColor:'#93D9D9',
        fill: false
      },
      {
        label: "PRODUCTION",
        data: [],
        backgroundColor:'#006FBA',  
        CaretPosition:screenLeft     
      },
      {
        label: "DEFECTS",
        data: [],
        backgroundColor:'green'
      },
      {
        label: "FAIL DEFECTS",
        data: [],
        backgroundColor:'pink'
      },
    ]
  };

  //doughnut data
  week: boolean = false;
  today: boolean = true;
  month: boolean = false;
  setActiveDiv(div:any) {
    if (div == 1) {
      this.week = true;
      this.month = false;
      this.today = false;
    }
    else if(div == 2)
    {
      this.week = false;
      this.month = true;
      this.today = false;
    }
    else if(div == 3)
    {
      this.week = false;
      this.month = false;
      this.today = true;
    }
  }

  //chart data
  chartweek: boolean = true;
  chartmonth: boolean = false;
  setActiveDivChart(div:any) {
    if (div == 1) {
      this.chartweek = true;
      this.chartmonth = false;
    }
    else if(div == 2)
    {
      this.chartweek = false;
      this.chartmonth = true;
    }
  }

  constructor(private spinner: NgxSpinnerService,private defectsCommentsService:QualityInspectionDefectsCommentsService,private datePipe: DatePipe,private QualityInspectionApi:QualityInspectionDataService,private router:Router,private zone: NgZone) { }
  tokenID:any
  username:any
  params!:QualityInspectionParameters[]
  getImg:string[]=[]
  imageKey:{}[]=[]
  url?:string
  user: CognitoUserInterface | undefined;
  authState?: AuthState;
  date:any
  defectsData:any=[]
  //MonthDefect Chart Data//
  monthDefect:any=[]
  /////////////////////////
  chartLoading:boolean=true

  //status button css//
  buttonCSS=["greenlabel","amberlabel","redlabel"]
  
  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
        this.spinner.hide()
    }, 3000);
    //Current Date//
    var myCurrentDate=new Date();
    for(let i=0;i<7;i++){
      this.defectsData.push(new DefectCategories())
      let dt:any=this.datePipe.transform(new Date().setDate(new Date().getDate() - i),"MMM d")
      this.data.labels.push(dt)
    }
    for(let i=0;i<30;i++){
      this.monthDefect.push(new DefectCategories())
      let dt:any=this.datePipe.transform(new Date().setDate(new Date().getDate() - i),"MMM d")
      this.data1.labels.push(dt)
    }
    ///////////////

    //get tokenID 
    this.username=localStorage.getItem("CognitoIdentityServiceProvider."+awsconfig.aws_user_pools_web_client_id+".LastAuthUser")
    //console.log("username:",this.username)
    this.tokenID=(localStorage.getItem("CognitoIdentityServiceProvider."+awsconfig.aws_user_pools_web_client_id+"."+this.username+".idToken"))
    if(this.tokenID==null||this.tokenID==""){
      this.router.navigateByUrl('login').then(()=>{
        window.location.reload()
      })
    }
    
    onAuthUIStateChange((authState, authData) => {
      
      this.authState = authState;//use auth state at different routes to check for login access
      
      console.log(this.authState)
      this.user = authData as CognitoUserInterface;
      if (this.authState != AuthState.SignedIn) {
          this.router.navigateByUrl('login').then(()=>{
            window.location.reload()
          })
    }
      //console.log("Auth:")
    })
    
    this.QualityInspectionApi.get(this.tokenID).subscribe((dataDB:any)=>{
      console.log("data:",dataDB)
      this.params=dataDB
      console.log("params:",this.params)

      dataDB.map((dt:any)=>{
        for(let i=0;i<7;i++){          
          if(this.datePipe.transform(dt.Timestamp,"MMM d")==this.datePipe.transform(new Date().setDate(new Date().getDate() - i),"MMM d")){
            console.log("inc")
            switch(dt.Defect_Type){
              case "scratch":
                this.defectsData[i].SCRATCHES++
                break;
              case "Porosity":
                this.defectsData[i].POROSITY++
                break;
              case "Dents":
                console.log()
                this.defectsData[i].DENTS++
                break;
              case "Burrs":
                this.defectsData[i].BURR++
                break;
              case "Scuff-Marks":
                this.defectsData[i].SCUFF_MARKS++
                break;
            }
          }
        }

        
      })
      
      
    })

    setTimeout(() => {
      this.params.map((dt:any)=>{
        //Months data
        let day=new DefectCategories()
        for(let i=0;i<30;i++){
          
          day.SCRATCHES=0;day.POROSITY=0;day.DENTS=0;day.BURR=0;day.SCUFF_MARKS=0;
          if(this.datePipe.transform(dt.Timestamp,"MMM d")==this.datePipe.transform(new Date().setDate(new Date().getDate() - i),"MMM d")){
            console.log("inc")
            switch(dt.Defect_Type){
              case "scratch":
                this.monthDefect[i].SCRATCHES++
                break;
              case "Porosity":
                this.monthDefect[i].POROSITY++
                break;
              case "Dents":
                console.log()
                this.monthDefect[i].DENTS++
                break;
              case "Burrs":
                this.monthDefect[i].BURR++
                break;
              case "Scuff-Marks":
                this.monthDefect[i].SCUFF_MARKS++
                break;
            }
            // if(dt.Defect_Type=="scratch"){
            //   this.defectsData[i].SCRATCHES++
            // }
          }
         
        }
      })
    }, 3000);
    //Get Image From S3
    
    //////Chart Data/////
    setTimeout(() => {
      for(let i=0;i<7;i++){
        // console.log("Scracthes:",this.defectsData[i].SCRATCHES)
        this.data.datasets[0].data.push(this.defectsData[i].POROSITY)
        this.data.datasets[1].data.push(this.defectsData[i].SCRATCHES)
        this.data.datasets[2].data.push(this.defectsData[i].DENTS)
        this.data.datasets[3].data.push(this.defectsData[i].BURR)
        this.data.datasets[4].data.push(this.defectsData[i].SCUFF_MARKS)
        //console.log("chart:",this.data.datasets)
      }
      this.doughnutChartDataToday[0].push(this.defectsData[0].POROSITY)
      this.doughnutChartDataToday[0].push(this.defectsData[0].SCRATCHES)
      this.doughnutChartDataToday[0].push(this.defectsData[0].DENTS)
      this.doughnutChartDataToday[0].push(this.defectsData[0].BURR)
      this.doughnutChartDataToday[0].push(this.defectsData[0].SCUFF_MARKS)
      this.chartLoading=false

      //WeeksDoughnut
      let weekDefect:DefectCategories=new DefectCategories()
      for(let i=0;i<7;i++){
        weekDefect.POROSITY+=this.defectsData[i].POROSITY
        weekDefect.SCRATCHES+=this.defectsData[i].SCRATCHES
        weekDefect.DENTS+=this.defectsData[i].DENTS
        weekDefect.BURR+=this.defectsData[i].BURR
        weekDefect.SCUFF_MARKS+=this.defectsData[i].SCUFF_MARKS
      }
      this.doughnutChartDataWeek[0].push(weekDefect.POROSITY)
      this.doughnutChartDataWeek[0].push(weekDefect.SCRATCHES)
      this.doughnutChartDataWeek[0].push(weekDefect.DENTS)
      this.doughnutChartDataWeek[0].push(weekDefect.BURR)
      this.doughnutChartDataWeek[0].push(weekDefect.SCUFF_MARKS)
      this.chartLoading=false
      ///////////////
      //MonthsDoughnut
      let monthDefect:DefectCategories=new DefectCategories()
      for(let i=0;i<30;i++){
        monthDefect.POROSITY+=this.monthDefect[i].POROSITY
        monthDefect.SCRATCHES+=this.monthDefect[i].SCRATCHES
        monthDefect.DENTS+=this.monthDefect[i].DENTS
        monthDefect.BURR+=this.monthDefect[i].BURR
        monthDefect.SCUFF_MARKS+=this.monthDefect[i].SCUFF_MARKS
      }
      this.doughnutChartDataMonth[0].push(monthDefect.POROSITY)
      this.doughnutChartDataMonth[0].push(monthDefect.SCRATCHES)
      this.doughnutChartDataMonth[0].push(monthDefect.DENTS)
      this.doughnutChartDataMonth[0].push(monthDefect.BURR)
      this.doughnutChartDataMonth[0].push(monthDefect.SCUFF_MARKS)
      this.chartLoading=false
      ///////////////
      // console.log("monthDefect:",this.doughnutChartData1)
      //Months Data
      for(let i=0;i<30;i++){
        // console.log("Scracthes:",this.defectsData[i].SCRATCHES)
        this.data1.datasets[0].data.push(this.monthDefect[i].POROSITY)
        this.data1.datasets[1].data.push(this.monthDefect[i].SCRATCHES)
        this.data1.datasets[2].data.push(this.monthDefect[i].DENTS)
        this.data1.datasets[3].data.push(this.monthDefect[i].BURR)
        this.data1.datasets[4].data.push(this.monthDefect[i].SCUFF_MARKS)
        //console.log("chart:",this.data.datasets)
      }

    }, 3000); 
    

    

  }
  
  searchText!:string
  getval(name:any,start:any,end:any)
  {
    console.log(name.value,start.value,end.value)

  }
  reset()
  {
    this.params=this.tableData
    this.searchDate=[]
    
    this.searchText=""
    this.dt=""
    this.enddt=""
    this.resetButtonBool=true
    
  }
  searchDate:QualityInspectionParameters[]=[]
  tableData:QualityInspectionParameters[]=[]
  resetButtonBool:boolean=true
  search(val:any)
  {
    this.resetButtonBool=false
    this.tableData=this.params
console.log("call")
    ////////////
    var startDate = new Date(this.dt);
    var endDate = new Date(this.enddt);
    this.searchText=val;
    this.params?.map((data:any)=>{
      if(new Date(data.Timestamp)>=endDate&&new Date(data.Timestamp)<=startDate){
        if(data.Defect_Type?.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())){
          console.log("klklkklkllk:",data)
          this.searchDate.push(data)
          
        }
        

      }
      this.params=this.searchDate 
      console.log("pol",this.params)     
      
    })
    this.searchText="";
        console.log("Sorted:",this.searchDate)
    ////////////
    // this.searchText=val;
    // if(this.searchText=="")
    // {
    //   this.ngOnInit();
    // }
    // else{
    //   this.params=this.params?.filter(res=>{
    //     return res.Defect_Type?.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
    //   })
    //   this.searchText="";
    //   console.log("hello")
    // }
  }

  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   //console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   //console.log(event, active);
  // }

  modalData?:QualityInspectionParameters
  commentsList:{"Defect_ID":string,"Timestamp":any,"Comments":string}[]=[]
  imgData:any
  spinnerBool:boolean=false
  
  showDefectInfo(index:any){
    console.log("index:",index)
    //GetImg//
    setTimeout(()=>{
      this.QualityInspectionApi.getImage(this.tokenID,{
        "Timestamp":this.params[index].Timestamp,
            "Defect_Type":this.params[index].Defect_Type,
            "Defect_ID":this.params[index].Defect_ID,
            "Surface_Name":this.params[index].Surface_Name
      }).subscribe((data:any)=>{
        this.imgData=data.url
        this.spinnerBool=true
      })
      //GetComments//
      this.defectsCommentsService.getById(this.tokenID,String(this.params[index].Defect_ID)).subscribe((defectsData:any)=>{
      console.log("defect:",defectsData)
      this.commentsList=defectsData
    })
    
    },4000)
    
    

    this.modalData=this.params[index]
    //console.log("this:",this.getImg)
    this.url=this.getImg[index]
  }
  modalClose(){
    this.spinnerBool=false
  }

  //Get and Post Comments
  comments?:string
  
  post_comments(message:any,defectsData:any){
    let commentsData={
      "Defect_ID":String(defectsData.Defect_ID),
      "Timestamp":Number(new Date()),
      "Comments":message
    }
    console.log("msg:",message,"Data:",commentsData)
    this.defectsCommentsService.post(this.tokenID,commentsData).subscribe(()=>{
      console.log("Comment Posted!!")
    },error=>{
      console.log("err:",error)
    })
  }


//Update Button Status//

msg?:string
public types = [{value:'open', show:'open'},{value: 'in-Progress',show:'in-Progress'},{value:'close',show:'close'}];
  getstatus(val:any){
    this.msg=val
    console.log("button",val)
  }
  submitstatus(defectData:any){
    console.log("up:",this.msg)
    // this.msg="Updated successfully";
    this.QualityInspectionApi.put(this.tokenID,{"Timestamp":Number(defectData.Timestamp),"Line_Number":defectData.Line_Number,"Status":this.msg}).subscribe()
    console.log("Updated")
  }
  

}



  
  
