import { Component, OnInit } from '@angular/core';
import { configImage } from 'src/app/_config/config';
import { StaticServices } from 'src/app/_services/static.service'
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  public arrayLeft = configImage.arrayLeft;
  public content: any;
  public title: string;
  public updatedAt: Date;
  public description: any;
  constructor(
    private staticServices: StaticServices
  ) { }

  ngOnInit(): void {
    this.termsCondition();
  }
  termsCondition() {
    this.staticServices.termsAndCondition().subscribe(res => {
      this.content = res.result;
      this.title = res.result.title;
      this.updatedAt = res.result.updatedAt;
      this.description = res.result.description;
      console.log(this.content);
    });
  }
}