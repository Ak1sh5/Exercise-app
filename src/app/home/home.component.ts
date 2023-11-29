// home.component.ts
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  apiKey = environment.apiKey;

  constructor(private http: HttpClient,  private dataService: DataService) {}
  ngOnInit() {
    
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
    });
    this.http.get<any[]>('https://exercisedb.p.rapidapi.com/exercises', { headers })
      .subscribe(response => {
        this.dataService.setData(response);
        console.log(this.dataService);
      });
  }

  // Handle the search event
  onSearch(query: string) {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
    });
  
   
  
    this.http.get<any[]>(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${query}`, { headers })
      .subscribe(
        response => {
          this.dataService.setData(response);
          console.log(this.dataService);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
           
            console.error('Bad Request:', error.error);
        
            alert('Please enter a valid body part. Available values : back, cardio, chest, lower arms, lower legs, neck, shoulders, upper arms, upper legs, waist');
          } else {
            console.error('Error:', error.error);
            alert('Something went wrong; please try again later.');
          }
        }
      );
  }
  
}
