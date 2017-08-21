import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Car} from './cars/car';
import {CarService} from './cars/carservice';
import '../assets/css/styles.css';
import '../../node_modules/primeng/resources/themes/omega/theme.css';
import '../../node_modules/primeng/resources/primeng.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {DataTable, LazyLoadEvent, SelectItem} from 'primeng/primeng';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'p-mycheckbox',
    template: `
        <div class="ui-chkbox ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input type="checkbox" [checked]="checked" [disabled]="disabled">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"
                 (click)="handleSingleCheckboxClick($event)"
                 (mouseover)="hover=true" (mouseout)="hover=false"
                 [ngClass]="{'ui-state-hover':hover&&!disabled,'ui-state-active':checked&&!disabled,'ui-state-disabled':disabled}">
                <span class="ui-chkbox-icon" [ngClass]="{'ui-clickable fa fa-check':checked && !disabled}"></span>
            </div>
        </div>
    `
})
export class MyCheckbox {

    @Input() checked: boolean;

    @Input() disabled: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    public hover: boolean;

    constructor(private cs: CarService) {
    }

    handleSingleCheckboxClick(event) {
        if (!this.disabled) {
            this.cs.setSingleCheckBoxChecked(!this.checked);
            this.onChange.emit({originalEvent: event, checked: !this.checked});
        }
    }
}


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    @ViewChild(DataTable) dataTableComponent: DataTable;

    selectAllCbox: boolean = false;

    car: Car = new PrimeCar();

    rows: number = 10;

    selectedCars: Car[];

    cars: Car[];

    pageNo: number = 0;

    recordCount: number = 100;

    statuses: SelectItem[];

    isDisabled: boolean = false;

    isChecked: boolean = false;

    checkedCount:number = 0;

    subscription: Subscription;

    constructor(private carService: CarService) {
        this.subscription = this.carService
            .getCheckBoxValue()
            .subscribe(message => {
                console.log('Until click it doesnt come here');

                if (message) {
                    this.checkedCount++;
                }else {
                    this.checkedCount--;
                }
                console.log('Value from subscription is ' + message);
                console.log('Value of Checked count is  ' + this.checkedCount);
            });
    }

    highLightRow(rowData: any, rowIndex: any) {
        console.log('RowData  is ' + rowData.disabled + 'And rowIndex is ' + rowIndex);
        return rowData.disabled ? 'disabled-row' : '';
    }


    loadCarsLazy(event: LazyLoadEvent) {
        this.pageNo = event.first / this.rows;
        //this.loadData(this.pageNo);
        {
            this.carService
                .getCarsMedium()
                .then(cars => {
                    this.cars = cars;
                    this.recordCount = 100;
                });
        }
    }

     ngOnInit() {
        this.carService.getCarsMedium().then(cars => {
            this.cars = cars;
        });
        this.statuses = [];
        this.statuses.push({label: 'All Statuses', value: null});
        this.statuses.push({label: 'sold', value: 'sold'});
        this.statuses.push({label: 'notsold', value: 'notsold'});
    }

    loadData(pageNo, event) {
       this.carService.getCarsMedium().then(cars => {
            this.cars = cars;
        });
    }

    getAllCars() {
        this.carService.getCarsMedium().then(cars => {
            this.cars = cars;
        });
    }

    performSelectAllClick(event) {
        if (!this.isDisabled) {
            this.selectAllCbox = !this.selectAllCbox;
            this.dataTableComponent.toggleRowsWithCheckbox({originalEvent: event, checked: this.selectAllCbox});
            this.isChecked = this.selectAllCbox;
        }

        for (let row of this.selectedCars) {
            if (row.disabled === 'Y') {
                this.dataTableComponent.toggleRowWithCheckbox(event, row);
            }
        }

    }
}

export class PrimeCar
    implements Car {
    constructor(public vin?, public year?, public brand?,
                public color?, public disabled?) {
    }
}