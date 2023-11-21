import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonDataService } from '../common-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxCommonComponent } from '../dialog-box-common/dialog-box-common.component';


@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.css']
})
export class MultiselectDropdownComponent implements OnInit {
  // Create DaiDH
  @ViewChild('multiSelect') multiSelect;
  public formGroup: FormGroup ;
  public loadContent: boolean = false;
  public name :any = 'Cricketers';
  public SearchData = [];
  public settings:any = {};
  public selectedItems:any = [];
  @Input() multiSearchLoader =false

  constructor( private CommonDataService:CommonDataService,
    private matDialog:MatDialog ){

  }

  ngOnInit() {

    // setting and support i18n
    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
      // selectAllText: 'Select All',
      // unSelectAllText: 'Hủy chọn',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 5,
      searchPlaceholderText: 'Search City Ex: Mumbai',
      noDataAvailablePlaceholderText: 'No Data Available ',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.setForm();
    this.search();

  }

  public setForm() {

    this.SearchData = [
      ...this.CommonDataService.DistrictData.slice(0,10)
    ];

    this.formGroup = new FormGroup({
      name: new FormControl([], Validators.required),
    });
    this.loadContent = true;
  }

  get f():any {
    return this.formGroup.controls;
  }

  @Output() EmitSearchData:EventEmitter<any> = new EventEmitter()
  public OnSubmitSearch() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    let CityName:any = []
    const finalData = this.formGroup.value.name
    if(this.CheckLimitExceed(finalData.length)){
      return 
    }

    finalData.forEach(val=> CityName.push(val.item_text))
    CityName = CityName.join(",")
    this.EmitSearchData.emit(CityName)
  }

  @Output() EmitLimitExceed = new EventEmitter()
  CheckLimitExceed(length){
    if(length > 5){
      this.matDialog.open(DialogBoxCommonComponent,{
        width: '50%',
        data: { }
      })
      // this.EmitLimitExceed.emit(true)
      return true
    }
    return false
  }

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }



  public onDropDownClose(item: any) {
    if(this.selectedItems.length > 0){
        this.SearchData = this.selectedItems
    }
  }

  public onItemSelect(item: any) {
    if(item){
        this.selectedItems.push(item)
    }
  }

  public onDeSelect(item: any) {
    let index = this.selectedItems.findIndex((a)=>a.item_id === item.item_id)
    if(index != -1){
        this.selectedItems.splice(index,1)
    }
    // console.log(this.selectedItems)
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }

  searchTerms= new Subject<string>();
  public onFilterChange(item: any) {
    this.searchTerms.next(item); // Push search term into the observable
  }

  search() {
    this.searchTerms.pipe(
        debounceTime(500), // Ignore events within 300ms of the last event
        distinctUntilChanged(), // Ignore if the search term hasn't changed
        switchMap( async (term: string) => {
          const filteredItems = await this.CommonDataService.DistrictData.filter((item:any) =>{
            if(term){
              if(item.item_text.toLowerCase().includes(term.toLowerCase())){
                return item
              }
            }
          });
          return filteredItems
        })
      )
      .subscribe(results => { 

        if(results.length == 0){
        //   this.SearchData = [...this.DistrictData.slice(0,5)]
        }else{
          this.SearchData = results
        }

      });
  }

 
 





}
