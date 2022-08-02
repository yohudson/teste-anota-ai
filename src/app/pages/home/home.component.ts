import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemList: any = [];
  displayList: any = [];

  search: any;

  constructor(
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList = () => {
    this.service.Get().subscribe(
      result => {
        this.itemList = result
        this.displayList = result
      }
    )
  }

  removeItem = (index:any) => {
    console.log(index)
    this.itemList.splice(index,1)
  }

  searchText = (search:any) => {
    if (search){
      var newArr: any = [];
      Object.assign(newArr, this.displayList);
      search = search.toLowerCase();
      var result = newArr.filter((item:any) => item.title.toLowerCase().indexOf(search) > -1 || item.description.toLowerCase().indexOf(search) > -1);
      this.itemList = result;
    }
    if (search.length == 0) {
      this.itemList = this.displayList
    }
  }

}
