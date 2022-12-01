import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { element } from 'protractor';
import { DeviceService } from '../../devices/device.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  ipAddress = '';

  devices$ = this.deviceSrv.devices
  id_page:string

  defaultImage = "https://play-lh.googleusercontent.com/jMYUEwByxu5_G-VRYLpY-wWoSX9L-H62mjn8puy8MJuYTwSoUiUACPo4uTSmK2uKrIo"

  featuresForm: FormGroup
  brandsForm: FormGroup
  gamasForm: FormGroup

  value = 1
  isLinear = false;
  dataCorePhones = []
  dataPhones = []
  dataBrands = []
  dataGamas = []

  filterFeaturesPhones = []
  filterBrandPhones = []
  filterGamaPhones = []

  brandsList: Array<any> = [
    { id: '1', name: 'Samsung'},
    { id: '2', name: 'Xiaomi'},
    { id: '3', name: 'Apple'},
    { id: '4', name: 'Motorola'},
    { id: '5', name: 'Huawei'},
    { id: '6', name: 'Honor'},
    { id: '7', name: 'ZTE'},
    { id: '8', name: 'Oppo'},
    { id: '9', name: 'VIVO'},
    { id: '10', name: 'POCO'},
    { id: '11', name: 'Alcatel'},
    { id: '12', name: 'Realme'}
  ]

  gamasList: Array<any> = [
    { id: '1', name: 'Alta', rango: 'S/. 2000 a más'},
    { id: '2', name: 'Media', rango: 'S/. 700 - 2000'},
    { id: '3', name: 'Basica', rango: 'menos de S/. 700'}
  ]


  constructor(
    private _formBuilder: FormBuilder,
    private deviceSrv: DeviceService,
    private route: ActivatedRoute,
    private http:HttpClient,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.devices$.subscribe( res => {
      this.dataCorePhones = res
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id_page = params.get('id');
        this.id_page = this.id_page.replace(/-/gi, ' ');
        console.log(this.id_page)
  
        if (this.id_page == "plaza republica"){
          this.dataPhones = this.dataCorePhones.filter((obj) => {
            return obj.storePR === true
          })
        }
        if (this.id_page == "plaza san miguel"){
          this.dataPhones = this.dataCorePhones.filter((obj) => {
            return obj.storeSM === true
          })
        }
        if (this.id_page == "centro de lima"){
          this.dataPhones = this.dataCorePhones.filter((obj) => {
            return obj.storeCL === true
          })
        }
        //console.log(this.dataCorePhones)
        //console.log(this.dataPhones)
      })
    } )

    this.initForm();    

    this.getIPAddress();
    
  }

  private initForm(): void {
    this.featuresForm = this._formBuilder.group({
      inputPerformance: new FormControl(1, Validators.required),
      inputCamera: new FormControl(1, Validators.required),
      inputBattery: new FormControl(1, Validators.required),
      inputDesign: new FormControl(1, Validators.required),
      inputScreen: new FormControl(1, Validators.required),
      inputAudio: new FormControl(1, Validators.required),
      inputConnectivity: new FormControl(1, Validators.required),
      inputOs: new FormControl(1, Validators.required)
    })

    this.brandsForm = this._formBuilder.group({
      checkArrayBrands: this._formBuilder.array([], [Validators.required]),
    })

    this.gamasForm = this._formBuilder.group({
      checkArrayGamas: this._formBuilder.array([], [Validators.required]),
    })
    
    
  }

  onSaveFeaturesPoints(): void {
    this.filterFeaturesPhones = []
    const phones = this.dataPhones
    const preferences = this.featuresForm.value
    console.log(phones)
    console.log(preferences)
    phones.forEach(element => {
      let scoreCelufinder = element.cfPerformance*preferences.inputPerformance + element.cfCamera*preferences.inputCamera + element.cfBattery*preferences.inputBattery + element.cfDesign*preferences.inputDesign 
      + element.cfScreen*preferences.inputScreen + element.cfAudio*preferences.inputAudio + element.cfConnectivity*preferences.inputConnectivity + element.cfOs*preferences.inputOs
      element.score = scoreCelufinder
    });
    this.filterFeaturesPhones = phones
    //console.log(this.filterFeaturesPhones)
  }

  onCheckboxBrandsChange(e: any) {
    const checkArray: FormArray = this.brandsForm.get('checkArrayBrands') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    //console.log(this.brandsForm)
  }
  onSaveBrandsForm(): void{
    this.filterBrandPhones = []
    this.dataBrands = this.brandsForm.value.checkArrayBrands
    console.log(this.dataBrands)
    this.dataBrands.forEach( element => {
      let celuFinder = this.dataPhones.filter( function(obj) {
        return obj.brand === element
      })
      this.filterBrandPhones = this.filterBrandPhones.concat(celuFinder)
    })
    //console.log(this.filterBrandPhones)
  }
  

  onCheckboxGamasChange(e: any) {
    const checkArray: FormArray = this.gamasForm.get('checkArrayGamas') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onSaveGamasForm(): void{
    this.filterGamaPhones = []
    this.dataGamas = this.gamasForm.value.checkArrayGamas
    //console.log(this.dataGamas)  

    this.dataGamas.forEach(element => {

      if (element == 'Basica'){
        let celuFinder = this.filterBrandPhones.filter(function(obj){
          return obj.price74 < 700
        })
        this.filterGamaPhones = this.filterGamaPhones.concat(celuFinder)
      }
      if (element == 'Media'){
        let celuFinder = this.filterBrandPhones.filter(function(obj){
          return obj.price74 > 700 && obj.price74 < 2000
        })
        this.filterGamaPhones = this.filterGamaPhones.concat(celuFinder)
      }
      if (element == 'Alta'){
        let celuFinder = this.filterBrandPhones.filter(function(obj){
          return obj.price74 >= 2000
        })
        this.filterGamaPhones = this.filterGamaPhones.concat(celuFinder)
      }
    })

    this.filterGamaPhones.sort((a, b) => {
      return b.score - a.score;
    });
    
    this.reorderSecond()

  
    this.getThird()
  }

  // Logica para buscar el segundo puesto (la siguiente marca con mejor puntaje)
  reorderSecond(){
    //console.log(this.filterGamaPhones[0].brand)
    let firstBrand = this.filterGamaPhones[0].brand
    let secondBrandPhones = this.filterGamaPhones.filter((obj) => {return obj.brand !== firstBrand})
    console.log(secondBrandPhones)
    if (secondBrandPhones.length != 0){
      console.log(secondBrandPhones)
      console.log("hay otra marca")
      let position = this.filterGamaPhones.indexOf(secondBrandPhones[0])
      this.filterGamaPhones.splice(1,0,this.filterGamaPhones.splice(position,1)[0])
    }    
    //console.log(position)
    
    console.log(this.filterGamaPhones)

  }

  getThird(){
    let largo = this.filterGamaPhones.length
    //console.log(largo)
    //console.log(this.filterGamaPhones.slice(2-largo))
    let thirdBrandPhones = this.filterGamaPhones.slice(2-largo).filter((obj) => {return obj.stockType !== "General"})
    //console.log(thirdBrandPhones[0])
    let position = this.filterGamaPhones.indexOf(thirdBrandPhones[0])
    //console.log(position)
    this.filterGamaPhones.splice(2,0,this.filterGamaPhones.splice(position,1)[0])
    //console.log(this.filterGamaPhones)
  }



  getIPAddress(){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(tempRanking, {
      data: this.filterGamaPhones
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




}

@Component({
  selector: 'tempRanking',
  templateUrl: 'temp_ranking.html',
})
export class tempRanking {
  constructor(
    public dialogRef: MatDialogRef<tempRanking>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

}
