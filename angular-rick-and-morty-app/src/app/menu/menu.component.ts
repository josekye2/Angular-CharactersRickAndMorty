import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../app/material/material.module';
import { CharacterCardComponent } from '../components/character-card/character-card.component';
import { RickAndMortyService } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  personajes: any[] = [];
  personajesPaginados: any[] = [];
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(
    private personajeService: RickAndMortyService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    this.personajeService.getCharacters().subscribe({
      next: (data: { results: any[]; }) => {
        console.log('Personajes:', data);
        this.personajes = data.results;
        this.actualizarPagina();
      },
      error: (error: any) => {
        console.error('Error al obtener personajes:', error);
      }
    });
  }

  actualizarPagina(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.personajesPaginados = this.personajes.slice(startIndex, endIndex);
  }

  cambiarPagina(direccion: string): void {
    if (direccion === 'next' && (this.currentPage + 1) * this.pageSize < this.personajes.length) {
      this.currentPage++;
    } else if (direccion === 'prev' && this.currentPage > 0) {
      this.currentPage--;
    }
    this.actualizarPagina();
  }

  abrirDetalle(personaje: any): void {
  const dialogRef = this.dialog.open(CharacterCardComponent, {
    data: personaje,
    width: '50%',
    height: '50%',
    backdropClass: 'custom-backdrop',
    panelClass: 'custom-dialog-container'
  });
}


  get totalPages(): number {
    return Math.ceil(this.personajes.length / this.pageSize);
  }
}
