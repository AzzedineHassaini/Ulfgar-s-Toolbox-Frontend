import { Component, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import {RouterLink} from "@angular/router";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, CarouselModule, RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  features: Feature[] = [];

  ngOnInit() {
    this.features = [
      { icon: 'pi pi-book', title: 'Bibliothèque de sorts', description: 'Accédez à une collection complète de sorts de tous niveaux et écoles de magie.' },
      { icon: 'pi pi-star', title: 'Grimoires personnalisés', description: 'Créez et gérez les grimoires de sorts de tous vos personnages et exportez-les en PDF.' },
      { icon: 'pi pi-search', title: 'Recherche avancée', description: 'Trouvez rapidement les sorts dont vous avez besoin grâce à notre moteur de recherche puissant.' },
      { icon: 'pi pi-plus', title: 'Et plein d\'autres fonctionnalités en approche' , description: 'Création de personnage de A à Z, calculateur d\'XP, générateur de trésors, ...' }
    ];
  }
}
