import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ScrappingService } from '../services/scrapping.service';
import { ScrappingRecord } from '../cors/interfaces/scrapping-record';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CsvService } from '../services/csv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  displayedColumns: string[] = [
    'select',
    'company.logo',
    'company',
    'socialProfiles',
    'description',
    'address',
    'phone',
    'email',
  ];
  isLoading = false;
  dataSource!: MatTableDataSource<ScrappingRecord>;
  selection = new SelectionModel<ScrappingRecord>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<ScrappingRecord>;

  constructor(
    private _scrappingService: ScrappingService,
    private _csvService: CsvService
  ) {
    this._scrappingService.getAllCompaniesRecords().subscribe((res) => {
      this.dataSource = new MatTableDataSource<ScrappingRecord>(res);
      this.dataSource.paginator = this.paginator;
    });
    this._scrappingService.latestRecord$.subscribe((res) => {
      // const newRecord = new MatTableDataSource<ScrappingRecord>(res)
      console.log(res);
      if (this.dataSource?.data)
        this.dataSource.data = [res, ...this.dataSource.data];
    });
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected?.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ScrappingRecord): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row}`;
  }

  deleteRow() {
    const rows = this.selection.selected;
    let items: Array<any> = [];
    this.isLoading = true;
    if (rows.length) {
      const set = new Set(rows);
      this.dataSource.data = this.dataSource.data.filter(
        (item) => !set.has(item)
      );
      console.log(rows);
      rows.forEach((row) => items.push(row.id));
      console.log('ids', items);
      this.selection.clear();
      this.isLoading = false;
      this._scrappingService
        .deletedRecords(items)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (res) => {
            console.log('deleted', res);
            Swal.fire('Success', 'Selected Records are deleted', 'success');
          },
          error: (e: HttpErrorResponse) => console.error(e.statusText),
        });
    } else {
      Swal.fire('Warning', 'kindy select atleast one row', 'warning').then(
        (res) => {
          if (res.dismiss || res.isConfirmed) this.isLoading = false;
        }
      );
    }
  }
  downlaodCsv() {
    const data: any[] = [];
    this.dataSource.data.forEach((item) => {
      data.push({
        name: item.company.name,
        logo: item.company.logo,
        facebook: item.socialProfiles.facebook,
        linkedIn: item.socialProfiles.linkedin,
        instragram: item.socialProfiles.instagram,
        phone: item.phone,
        address: item.address,
        email: item.email,
      });
    });

    this._csvService.downloadCSV(data, 'records');
  }

  displayName(name: string) {
    return name?.split(/[-\s]+/)[0];
  }
  setCurrentCompany(row: ScrappingRecord) {
    this._scrappingService.latestRecord$.next(row);
  }
}
