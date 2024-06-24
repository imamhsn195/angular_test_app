import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  template:`
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
        <app-housing-location
            *ngFor= "let housingLocation of filteredLocationList"
            [housingLocation]="housingLocation"
        ></app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl = `https://angular.dev/assets/tutorials/common`;
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);
  constructor(){
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[])=>{
      this.housingLocationList = housingLocationList
      this.filteredLocationList = housingLocationList;
    });
  }

  async filterResults(text: string){
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }else{
      await this.housingService.getAllHousingLocations().then(async (housingLocationList: HousingLocation[]) => {
        this.filteredLocationList = await housingLocationList.filter((housingLocatioin: HousingLocation) => {
          return housingLocatioin?.city.toLowerCase().includes(text.toLowerCase());
        })
      });
    }
  }
}
