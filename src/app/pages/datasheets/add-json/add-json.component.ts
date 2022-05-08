import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  
  constructor( private route: ActivatedRoute) {
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

  onSave(): void {
    console.log('Saved', this.ueCapabilities);
    this.getSummary()
    const capabilities = this.ueSummary;
    const terminalId = this.id || null;
    
  }

  getSummary():void{
    this.summaryPhone = this.ueCapabilities["Summary"]
    this.ueSummary = {}
    this.summaryPhone.forEach( item => {
      if (item['RAT Name'] === '5G NR') {
        this.ueSummary['NR'] = item
      } else {
        this.ueSummary[item["RAT Name"]] = item
      }
    });
    console.log(this.ueSummary);
  }
  typeOf(value) {
    return typeof value;
  }

}
