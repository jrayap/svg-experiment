import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressArchComponent } from './progress-arch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProgressArchComponent', () => {
  let component: ProgressArchComponent;
  let fixture: ComponentFixture<ProgressArchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProgressArchComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressArchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('calcPercent()', () => {
    it('should return 35 percent', () => {
      component.overdueValue = 22.1;
      component.dueValue = 9.1;
      component.completedValue = 35.2;
      component.totalValue = 100;

      expect(component.calcPercent()).toBe(35);
    });

    // TODO jraya Test extreme values in calcPercent
    // xit("should have percent 100 when higher value is set as input", () => {
    //   component.percent = 120;
    //   expect(component.percent).toBe(100);
    // });

    // xit("should have percent 0 when lower value is set as input", () => {
    //   component.percent = -300;
    //   expect(component.percent).toBe(0);
    // });
  });

  it('should have created the Arch object through ngOnChanges', () => {
    component.width = 200;
    component.arch = undefined;

    expect(component.arch).toBeUndefined();

    component.ngOnChanges();

    expect(component.arch).toBeTruthy();
  });

  it('should have created the Arch object through ngOnInit', () => {
    component.width = 200;
    component.arch = undefined;

    expect(component.arch).toBeUndefined();

    component.ngOnInit();

    expect(component.arch).toBeTruthy();
  });

  describe('ProgressArchComponent variable thresholds', () => {
    it('small arch width should default to 100', () => {
      component.width = 2;

      component.ngOnInit();

      expect(component.arch.width).toBe(100);
    });

    xit('for width 300 undeclared arch strokeWidth should default to 15', () => {
      component.width = 300;

      component.ngOnInit();

      expect(component.arch.strokeWidth).toBe(15);
    });
  });

  describe('Class Arch inner calculations', () => {
    // TODO jraya This doesn't affect the coverage values and it should
    // TODO jraya Add arch values checking with a default value percentage

    it('excessively big strokeWidth should be resized to the default size', () => {
      component.width = 200;
      component.strokeWidth = 100;

      component.ngOnInit();

      expect(component.arch.strokeWidth).toBe(10);
    });
  });

  describe('isDataLoaded conditional', () => {
    it('should return true if overdueValue, dueValue and completedValue are defined', () => {
      component.overdueValue = 254;
      component.dueValue = 266;
      component.completedValue = 123;

      expect(component.isDataLoaded()).toBe(true);
    });

    it('should return false if overdueValue and dueValue is not defined and completedValue is defined', () => {
      component.overdueValue = null;
      component.dueValue = null;
      component.completedValue = 123;

      expect(component.isDataLoaded()).toBe(false);
    });

    it('should return false if overdueValue and dueValue  is defined and completedValue is not defined', () => {
      component.overdueValue = 233;
      component.dueValue = 243;
      component.completedValue = undefined;

      expect(component.isDataLoaded()).toBe(false);
    });

    it('should return false if overdueValue, dueValue and completedValue are not defined', () => {
      component.overdueValue = null;
      component.dueValue = null;
      component.completedValue = undefined;

      expect(component.isDataLoaded()).toBe(false);
    });
  });
});
