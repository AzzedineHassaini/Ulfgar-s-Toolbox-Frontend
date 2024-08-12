import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './role-selector.component.html',
  styleUrl: './role-selector.component.scss'
})
export class RoleSelectorComponent {
  @Input() currentRole!: string;
  @Output() roleChanged = new EventEmitter<string>();

  roles = ['USER', 'CONTRIBUTOR', 'ADMIN'];
  isPopupVisible = false;

  togglePopup(event: Event) {
    event.stopPropagation();
    this.isPopupVisible = !this.isPopupVisible;
  }

  selectRole(role: string) {
    this.currentRole = role;
    this.roleChanged.emit(role);
    this.isPopupVisible = false;
  }
}
