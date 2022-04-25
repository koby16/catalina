import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatasheetService {

  private datasheetCollection: AngularFirestoreCollection<any>

  constructor(
    private readonly afs:AngularFirestore
  ) {
    this.datasheetCollection = afs.collection<any>('datasheets')
  }

  onSaveDatasheet(){
    
  }
}
