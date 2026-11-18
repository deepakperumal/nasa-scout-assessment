import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ScoutStore } from './store/scout.store';
import { ScoutObject } from './models/scout.model';

@Component({
  selector: 'app-scout-page',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    ButtonModule,
    ProgressSpinnerModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './scout-page.component.html',
  styleUrl: './scout-page.component.scss'
})
export class ScoutPageComponent implements OnInit {
  readonly store = inject(ScoutStore);
  detailsVisible = signal(false);
  private gridApi?: GridApi;

  colDefs: ColDef[] = [
    { field: 'objectName', headerName: 'Designation', filter: true, flex: 1.2 },
    { field: 'H', headerName: 'Magnitude (H)', filter: 'agNumberColumnFilter', width: 130 },
    { field: 'nObs', headerName: 'Observations', filter: 'agNumberColumnFilter', width: 130 },
    { field: 'caDist', headerName: 'Close Approach (LD)', filter: true, width: 160 },
    { field: 'neoScore', headerName: 'NEO Score', filter: 'agNumberColumnFilter', width: 120 },
    { field: 'phaScore', headerName: 'PHA Score', filter: 'agNumberColumnFilter', width: 120 },
    { field: 'arc', headerName: 'Arc (days)', filter: 'agNumberColumnFilter', width: 120 },
    { field: 'lastRun', headerName: 'Last Run', filter: true, flex: 1 }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };

  ngOnInit() {
    this.store.load();
  }

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
  }

  onQuickFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.gridApi?.setGridOption('quickFilterText', value);
  }

  onRowClicked(event: any) {
    this.store.select(event.data as ScoutObject);
    this.detailsVisible.set(true);
  }
}
