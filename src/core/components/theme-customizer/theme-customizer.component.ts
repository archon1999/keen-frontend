import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from 'core/services/config.service';
import { CoreSidebarService } from 'core/components/core-sidebar/core-sidebar.service';
import { CoreConfig } from "@core/types";

@Component({
  selector: 'core-theme-customizer',
  templateUrl: './theme-customizer.component.html',
  styleUrls: ['./theme-customizer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoreThemeCustomizerComponent implements OnInit, OnDestroy {
  navbarColorValue: string;
  coreConfig: any;
  form: UntypedFormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _coreConfigService: CoreConfigService,
    private _coreSidebarService: CoreSidebarService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  //  Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Build theme config form
    this.form = this._formBuilder.group({
      app: this._formBuilder.group({
        appName: new UntypedFormControl(),
        appTitle: new UntypedFormControl(),
        appLogoImage: new UntypedFormControl(),
        appLanguage: new UntypedFormControl()
      }),
      layout: this._formBuilder.group({
        skin: new UntypedFormControl(),
        type: new UntypedFormControl(),
        animation: new UntypedFormControl(),
        menu: this._formBuilder.group({
          hidden: new UntypedFormControl(),
          collapsed: new UntypedFormControl()
        }),
        navbar: this._formBuilder.group({
          hidden: new UntypedFormControl(),
          type: new UntypedFormControl(),
          background: new UntypedFormControl(),
          customBackgroundColor: new UntypedFormControl(),
          backgroundColor: new UntypedFormControl()
        }),
        footer: this._formBuilder.group({
          hidden: new UntypedFormControl(),
          type: new UntypedFormControl(),
          background: new UntypedFormControl(),
          customBackgroundColor: new UntypedFormControl(),
          backgroundColor: new UntypedFormControl()
        }),
        enableLocalStorage: new UntypedFormControl(),
        customizer: new UntypedFormControl(),
        scrollTop: new UntypedFormControl(),
        buyNow: new UntypedFormControl()
      })
    });

    // Subscribe to the config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: CoreConfig) => {
      // Update config
      this.coreConfig = config;

      // Set the config form values
      this.form.setValue(config, { emitEvent: false });
    });

    // Subscribe to the form layout.type value changes
    this.form
      .get('layout.type')
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this._resetFormValues(value);
      });

    // Subscribe to the form value changes
    this.form.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this._coreConfigService.config = config;
    });

    // Set navbar color
    this.navbarColor(this.form.get('layout.navbar.backgroundColor').value);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  navbarColor(value: string): void {
    this.navbarColorValue = value;
    this.form.patchValue({
      layout: { navbar: { customBackgroundColor: true, backgroundColor: this.navbarColorValue } }
    });
  }

  toggleSidebar(key: string): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  private _resetFormValues(value: string): void {
    switch (value) {
      case 'vertical': {
        this.form.patchValue({
          layout: {
            // skin: 'default',
            animation: 'fadeIn',
            menu: {
              hidden: false,
              collapsed: false
            },
            navbar: {
              hidden: false,
              type: 'floating-nav',
              background: 'navbar-light',
              customBackgroundColor: true,
              backgroundColor: ''
            },
            footer: {
              hidden: false,
              type: 'footer-static',
              background: 'footer-light',
              customBackgroundColor: false,
              backgroundColor: 'bg-primary'
            }
          }
        });
      }
      case 'horizontal': {
        this.form.patchValue({
          layout: {
            // skin: 'default',
            animation: 'fadeIn',
            menu: {
              hidden: false,
              collapsed: false
            },
            navbar: {
              hidden: false,
              type: 'floating-nav',
              background: 'navbar-light',
              customBackgroundColor: true,
              backgroundColor: ''
            },
            footer: {
              hidden: false,
              type: 'footer-static',
              background: 'footer-light',
              customBackgroundColor: false,
              backgroundColor: 'bg-primary'
            }
          }
        });
      }
    }

    // Set navbar color
    this.navbarColor(this.form.get('layout.navbar.backgroundColor').value);
  }
}
