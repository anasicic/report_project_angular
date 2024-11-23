import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  currentFormType: string = ''; // Za pratiti trenutni tip forme (Add ili Update)
  currentCategory: string = 'add'; // Za pratiti trenutnu kategoriju

  // Funkcija za postavljanje trenutne kategorije
  setCurrentCategory(category: string) {
    this.currentCategory = category;
  }

  // Forme za unos podataka
  userForm: FormGroup;
  supplierForm: FormGroup;
  costCenterForm: FormGroup;
  typeOfCostForm: FormGroup;

  constructor() {
    // Inicijalizacija formi
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      is_active: new FormControl(true),
    });

    this.supplierForm = new FormGroup({
      supplier_name: new FormControl('', Validators.required),
    });

    this.costCenterForm = new FormGroup({
      cost_center_name: new FormControl('', Validators.required),
      cost_center_code: new FormControl(''),
    });

    this.typeOfCostForm = new FormGroup({
      cost_name: new FormControl('', Validators.required),
    });
  }

  // Funkcije za navigaciju prema kategorijama (ovo možeš kasnije doraditi prema potrebi)
  navigateToAdd(category: string): void {
    this.currentCategory = category;
    this.currentFormType = 'add';
    this.resetForms();
  }

  navigateToUpdate(category: string): void {
    this.currentCategory = category;
    this.currentFormType = 'update';
    this.resetForms();
  }

  // Funkcija za resetiranje formi kad se prikazuje nova forma
  resetForms() {
    this.userForm.reset();
    this.supplierForm.reset();
    this.costCenterForm.reset();
    this.typeOfCostForm.reset();
  }

  // Funkcija za dodavanje korisnika, dobavljača, itd. (ovo je samo primjer)
  onSubmit() {
    if (this.currentCategory === 'user' && this.userForm.valid) {
      const newUser = this.userForm.value;
      console.log('Dodaj korisnika:', newUser);
      // Ovdje se šalje podaci na backend
    } else if (this.currentCategory === 'supplier' && this.supplierForm.valid) {
      const newSupplier = this.supplierForm.value;
      console.log('Dodaj dobavljača:', newSupplier);
      // Ovdje se šalje podaci na backend
    } else if (this.currentCategory === 'cost-center' && this.costCenterForm.valid) {
      const newCostCenter = this.costCenterForm.value;
      console.log('Dodaj Cost Center:', newCostCenter);
      // Ovdje se šalje podaci na backend
    } else if (this.currentCategory === 'type-of-cost' && this.typeOfCostForm.valid) {
      const newTypeOfCost = this.typeOfCostForm.value;
      console.log('Dodaj Type of Cost:', newTypeOfCost);
      // Ovdje se šalje podaci na backend
    }
  }
}
