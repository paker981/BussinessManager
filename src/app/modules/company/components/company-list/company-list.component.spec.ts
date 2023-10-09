import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListComponent } from './company-list.component';
import { BussinessHttpService } from '../../../../services/bussiness/bussiness-http.service';

describe('CompanyListComponent', () => {

  const bussinessHttpServiceMock = {
    getCompanies: jest.fn()
  }

  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyListComponent],
      providers: [
        {
          provide: BussinessHttpService,
          useValue: bussinessHttpServiceMock
        }
      ]
    });
    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(bussinessHttpServiceMock.getCompanies).toHaveBeenCalled()
  });
});
