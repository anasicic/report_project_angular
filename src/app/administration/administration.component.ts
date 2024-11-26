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

  // Lists for displaying data
  users: User[] = [];
  costCenters: any[] = [];
  typesOfCost: any[] = [];
  suppliers: any[] = [];

  // Selected items for editing
  selectedUser: User | null = null;
  selectedCostCenter: any | null = null;
  selectedTypeOfCost: any | null = null;
  selectedSupplier: any | null = null;

  constructor(private fb: FormBuilder, private administrationService: AdministrationService) {}

  ngOnInit(): void {
    this.initializeForms();
    this.fetchData(); // Fetch data for all categories on initialization
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

  // Fetch data for all categories
  fetchData(): void {
    this.administrationService.getUsers().subscribe(
      (data: User[]) => this.users = data,
      (error) => console.error('Error fetching users:', error)
    );

    this.administrationService.getCostCenters().subscribe(
      (data: any[]) => this.costCenters = data,
      (error) => console.error('Error fetching cost centers:', error)
    );

    this.administrationService.getTypesOfCost().subscribe(
      (data: any[]) => this.typesOfCost = data,
      (error) => console.error('Error fetching types of cost:', error)
    );

    this.administrationService.getSuppliers().subscribe(
      (data: any[]) => this.suppliers = data,
      (error) => console.error('Error fetching suppliers:', error)
    );
  }

  // Function to handle category change and display corresponding form
  onCategoryChange(category: string): void {
    this.currentCategory = category;
    this.clearSelection(); // Clear selection when switching categories
  }

  // Clear selected items and reset forms
  clearSelection(): void {
    this.selectedUser = null;
    this.selectedCostCenter = null;
    this.selectedTypeOfCost = null;
    this.selectedSupplier = null;
    this.userForm.reset();
    this.costCenterForm.reset();
    this.typeOfCostForm.reset();
    this.supplierForm.reset();
  }

  // Function to handle form submission based on the selected category
  onSubmit(): void {
    if (this.currentCategory === 'user') {
      this.selectedUser ? this.updateUser() : this.createUser();
    } else if (this.currentCategory === 'cost-center') {
      this.selectedCostCenter ? this.updateCostCenter() : this.createCostCenter();
    } else if (this.currentCategory === 'type-of-cost') {
      this.selectedTypeOfCost ? this.updateTypeOfCost() : this.createTypeOfCost();
    } else if (this.currentCategory === 'supplier') {
      this.selectedSupplier ? this.updateSupplier() : this.createSupplier();
    }
  }

  // Functions for user management
  createUser(): void {
    const userData = this.userForm.value;
    this.administrationService.createUser(userData).subscribe(
      () => {
        this.fetchData();
        this.userForm.reset();
      },
      (error) => console.error('Error creating user:', error)
    );
  }

  updateUser(): void {
    const userData = this.userForm.value;
    this.administrationService.updateUser(userData).subscribe(
      () => {
        this.fetchData();
        this.clearSelection();
      },
      (error) => console.error('Error updating user:', error)
    );
  }

  deleteUser(user: User): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.administrationService.deleteUser(user.id).subscribe(
        () => this.fetchData(),
        (error) => console.error('Error deleting user:', error)
      );
    }
  }

  // Functions for cost center management
  createCostCenter(): void {
    const data = this.costCenterForm.value;
    this.administrationService.createCostCenter(data).subscribe(
      () => {
        this.fetchData();
        this.costCenterForm.reset();
      },
      (error) => console.error('Error creating cost center:', error)
    );
  }

  updateCostCenter(): void {
    const data = this.costCenterForm.value;
    this.administrationService.updateCostCenter(data).subscribe(
      () => {
        this.fetchData();
        this.clearSelection();
      },
      (error) => console.error('Error updating cost center:', error)
    );
  }

  deleteCostCenter(item: any): void {
    if (confirm('Are you sure you want to delete this cost center?')) {
      this.administrationService.deleteCostCenter(item.id).subscribe(
        () => this.fetchData(),
        (error) => console.error('Error deleting cost center:', error)
      );
    }
  }

  // Functions for type of cost management
  createTypeOfCost(): void {
    const data = this.typeOfCostForm.value;
    this.administrationService.createTypeOfCost(data).subscribe(
      () => {
        this.fetchData();
        this.typeOfCostForm.reset();
      },
      (error) => console.error('Error creating type of cost:', error)
    );
  }

  updateTypeOfCost(): void {
    const data = this.typeOfCostForm.value;
    this.administrationService.updateTypeOfCost(data).subscribe(
      () => {
        this.fetchData();
        this.clearSelection();
      },
      (error) => console.error('Error updating type of cost:', error)
    );
  }

  deleteTypeOfCost(item: any): void {
    if (confirm('Are you sure you want to delete this type of cost?')) {
      this.administrationService.deleteTypeOfCost(item.id).subscribe(
        () => this.fetchData(),
        (error) => console.error('Error deleting type of cost:', error)
      );
    }
  }

  // Functions for supplier management
  createSupplier(): void {
    const data = this.supplierForm.value;
    this.administrationService.createSupplier(data).subscribe(
      () => {
        this.fetchData();
        this.supplierForm.reset();
      },
      (error) => console.error('Error creating supplier:', error)
    );
  }

  updateSupplier(): void {
    const data = this.supplierForm.value;
    this.administrationService.updateSupplier(data).subscribe(
      () => {
        this.fetchData();
        this.clearSelection();
      },
      (error) => console.error('Error updating supplier:', error)
    );
  }

  deleteSupplier(item: any): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.administrationService.deleteSupplier(item.id).subscribe(
        () => this.fetchData(),
        (error) => console.error('Error deleting supplier:', error)
      );
    }
  }
}
