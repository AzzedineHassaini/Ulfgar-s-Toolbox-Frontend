import { Component, Input, OnInit } from '@angular/core';
import { SpellDetails } from '../../models/spell.model';
import { SpellService } from '../../services/spell.service';
import {NgIf} from "@angular/common";
import {ChipModule} from "primeng/chip";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-spell-detail',
  templateUrl: './spell-detail.component.html',
  styleUrls: ['./spell-detail.component.scss'],
  imports: [
    NgIf,
    ChipModule
  ],
  standalone: true
})
export class SpellDetailComponent implements OnInit {
  id: number | null = null;
  spellDetails: SpellDetails | null = null;

  constructor(
    private spellService: SpellService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        console.log("Loading: " + this.id);
        this.loadSpellDetails();
      }
    });
  }

  loadSpellDetails() {
    if (this.id === null) {
      console.error('No spell ID provided');
      return;
    }
    this.spellService.getSpellDetails(this.id).subscribe({
      next: (details) => {
        this.spellDetails = details;
        console.log(this.spellDetails)
      },
      error: (error) => {
        console.error('Error loading spell details:', error);
        // Vous pouvez ajouter ici une gestion d'erreur plus élaborée si nécessaire
      }
    });
  }
}
