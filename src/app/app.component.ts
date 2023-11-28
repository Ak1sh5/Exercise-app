import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  apiKey = environment.apiKey;
  title: any;

  constructor(private http: HttpClient,  private dataService: DataService) {}

  ngOnInit() {
    
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
    });
    console.log('API Key:', this.apiKey);
    this.http.get<any[]>('https://exercisedb.p.rapidapi.com/exercises', { headers })
      .subscribe(response => {
        this.dataService.setData(response);
        console.log(this.dataService);
      });
  }
}
