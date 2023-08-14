import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GlobalServices {
  public items = [];
  sumItems(items) {    
    return items.reduce((a, c) => {
      return a + c;
    }, 0);
  } 
 
  percentage(value1,value2){
      return ((value1 - value2) /value1) * 100 
  }
}
