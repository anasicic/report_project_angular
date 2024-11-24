import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministrationService } from '../services/administration.service';
import { User } from '../models/user.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // For ngIf, etc.
import { ReactiveFormsModule } from '@angular/forms';  // For formGroup

@Component({
  selector: 'app-administration',
  standalone: true,  // Standalone component setting
  imports: [RouterModule, CommonModule, ReactiveFormsModule],  // Add necessary imports for standalone
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  currentCategory: string = '';  // Current category (user, cost-center, type-of-cost, supplier)
  
  // Forms for each category
  userForm!: FormGroup;
  costCenterForm!: FormGroup;
  typeOfCostForm!: FormGroup;
  supplierForm!: FormGroup;

  constructor(private fb: FormBuilder, private administrationService: AdministrationService) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  // Function to initialize all forms
  initializeForms(): void {
    // User form
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      is_active: [false]
    });

    // Cost center form
    this.costCenterForm = this.fb.group({
      cost_center_name: ['', Validators.required],
      cost_center_code: ['', Validators.required]
    });

    // Type of cost form
    this.typeOfCostForm = this.fb.group({
      cost_name: ['', Validators.required],
      cost_code: ['', Validators.required]
    });

    // Supplier form
    this.supplierForm = this.fb.group({
      supplier_name: ['', Validators.required]
    });
  }

  // Function to handle category change and display corresponding form
  onCategoryChange(category: string): void {
    this.currentCategory = category;
  }

  // Function to handle form submission based on the selected category
  onSubmit(): void {
    if (this.currentCategory === 'user' && this.userForm.valid) {
      this.createUser();
    } else if (this.currentCategory === 'cost-center' && this.costCenterForm.valid) {
      this.createCostCenter();
    } else if (this.currentCategory === 'type-of-cost' && this.typeOfCostForm.valid) {
      this.createTypeOfCost();
    } else if (this.currentCategory === 'supplier' && this.supplierForm.valid) {
      this.createSupplier();
    }
  }

  // Function to create a user using the administration service
  createUser(): void {
    const userData = this.userForm.value;
    this.administrationService.createUser(userData).subscribe(
      (response: User) => {
        // Handle successful user creation
        console.log('User created successfully:', response);
        this.userForm.reset(); // Reset the form after successful creation
      },
      (error) => {
        // Handle error
        console.error('Error creating user:', error);
      }
    );
  }

  // Function to create a cost center using the administration service
  createCostCenter(): void {
    const costCenterData = this.costCenterForm.value;
    this.administrationService.createCostCenter(costCenterData).subscribe(
      (response) => {
        // Handle successful cost center creation
        console.log('Cost center created successfully:', response);
        this.costCenterForm.reset(); // Reset the form after successful creation
      },
      (error) => {
        // Handle error
        console.error('Error creating cost center:', error);
      }
    );
  }

  // Function to create a type of cost using the administration service
  createTypeOfCost(): void {
    const typeOfCostData = this.typeOfCostForm.value;
    console.log('Sending data to backend:', typeOfCostData);
  
    this.administrationService.createTypeOfCost(typeOfCostData).subscribe(
      (response) => {
        console.log('Type of cost created successfully:', response);
        this.typeOfCostForm.reset();
      },
      (error) => {
        console.error('Error creating type of cost:', error);
        if (error.error && error.error.detail) {
          console.error('Validation Errors:', error.error.detail);  
        }
      }
    );
  }

  // Function to create a supplier using the administration service
  createSupplier(): void {
    const supplierData = this.supplierForm.value;
    this.administrationService.createSupplier(supplierData).subscribe(
      (response) => {
        // Handle successful supplier creation
        console.log('Supplier created successfully:', response);
        this.supplierForm.reset(); // Reset the form after successful creation
      },
      (error) => {
        // Handle error
        console.error('Error creating supplier:', error);
      }
    );
  }
}
