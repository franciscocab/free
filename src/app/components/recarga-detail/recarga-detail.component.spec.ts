import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargaDetailComponent } from './recarga-detail.component';

describe('RecargaDetailComponent', () => {
  let component: RecargaDetailComponent;
  let fixture: ComponentFixture<RecargaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecargaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
