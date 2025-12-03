import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagenotfound } from './404';

  let component: Pagenotfound;
  let fixture: ComponentFixture<Pagenotfound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagenotfound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagenotfound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
