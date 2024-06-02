import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddblogpostComponent } from './addblogpost.component';

describe('AddblogpostComponent', () => {
  let component: AddblogpostComponent;
  let fixture: ComponentFixture<AddblogpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddblogpostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddblogpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
