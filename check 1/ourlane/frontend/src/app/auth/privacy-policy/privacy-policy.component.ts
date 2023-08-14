import { Component, OnInit } from '@angular/core';
import { configImage } from 'src/app/_config/config';
import { StaticServices } from 'src/app/_services/static.service'
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  public arrayLeft = configImage.arrayLeft;
  public content: any;
  public title: string;
  public updatedAt: Date;
  public description: '';
  constructor(
    private staticServices: StaticServices
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }
  refreshData() {
    this.staticServices.privacyPolicy().subscribe(res => {
      this.content = res.result;
      this.title = res.result.title;
      this.updatedAt = res.result.updatedAt;
      this.description = res.result.description;
    });
  }
}
