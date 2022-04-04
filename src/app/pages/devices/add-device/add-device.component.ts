import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Samsung', sound: 'Woof!'},
    {name: 'Xiaomi', sound: 'Meow!'},
    {name: 'Apple', sound: 'Moo!'},
    {name: 'Huawei', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
