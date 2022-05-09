import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasheetService } from '../datasheet.service';

@Component({
  selector: 'app-add-json',
  templateUrl: './add-json.component.html',
  styleUrls: ['./add-json.component.css']
})
export class AddJsonComponent implements OnInit {
  id: string
  ueCapabilities:any = {};
  summaryPhone: any = {};
  ueSummary: any = {};

  panelOpenState1 = true;
  panelOpenState2 = false;
  
  constructor( 
    private route: ActivatedRoute, 
    private dSrv: DatasheetService,
    private router: Router,) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    
  }

  onFileChange(event){ 
    const fileToLoad = event.target.files[0], self = this;
    const fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        const textFromFileLoaded = fileLoadedEvent.target.result as string;
        const json = JSON.parse(textFromFileLoaded);
        console.log(json);
        self.ueCapabilities = json
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  onSaveDatasheet(): void {
    const outCapabilities = this.ueSummary;
    const dsId = this.id;
    this.dSrv.onSaveJsonSummary( outCapabilities, dsId)
    alert('OK guardado')
    this.router.navigate(['devices/dashboard-devices'])
  }

  getSummary():void{
    this.summaryPhone = this.ueCapabilities["Summary"]
    this.ueSummary = {}
    this.summaryPhone.forEach( item => {
      if (item['RAT Name'] === '5G NR') {
        delete item["RAT Name"]
        this.ueSummary['NR'] = item
      } else {
        this.ueSummary[item["RAT Name"]] = item
        delete item["RAT Name"]
      }
    });
    console.log(this.ueSummary);
  }
  
  typeOf(value) {
    return typeof value;
  }

}
