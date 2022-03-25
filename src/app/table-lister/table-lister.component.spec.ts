import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListerComponent } from './table-lister.component';

describe('TableListerComponent', () => {
  let component: TableListerComponent;
  let fixture: ComponentFixture<TableListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
