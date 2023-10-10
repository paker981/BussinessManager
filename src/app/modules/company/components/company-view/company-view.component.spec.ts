import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyViewComponent } from './company-view.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CompanyViewComponent', () => {
  let component: CompanyViewComponent;
  let fixture: ComponentFixture<CompanyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyViewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ company: {} }),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve company data from route data', () => {
    //given
    const dataSpy = jest.fn()

    //when
    component.company$.subscribe((company) => {
      dataSpy(company)
    });

    //then
    expect(dataSpy).toHaveBeenCalledWith({});
    expect(component.listShowed).toBeFalsy();
  });

  it('should change state of listShowed after call listShow method', () => {
    //given 
    const currentValue = component.listShowed;

    //when
    component.listShow();
    
    //then
    expect(component.listShowed).toBe(!currentValue);
  });
});
