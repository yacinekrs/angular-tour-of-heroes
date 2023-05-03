import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.css']
})
export class FormRadioComponent {
  public heroe : any = {Gender : 'H'};
  public menopauseCtrl = this.fb.control('');
  public menopauseCtrl2 = this.fb.control('');
  public isSubmited = false ;
  public questionnaireForm = new UntypedFormGroup({
    menopauseCtrl: this.menopauseCtrl,
    menopauseCtrl2: this.menopauseCtrl2
  });

  constructor(private fb: UntypedFormBuilder){}

  public envoyer():void{
    this.isSubmited = true;
  }
}
