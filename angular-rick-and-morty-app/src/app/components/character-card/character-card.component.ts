import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, } from '@angular/material/dialog';


@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MaterialModule], 
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})


export class CharacterCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }
}
