import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Car} from '../../app/cars/car';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CarService {

    private  updateUrl = 'http://localhost:8090/car/update?Id=';

    private subject = new Subject<any>();

    constructor(private http: Http) {
    }

    getCarsMedium() {
        return this.http.get('src/app/resources/data/cars-medium.json')
            .toPromise()
            .then(res => <Car[]> res.json().data)
            .then(data => {
                return data;
            });
    }


    setSingleCheckBoxChecked(isChecked:boolean) {
        this.subject.next(isChecked);
    }

    getCheckBoxValue(): Observable<any> {
        return this.subject.asObservable();
    }

   update(inputdata) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http
            .post(`${this.updateUrl}` + inputdata, options)
            .toPromise()
            .then(res => {
                let result = res.json();
                return result;
            })
            .then(data => {
                return data;
            });
    }
}
