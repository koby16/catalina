import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatasheetService } from '../datasheet.service';

@Component({
  selector: 'app-details-json',
  templateUrl: './details-json.component.html',
  styleUrls: ['./details-json.component.css']
})
export class DetailsJsonComponent implements OnInit {

  id: string
  ueSummary: any = {};

  constructor(
    private route: ActivatedRoute,
    private dSrv: DatasheetService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
    
  }

  ngOnInit(): void {
    this.dSrv.getJsonData(this.id).then( res => this.ueSummary = res)
  }
  typeOf(value) {
    return typeof value;
  }

}
