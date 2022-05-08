import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})


export class AddItemComponent implements OnInit {

  itemForm: FormGroup;
  devices$ = this.invSrv.devices

  constructor(
    private fb: FormBuilder,
    private invSrv: InventoryService,
  ) { }

  ngOnInit(): void {
    this.devices$.subscribe( res => console.log( res ) )
  }

  private initForm(): void {
    this.itemForm = this.fb.group({
      idDevice: ['', [Validators.required]],
      imeiOne: ['', [Validators.required]],
      imeiTwo: ['', [Validators.required]],
      serialNumber: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })    
  }

}
