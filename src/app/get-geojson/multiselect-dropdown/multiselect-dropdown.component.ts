import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';


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
  public data = [ ];
  public settings:any = {};
  public selectedItems:any = [];

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
      searchPlaceholderText: 'Search City',
      noDataAvailablePlaceholderText: 'No Data Available ',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.setForm();
    this.search();

  }

  public setForm() {

    this.data = [
      ...this.DistrictData.slice(0,5)
    ];

    this.formGroup = new FormGroup({
      name: new FormControl([], Validators.required),
    });
    this.loadContent = true;
  }

  get f():any {
    return this.formGroup.controls;
  }

  public save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    console.log(this.formGroup.value);
  }

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }



  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onDeSelect(item: any) {
    console.log(item);
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }

  searchTerms= new Subject<string>();
  public onFilterChange(item: any) {
    console.log(item);
    this.searchTerms.next(item); // Push search term into the observable
  }

  search() {
    this.searchTerms.pipe(
        debounceTime(300), // Ignore events within 300ms of the last event
        distinctUntilChanged(), // Ignore if the search term hasn't changed
        switchMap( async (term: string) => {
          const filteredItems = await this.DistrictData.filter((item:any) =>{
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
        console.log(results);
        if(results.length == 0){
          this.data = [...this.DistrictData.slice(0,5)]
        }else{
          this.data =results
        }

      });
  }

  DistrictData = [
    {
        "item_id": 0,
        "item_text": "WEST GODAVARI"
    },
    {
        "item_id": 1,
        "item_text": "GUNTUR"
    },
    {
        "item_id": 2,
        "item_text": "ADILABAD"
    },
    {
        "item_id": 3,
        "item_text": "SRIKAKULAM"
    },
    {
        "item_id": 4,
        "item_text": "KARIMNAGAR"
    },
    {
        "item_id": 5,
        "item_text": "VIZIANAGARAM"
    },
    {
        "item_id": 6,
        "item_text": "NIZAMABAD"
    },
    {
        "item_id": 7,
        "item_text": "CUDDAPAH"
    },
    {
        "item_id": 8,
        "item_text": "KHAMMAM"
    },
    {
        "item_id": 9,
        "item_text": "WARANGAL"
    },
    {
        "item_id": 10,
        "item_text": "VISAKHAPATNAM"
    },
    {
        "item_id": 11,
        "item_text": "NALGONDA"
    },
    {
        "item_id": 12,
        "item_text": "EAST GODAVARI"
    },
    {
        "item_id": 13,
        "item_text": "MEDAK"
    },
    {
        "item_id": 14,
        "item_text": "MAHBUBNAGAR"
    },
    {
        "item_id": 15,
        "item_text": "RANGAREDDI"
    },
    {
        "item_id": 16,
        "item_text": "HYDERABAD"
    },
    {
        "item_id": 17,
        "item_text": "KRISHNA"
    },
    {
        "item_id": 18,
        "item_text": "PRAKASAM"
    },
    {
        "item_id": 19,
        "item_text": "KURNOOL"
    },
    {
        "item_id": 20,
        "item_text": "ANANTAPUR"
    },
    {
        "item_id": 21,
        "item_text": "NELLORE"
    },
    {
        "item_id": 22,
        "item_text": "CHITTOOR"
    },
    {
        "item_id": 23,
        "item_text": "UPPER SIANG *"
    },
    {
        "item_id": 24,
        "item_text": "EAST SIANG"
    },
    {
        "item_id": 25,
        "item_text": "DIBANG VALLEY"
    },
    {
        "item_id": 26,
        "item_text": "WEST SIANG"
    },
    {
        "item_id": 27,
        "item_text": "LOWER DIBANG VALLEY"
    },
    {
        "item_id": 28,
        "item_text": "UPPER SUBANSIRI"
    },
    {
        "item_id": 29,
        "item_text": "ANJAW"
    },
    {
        "item_id": 30,
        "item_text": "TIRAP"
    },
    {
        "item_id": 31,
        "item_text": "LOHIT"
    },
    {
        "item_id": 32,
        "item_text": "KURUNG KUMEY"
    },
    {
        "item_id": 33,
        "item_text": "PAPUM PARE *"
    },
    {
        "item_id": 34,
        "item_text": "LOWER SUBANSIRI"
    },
    {
        "item_id": 35,
        "item_text": "CHANGLANG"
    },
    {
        "item_id": 36,
        "item_text": "EAST KAMENG"
    },
    {
        "item_id": 37,
        "item_text": "TAWANG"
    },
    {
        "item_id": 38,
        "item_text": "WEST KAMENG"
    },
    {
        "item_id": 39,
        "item_text": "JORHAT"
    },
    {
        "item_id": 40,
        "item_text": "TINSUKIA"
    },
    {
        "item_id": 41,
        "item_text": "DHEMAJI"
    },
    {
        "item_id": 42,
        "item_text": "DIBRUGARH"
    },
    {
        "item_id": 43,
        "item_text": "BONGAIGAON"
    },
    {
        "item_id": 44,
        "item_text": "SONITPUR"
    },
    {
        "item_id": 45,
        "item_text": "LAKHIMPUR"
    },
    {
        "item_id": 46,
        "item_text": "SIBSAGAR"
    },
    {
        "item_id": 47,
        "item_text": "GOLAGHAT"
    },
    {
        "item_id": 48,
        "item_text": "DARRANG"
    },
    {
        "item_id": 49,
        "item_text": "NALBARI"
    },
    {
        "item_id": 50,
        "item_text": "KOKRAJHAR"
    },
    {
        "item_id": 51,
        "item_text": "NAGAON"
    },
    {
        "item_id": 52,
        "item_text": "KAMRUP"
    },
    {
        "item_id": 53,
        "item_text": "BARPETA"
    },
    {
        "item_id": 54,
        "item_text": "KARBI ANGLONG"
    },
    {
        "item_id": 55,
        "item_text": "MARIGAON"
    },
    {
        "item_id": 56,
        "item_text": "GOALPARA"
    },
    {
        "item_id": 57,
        "item_text": "DHUBRI"
    },
    {
        "item_id": 58,
        "item_text": "CACHAR"
    },
    {
        "item_id": 59,
        "item_text": "NORTH CACHAR HILLS"
    },
    {
        "item_id": 60,
        "item_text": "KARIMGANJ"
    },
    {
        "item_id": 61,
        "item_text": "HAILAKANDI"
    },
    {
        "item_id": 62,
        "item_text": "PATNA"
    },
    {
        "item_id": 63,
        "item_text": "PASHCHIM CHAMPARAN"
    },
    {
        "item_id": 64,
        "item_text": "PURBA CHAMPARAN"
    },
    {
        "item_id": 65,
        "item_text": "BUXAR *"
    },
    {
        "item_id": 66,
        "item_text": "SITAMARHI"
    },
    {
        "item_id": 67,
        "item_text": "MADHUBANI"
    },
    {
        "item_id": 68,
        "item_text": "VAISHALI"
    },
    {
        "item_id": 69,
        "item_text": "SHEOHAR *"
    },
    {
        "item_id": 70,
        "item_text": "KISHANGANJ"
    },
    {
        "item_id": 71,
        "item_text": "ARARIA"
    },
    {
        "item_id": 72,
        "item_text": "GOPALGANJ"
    },
    {
        "item_id": 73,
        "item_text": "SUPAUL *"
    },
    {
        "item_id": 74,
        "item_text": "DARBHANGA"
    },
    {
        "item_id": 75,
        "item_text": "MUZAFFARPUR"
    },
    {
        "item_id": 76,
        "item_text": "SIWAN"
    },
    {
        "item_id": 77,
        "item_text": "SARAN"
    },
    {
        "item_id": 78,
        "item_text": "MADHEPURA"
    },
    {
        "item_id": 79,
        "item_text": "PURNIA"
    },
    {
        "item_id": 80,
        "item_text": "SAHARSA"
    },
    {
        "item_id": 81,
        "item_text": "SAMASTIPUR"
    },
    {
        "item_id": 82,
        "item_text": "KATIHAR"
    },
    {
        "item_id": 83,
        "item_text": "BEGUSARAI"
    },
    {
        "item_id": 84,
        "item_text": "KHAGARIA"
    },
    {
        "item_id": 85,
        "item_text": "BHOJPUR"
    },
    {
        "item_id": 86,
        "item_text": "BHAGALPUR"
    },
    {
        "item_id": 87,
        "item_text": "MUNGER"
    },
    {
        "item_id": 88,
        "item_text": "NALANDA"
    },
    {
        "item_id": 89,
        "item_text": "KAIMUR (BHABUA) *"
    },
    {
        "item_id": 90,
        "item_text": "LAKHISARAI *"
    },
    {
        "item_id": 91,
        "item_text": "ROHTAS"
    },
    {
        "item_id": 92,
        "item_text": "JEHANABAD"
    },
    {
        "item_id": 93,
        "item_text": "SHEIKHPURA *"
    },
    {
        "item_id": 94,
        "item_text": "JAMUI *"
    },
    {
        "item_id": 95,
        "item_text": "BANKA *"
    },
    {
        "item_id": 96,
        "item_text": "AURANGABAD"
    },
    {
        "item_id": 97,
        "item_text": "GAYA"
    },
    {
        "item_id": 98,
        "item_text": "NAWADA"
    },
    {
        "item_id": 99,
        "item_text": "DURG"
    },
    {
        "item_id": 100,
        "item_text": "SURGUJA"
    },
    {
        "item_id": 101,
        "item_text": "KORIYA *"
    },
    {
        "item_id": 102,
        "item_text": "JASHPUR *"
    },
    {
        "item_id": 103,
        "item_text": "BILASPUR"
    },
    {
        "item_id": 104,
        "item_text": "KORBA *"
    },
    {
        "item_id": 105,
        "item_text": "RAIGARH"
    },
    {
        "item_id": 106,
        "item_text": "KAWARDHA *"
    },
    {
        "item_id": 107,
        "item_text": "JANJGIR - CHAMPA*"
    },
    {
        "item_id": 108,
        "item_text": "RAIPUR"
    },
    {
        "item_id": 109,
        "item_text": "RAJNANDGAON"
    },
    {
        "item_id": 110,
        "item_text": "MAHASAMUND *"
    },
    {
        "item_id": 111,
        "item_text": "DHAMTARI *"
    },
    {
        "item_id": 112,
        "item_text": "KANKER *"
    },
    {
        "item_id": 113,
        "item_text": "BASTER"
    },
    {
        "item_id": 114,
        "item_text": "DANTEWADA*"
    },
    {
        "item_id": 115,
        "item_text": "DELHI"
    },
    {
        "item_id": 116,
        "item_text": "NORTH GOA"
    },
    {
        "item_id": 117,
        "item_text": "SOUTH GOA"
    },
    {
        "item_id": 118,
        "item_text": "KACHCHH"
    },
    {
        "item_id": 119,
        "item_text": "BANAS KANTHA"
    },
    {
        "item_id": 120,
        "item_text": "DOHAD  *"
    },
    {
        "item_id": 121,
        "item_text": "SABAR KANTHA"
    },
    {
        "item_id": 122,
        "item_text": "PATAN  *"
    },
    {
        "item_id": 123,
        "item_text": "MAHESANA"
    },
    {
        "item_id": 124,
        "item_text": "AHMADABAD"
    },
    {
        "item_id": 125,
        "item_text": "SURENDRANAGAR"
    },
    {
        "item_id": 126,
        "item_text": "GANDHINAGAR"
    },
    {
        "item_id": 127,
        "item_text": "PANCH MAHALS"
    },
    {
        "item_id": 128,
        "item_text": "RAJKOT"
    },
    {
        "item_id": 129,
        "item_text": "KHEDA"
    },
    {
        "item_id": 130,
        "item_text": "JAMNAGAR"
    },
    {
        "item_id": 131,
        "item_text": "ANAND  *"
    },
    {
        "item_id": 132,
        "item_text": "VADODARA"
    },
    {
        "item_id": 133,
        "item_text": "BHAVNAGAR"
    },
    {
        "item_id": 134,
        "item_text": "JUNAGADH"
    },
    {
        "item_id": 135,
        "item_text": "BHARUCH"
    },
    {
        "item_id": 136,
        "item_text": "PORBANDAR  *"
    },
    {
        "item_id": 137,
        "item_text": "SURAT"
    },
    {
        "item_id": 138,
        "item_text": "AMRELI"
    },
    {
        "item_id": 139,
        "item_text": "NARMADA  *"
    },
    {
        "item_id": 140,
        "item_text": "NAVSARI  *"
    },
    {
        "item_id": 141,
        "item_text": "THE DANGS"
    },
    {
        "item_id": 142,
        "item_text": "VALSAD"
    },
    {
        "item_id": 143,
        "item_text": "SONIPAT"
    },
    {
        "item_id": 144,
        "item_text": "YAMUNANAGAR"
    },
    {
        "item_id": 145,
        "item_text": "KURUKSHETRA"
    },
    {
        "item_id": 146,
        "item_text": "PANCHKULA *"
    },
    {
        "item_id": 147,
        "item_text": "AMBALA"
    },
    {
        "item_id": 148,
        "item_text": "PANIPAT"
    },
    {
        "item_id": 149,
        "item_text": "KAITHAL"
    },
    {
        "item_id": 150,
        "item_text": "SIRSA"
    },
    {
        "item_id": 151,
        "item_text": "KARNAL"
    },
    {
        "item_id": 152,
        "item_text": "JIND"
    },
    {
        "item_id": 153,
        "item_text": "FATEHABAD *"
    },
    {
        "item_id": 154,
        "item_text": "HISAR"
    },
    {
        "item_id": 155,
        "item_text": "ROHTAK"
    },
    {
        "item_id": 156,
        "item_text": "BHIWANI"
    },
    {
        "item_id": 157,
        "item_text": "JHAJJAR *"
    },
    {
        "item_id": 158,
        "item_text": "GURGAON"
    },
    {
        "item_id": 159,
        "item_text": "FARIDABAD"
    },
    {
        "item_id": 160,
        "item_text": "MAHENDRAGARH"
    },
    {
        "item_id": 161,
        "item_text": "REWARI"
    },
    {
        "item_id": 162,
        "item_text": "KANGRA"
    },
    {
        "item_id": 163,
        "item_text": "MANDI"
    },
    {
        "item_id": 164,
        "item_text": "HAMIRPUR"
    },
    {
        "item_id": 165,
        "item_text": "LAHUL & SPITI"
    },
    {
        "item_id": 166,
        "item_text": "CHAMBA"
    },
    {
        "item_id": 167,
        "item_text": "KULLU"
    },
    {
        "item_id": 168,
        "item_text": "KINNAUR"
    },
    {
        "item_id": 169,
        "item_text": "UNA"
    },
    {
        "item_id": 170,
        "item_text": "SHIMLA"
    },
    {
        "item_id": 171,
        "item_text": "BILASPUR"
    },
    {
        "item_id": 172,
        "item_text": "SOLAN"
    },
    {
        "item_id": 173,
        "item_text": "SIRMAUR"
    },
    {
        "item_id": 174,
        "item_text": "SRINAGAR"
    },
    {
        "item_id": 175,
        "item_text": "BADGAM"
    },
    {
        "item_id": 177,
        "item_text": "KUPWARA"
    },
    {
        "item_id": 178,
        "item_text": "LEH(LADAKH)"
    },
    {
        "item_id": 179,
        "item_text": "BARAMULA"
    },
    {
        "item_id": 180,
        "item_text": "KARGIL"
    },
    {
        "item_id": 181,
        "item_text": "ANANTNAG"
    },
    {
        "item_id": 182,
        "item_text": "DODA"
    },
    {
        "item_id": 183,
        "item_text": "PULWAMA"
    },
    {
        "item_id": 184,
        "item_text": "PUNCH"
    },
    {
        "item_id": 185,
        "item_text": "JAMMU"
    },
    {
        "item_id": 186,
        "item_text": "RAJAURI"
    },
    {
        "item_id": 187,
        "item_text": "UDHAMPUR"
    },
    {
        "item_id": 188,
        "item_text": "KATHUA"
    },
    {
        "item_id": 189,
        "item_text": "PAKAUR"
    },
    {
        "item_id": 190,
        "item_text": "JAMTARA"
    },
    {
        "item_id": 191,
        "item_text": "BOKARO"
    },
    {
        "item_id": 192,
        "item_text": "SAHIBGANJ"
    },
    {
        "item_id": 193,
        "item_text": "GODDA"
    },
    {
        "item_id": 194,
        "item_text": "KODARMA"
    },
    {
        "item_id": 195,
        "item_text": "GIRIDIH"
    },
    {
        "item_id": 196,
        "item_text": "DUMKA"
    },
    {
        "item_id": 197,
        "item_text": "DEOGHAR"
    },
    {
        "item_id": 198,
        "item_text": "PALAMU"
    },
    {
        "item_id": 199,
        "item_text": "HAZARIBAG"
    },
    {
        "item_id": 200,
        "item_text": "CHATRA"
    },
    {
        "item_id": 201,
        "item_text": "GARHWA"
    },
    {
        "item_id": 202,
        "item_text": "PURBI SINGHBHUM"
    },
    {
        "item_id": 203,
        "item_text": "RANCHI"
    },
    {
        "item_id": 204,
        "item_text": "DHANBAD"
    },
    {
        "item_id": 205,
        "item_text": "LATEHAR"
    },
    {
        "item_id": 206,
        "item_text": "GUMLA"
    },
    {
        "item_id": 207,
        "item_text": "LOHARDAGA"
    },
    {
        "item_id": 208,
        "item_text": "SARAIKELA"
    },
    {
        "item_id": 209,
        "item_text": "PACHIM SINGHBHUM"
    },
    {
        "item_id": 210,
        "item_text": "SIMDEGA"
    },
    {
        "item_id": 211,
        "item_text": "DAKSHINA KANNADA"
    },
    {
        "item_id": 212,
        "item_text": "BANGALORE"
    },
    {
        "item_id": 213,
        "item_text": "BAGALKOT *"
    },
    {
        "item_id": 214,
        "item_text": "BIDAR"
    },
    {
        "item_id": 215,
        "item_text": "BIJAPUR"
    },
    {
        "item_id": 216,
        "item_text": "GULBARGA"
    },
    {
        "item_id": 217,
        "item_text": "BELGAUM"
    },
    {
        "item_id": 218,
        "item_text": "RAICHUR"
    },
    {
        "item_id": 219,
        "item_text": "KOPPAL *"
    },
    {
        "item_id": 220,
        "item_text": "GADAG *"
    },
    {
        "item_id": 221,
        "item_text": "DHARWAD"
    },
    {
        "item_id": 222,
        "item_text": "BELLARY"
    },
    {
        "item_id": 223,
        "item_text": "UTTARA KANNADA"
    },
    {
        "item_id": 224,
        "item_text": "HAVERI *"
    },
    {
        "item_id": 225,
        "item_text": "DAVANGERE*"
    },
    {
        "item_id": 226,
        "item_text": "CHITRADURGA"
    },
    {
        "item_id": 227,
        "item_text": "SHIMOGA"
    },
    {
        "item_id": 228,
        "item_text": "TUMKUR"
    },
    {
        "item_id": 229,
        "item_text": "UDUPI *"
    },
    {
        "item_id": 230,
        "item_text": "CHIKMAGALUR"
    },
    {
        "item_id": 231,
        "item_text": "KOLAR"
    },
    {
        "item_id": 232,
        "item_text": "HASSAN"
    },
    {
        "item_id": 233,
        "item_text": "BANGALORE RURAL"
    },
    {
        "item_id": 234,
        "item_text": "MANDYA"
    },
    {
        "item_id": 235,
        "item_text": "KODAGU"
    },
    {
        "item_id": 236,
        "item_text": "MYSORE"
    },
    {
        "item_id": 237,
        "item_text": "CHAMRAJNAGAR*"
    },
    {
        "item_id": 238,
        "item_text": "KOZHIKODE"
    },
    {
        "item_id": 239,
        "item_text": "KASARAGOD"
    },
    {
        "item_id": 240,
        "item_text": "KANNUR"
    },
    {
        "item_id": 241,
        "item_text": "WAYANAD"
    },
    {
        "item_id": 242,
        "item_text": "MALAPPURAM"
    },
    {
        "item_id": 243,
        "item_text": "PALAKKAD"
    },
    {
        "item_id": 244,
        "item_text": "THRISSUR"
    },
    {
        "item_id": 245,
        "item_text": "THIRUVANANTHAPURAM"
    },
    {
        "item_id": 246,
        "item_text": "IDUKKI"
    },
    {
        "item_id": 247,
        "item_text": "ERNAKULAM"
    },
    {
        "item_id": 248,
        "item_text": "ALAPPUZHA"
    },
    {
        "item_id": 249,
        "item_text": "KOTTAYAM"
    },
    {
        "item_id": 250,
        "item_text": "PATHANAMTHITTA"
    },
    {
        "item_id": 251,
        "item_text": "KOLLAM"
    },
    {
        "item_id": 252,
        "item_text": "MORENA"
    },
    {
        "item_id": 253,
        "item_text": "BHIND"
    },
    {
        "item_id": 254,
        "item_text": "TIKAMGARH"
    },
    {
        "item_id": 255,
        "item_text": "GWALIOR"
    },
    {
        "item_id": 256,
        "item_text": "SHEOPUR *"
    },
    {
        "item_id": 257,
        "item_text": "DATIA"
    },
    {
        "item_id": 258,
        "item_text": "NEEMUCH *"
    },
    {
        "item_id": 259,
        "item_text": "SATNA"
    },
    {
        "item_id": 260,
        "item_text": "SHIVPURI"
    },
    {
        "item_id": 261,
        "item_text": "REWA"
    },
    {
        "item_id": 262,
        "item_text": "CHHATARPUR"
    },
    {
        "item_id": 263,
        "item_text": "GUNA"
    },
    {
        "item_id": 264,
        "item_text": "PANNA"
    },
    {
        "item_id": 265,
        "item_text": "ASHOK NAGAR"
    },
    {
        "item_id": 266,
        "item_text": "MANDSAUR"
    },
    {
        "item_id": 267,
        "item_text": "SIDHI"
    },
    {
        "item_id": 268,
        "item_text": "RAJGARH"
    },
    {
        "item_id": 269,
        "item_text": "SAGAR"
    },
    {
        "item_id": 270,
        "item_text": "DAMOH"
    },
    {
        "item_id": 271,
        "item_text": "SHAJAPUR"
    },
    {
        "item_id": 272,
        "item_text": "VIDISHA"
    },
    {
        "item_id": 273,
        "item_text": "SHAHDOL"
    },
    {
        "item_id": 274,
        "item_text": "KATNI *"
    },
    {
        "item_id": 275,
        "item_text": "UMARIA *"
    },
    {
        "item_id": 276,
        "item_text": "RATLAM"
    },
    {
        "item_id": 277,
        "item_text": "BHOPAL"
    },
    {
        "item_id": 278,
        "item_text": "UJJAIN"
    },
    {
        "item_id": 279,
        "item_text": "RAISEN"
    },
    {
        "item_id": 280,
        "item_text": "SEHORE"
    },
    {
        "item_id": 281,
        "item_text": "ANUPPUR"
    },
    {
        "item_id": 282,
        "item_text": "JABALPUR"
    },
    {
        "item_id": 283,
        "item_text": "DEWAS"
    },
    {
        "item_id": 284,
        "item_text": "JHABUA"
    },
    {
        "item_id": 285,
        "item_text": "NARSIMHAPUR"
    },
    {
        "item_id": 286,
        "item_text": "DHAR"
    },
    {
        "item_id": 287,
        "item_text": "INDORE"
    },
    {
        "item_id": 288,
        "item_text": "DINDORI *"
    },
    {
        "item_id": 289,
        "item_text": "HOSHANGABAD"
    },
    {
        "item_id": 290,
        "item_text": "SEONI"
    },
    {
        "item_id": 291,
        "item_text": "MANDLA"
    },
    {
        "item_id": 292,
        "item_text": "CHHINDWARA"
    },
    {
        "item_id": 293,
        "item_text": "HARDA *"
    },
    {
        "item_id": 294,
        "item_text": "WEST NIMAR"
    },
    {
        "item_id": 295,
        "item_text": "EAST NIMAR"
    },
    {
        "item_id": 296,
        "item_text": "BETUL"
    },
    {
        "item_id": 297,
        "item_text": "BALAGHAT"
    },
    {
        "item_id": 298,
        "item_text": "BARWANI *"
    },
    {
        "item_id": 299,
        "item_text": "BURHANPUR"
    },
    {
        "item_id": 300,
        "item_text": "MUMBAI (SUBURBAN) *"
    },
    {
        "item_id": 301,
        "item_text": "JALGAON"
    },
    {
        "item_id": 302,
        "item_text": "NAGPUR"
    },
    {
        "item_id": 303,
        "item_text": "PUNE"
    },
    {
        "item_id": 304,
        "item_text": "CHANDRAPUR"
    },
    {
        "item_id": 305,
        "item_text": "THANE"
    },
    {
        "item_id": 306,
        "item_text": "SOLAPUR"
    },
    {
        "item_id": 307,
        "item_text": "NANDURBAR *"
    },
    {
        "item_id": 308,
        "item_text": "AMRAVATI"
    },
    {
        "item_id": 309,
        "item_text": "DHULE"
    },
    {
        "item_id": 310,
        "item_text": "GONDIYA *"
    },
    {
        "item_id": 311,
        "item_text": "BHANDARA"
    },
    {
        "item_id": 312,
        "item_text": "WARDHA"
    },
    {
        "item_id": 313,
        "item_text": "BULDANA"
    },
    {
        "item_id": 314,
        "item_text": "AKOLA"
    },
    {
        "item_id": 315,
        "item_text": "NASHIK"
    },
    {
        "item_id": 316,
        "item_text": "GADCHIROLI"
    },
    {
        "item_id": 317,
        "item_text": "AURANGABAD"
    },
    {
        "item_id": 318,
        "item_text": "WASHIM *"
    },
    {
        "item_id": 319,
        "item_text": "JALNA"
    },
    {
        "item_id": 320,
        "item_text": "YAVATMAL"
    },
    {
        "item_id": 321,
        "item_text": "AHMADNAGAR"
    },
    {
        "item_id": 322,
        "item_text": "HINGOLI *"
    },
    {
        "item_id": 323,
        "item_text": "NANDED"
    },
    {
        "item_id": 324,
        "item_text": "PARBHANI"
    },
    {
        "item_id": 325,
        "item_text": "RAIGARH"
    },
    {
        "item_id": 326,
        "item_text": "BID"
    },
    {
        "item_id": 327,
        "item_text": "MUMBAI"
    },
    {
        "item_id": 328,
        "item_text": "LATUR"
    },
    {
        "item_id": 329,
        "item_text": "OSMANABAD"
    },
    {
        "item_id": 330,
        "item_text": "SANGLI"
    },
    {
        "item_id": 331,
        "item_text": "SATARA"
    },
    {
        "item_id": 332,
        "item_text": "RATNAGIRI"
    },
    {
        "item_id": 333,
        "item_text": "KOLHAPUR"
    },
    {
        "item_id": 334,
        "item_text": "SINDHUDURG"
    },
    {
        "item_id": 335,
        "item_text": "SENAPATI"
    },
    {
        "item_id": 336,
        "item_text": "IMPHAL WEST"
    },
    {
        "item_id": 337,
        "item_text": "IMPHAL EAST *"
    },
    {
        "item_id": 338,
        "item_text": "BISHNUPUR"
    },
    {
        "item_id": 339,
        "item_text": "THOUBAL"
    },
    {
        "item_id": 340,
        "item_text": "CHURACHANDPUR"
    },
    {
        "item_id": 341,
        "item_text": "CHANDEL"
    },
    {
        "item_id": 342,
        "item_text": "UKHRUL"
    },
    {
        "item_id": 343,
        "item_text": "TAMENGLONG"
    },
    {
        "item_id": 344,
        "item_text": "EAST KHASI HILLS"
    },
    {
        "item_id": 345,
        "item_text": "WEST GARO HILLS"
    },
    {
        "item_id": 346,
        "item_text": "SOUTH GARO HILLS *"
    },
    {
        "item_id": 347,
        "item_text": "JAINTIA HILLS"
    },
    {
        "item_id": 348,
        "item_text": "EAST GARO HILLS"
    },
    {
        "item_id": 349,
        "item_text": "WEST KHASI HILLS"
    },
    {
        "item_id": 350,
        "item_text": "RI BHOI  *"
    },
    {
        "item_id": 351,
        "item_text": "AIZAWL"
    },
    {
        "item_id": 352,
        "item_text": "CHAMPHAI *"
    },
    {
        "item_id": 353,
        "item_text": "LUNGLEI"
    },
    {
        "item_id": 354,
        "item_text": "KOLASIB *"
    },
    {
        "item_id": 355,
        "item_text": "MAMIT *"
    },
    {
        "item_id": 356,
        "item_text": "SERCHHIP *"
    },
    {
        "item_id": 357,
        "item_text": "LAWNGTLAI"
    },
    {
        "item_id": 358,
        "item_text": "SAIHA *"
    },
    {
        "item_id": 359,
        "item_text": "MON"
    },
    {
        "item_id": 360,
        "item_text": "TUENSANG"
    },
    {
        "item_id": 361,
        "item_text": "MOKOKCHUNG"
    },
    {
        "item_id": 362,
        "item_text": "ZUNHEBOTO"
    },
    {
        "item_id": 363,
        "item_text": "WOKHA"
    },
    {
        "item_id": 364,
        "item_text": "KOHIMA"
    },
    {
        "item_id": 365,
        "item_text": "PHEK"
    },
    {
        "item_id": 366,
        "item_text": "DIMAPUR *"
    },
    {
        "item_id": 367,
        "item_text": "KHORDHA  *"
    },
    {
        "item_id": 368,
        "item_text": "SUNDARGARH"
    },
    {
        "item_id": 369,
        "item_text": "MAYURBHANJ"
    },
    {
        "item_id": 370,
        "item_text": "BALESHWAR"
    },
    {
        "item_id": 371,
        "item_text": "SAMBALPUR"
    },
    {
        "item_id": 372,
        "item_text": "JHARSUGUDA  *"
    },
    {
        "item_id": 373,
        "item_text": "KENDUJHAR"
    },
    {
        "item_id": 374,
        "item_text": "DEBAGARH  *"
    },
    {
        "item_id": 375,
        "item_text": "JAJAPUR  *"
    },
    {
        "item_id": 376,
        "item_text": "BARGARH  *"
    },
    {
        "item_id": 377,
        "item_text": "ANUGUL  *"
    },
    {
        "item_id": 378,
        "item_text": "BHADRAK  *"
    },
    {
        "item_id": 379,
        "item_text": "DHENKANAL"
    },
    {
        "item_id": 380,
        "item_text": "SONAPUR  *"
    },
    {
        "item_id": 381,
        "item_text": "NUAPADA  *"
    },
    {
        "item_id": 382,
        "item_text": "CUTTACK"
    },
    {
        "item_id": 383,
        "item_text": "BALANGIR"
    },
    {
        "item_id": 384,
        "item_text": "BAUDH  *"
    },
    {
        "item_id": 385,
        "item_text": "KENDRAPARA *"
    },
    {
        "item_id": 386,
        "item_text": "KANDHAMAL"
    },
    {
        "item_id": 387,
        "item_text": "JAGATSINGHAPUR  *"
    },
    {
        "item_id": 388,
        "item_text": "NAYAGARH  *"
    },
    {
        "item_id": 389,
        "item_text": "KALAHANDI"
    },
    {
        "item_id": 390,
        "item_text": "PURI"
    },
    {
        "item_id": 391,
        "item_text": "GANJAM"
    },
    {
        "item_id": 392,
        "item_text": "NABARANGAPUR  *"
    },
    {
        "item_id": 393,
        "item_text": "RAYAGADA  *"
    },
    {
        "item_id": 394,
        "item_text": "GAJAPATI  *"
    },
    {
        "item_id": 395,
        "item_text": "KORAPUT"
    },
    {
        "item_id": 396,
        "item_text": "MALKANGIRI  *"
    },
    {
        "item_id": 397,
        "item_text": "PONDICHERRY"
    },
    {
        "item_id": 398,
        "item_text": "MAHE"
    },
    {
        "item_id": 399,
        "item_text": "KARAIKAL"
    },
    {
        "item_id": 400,
        "item_text": "YANAM"
    },
    {
        "item_id": 401,
        "item_text": "AMRITSAR"
    },
    {
        "item_id": 402,
        "item_text": "JALANDHAR"
    },
    {
        "item_id": 403,
        "item_text": "RUPNAGAR"
    },
    {
        "item_id": 404,
        "item_text": "SANGRUR"
    },
    {
        "item_id": 405,
        "item_text": "NAWANSHAHR *"
    },
    {
        "item_id": 406,
        "item_text": "GURDASPUR"
    },
    {
        "item_id": 407,
        "item_text": "HOSHIARPUR"
    },
    {
        "item_id": 408,
        "item_text": "KAPURTHALA"
    },
    {
        "item_id": 409,
        "item_text": "FIROZPUR"
    },
    {
        "item_id": 410,
        "item_text": "MOGA *"
    },
    {
        "item_id": 411,
        "item_text": "LUDHIANA"
    },
    {
        "item_id": 412,
        "item_text": "FARIDKOT"
    },
    {
        "item_id": 413,
        "item_text": "FATEHGARH SAHIB *"
    },
    {
        "item_id": 414,
        "item_text": "MUKTSAR *"
    },
    {
        "item_id": 415,
        "item_text": "PATIALA"
    },
    {
        "item_id": 416,
        "item_text": "BATHINDA"
    },
    {
        "item_id": 417,
        "item_text": "MANSA *"
    },
    {
        "item_id": 418,
        "item_text": "GANGANAGAR"
    },
    {
        "item_id": 419,
        "item_text": "HANUMANGARH *"
    },
    {
        "item_id": 420,
        "item_text": "CHURU"
    },
    {
        "item_id": 421,
        "item_text": "BIKANER"
    },
    {
        "item_id": 422,
        "item_text": "JHUNJHUNUN"
    },
    {
        "item_id": 423,
        "item_text": "JAISALMER"
    },
    {
        "item_id": 424,
        "item_text": "SIKAR"
    },
    {
        "item_id": 425,
        "item_text": "ALWAR"
    },
    {
        "item_id": 426,
        "item_text": "JAIPUR"
    },
    {
        "item_id": 427,
        "item_text": "JODHPUR"
    },
    {
        "item_id": 428,
        "item_text": "BHARATPUR"
    },
    {
        "item_id": 429,
        "item_text": "NAGAUR"
    },
    {
        "item_id": 430,
        "item_text": "DAUSA *"
    },
    {
        "item_id": 431,
        "item_text": "AJMER"
    },
    {
        "item_id": 432,
        "item_text": "BANSWARA"
    },
    {
        "item_id": 433,
        "item_text": "KARAULI *"
    },
    {
        "item_id": 434,
        "item_text": "DHAULPUR"
    },
    {
        "item_id": 435,
        "item_text": "BARMER"
    },
    {
        "item_id": 436,
        "item_text": "SAWAI MADHOPUR"
    },
    {
        "item_id": 437,
        "item_text": "TONK"
    },
    {
        "item_id": 438,
        "item_text": "PALI"
    },
    {
        "item_id": 439,
        "item_text": "JALOR"
    },
    {
        "item_id": 440,
        "item_text": "BHILWARA"
    },
    {
        "item_id": 441,
        "item_text": "RAJSAMAND *"
    },
    {
        "item_id": 442,
        "item_text": "BUNDI"
    },
    {
        "item_id": 443,
        "item_text": "KOTA"
    },
    {
        "item_id": 444,
        "item_text": "SIROHI"
    },
    {
        "item_id": 445,
        "item_text": "BARAN *"
    },
    {
        "item_id": 446,
        "item_text": "CHITTAURGARH"
    },
    {
        "item_id": 447,
        "item_text": "UDAIPUR"
    },
    {
        "item_id": 448,
        "item_text": "JHALAWAR"
    },
    {
        "item_id": 449,
        "item_text": "DUNGARPUR"
    },
    {
        "item_id": 450,
        "item_text": "SOUTH"
    },
    {
        "item_id": 451,
        "item_text": "EAST"
    },
    {
        "item_id": 452,
        "item_text": "WEST"
    },
    {
        "item_id": 453,
        "item_text": "NORTH"
    },
    {
        "item_id": 454,
        "item_text": "THIRUVALLUR"
    },
    {
        "item_id": 455,
        "item_text": "CHENNAI"
    },
    {
        "item_id": 456,
        "item_text": "VELLORE"
    },
    {
        "item_id": 457,
        "item_text": "KANCHEEPURAM"
    },
    {
        "item_id": 458,
        "item_text": "KRISHNAGIRI"
    },
    {
        "item_id": 459,
        "item_text": "TIRUVANNAMALAI"
    },
    {
        "item_id": 460,
        "item_text": "SALEM"
    },
    {
        "item_id": 461,
        "item_text": "NAGAPATTINAM  *"
    },
    {
        "item_id": 462,
        "item_text": "DHARMAPURI"
    },
    {
        "item_id": 463,
        "item_text": "VILUPPURAM"
    },
    {
        "item_id": 464,
        "item_text": "THE NILGIRIS"
    },
    {
        "item_id": 465,
        "item_text": "ERODE"
    },
    {
        "item_id": 466,
        "item_text": "CUDDALORE"
    },
    {
        "item_id": 467,
        "item_text": "NAMAKKAL   *"
    },
    {
        "item_id": 468,
        "item_text": "KARUR  *"
    },
    {
        "item_id": 469,
        "item_text": "PERAMBALUR"
    },
    {
        "item_id": 470,
        "item_text": "COIMBATORE"
    },
    {
        "item_id": 471,
        "item_text": "TIRUCHIRAPPALLI"
    },
    {
        "item_id": 472,
        "item_text": "THANJAVUR"
    },
    {
        "item_id": 473,
        "item_text": "DINDIGUL"
    },
    {
        "item_id": 474,
        "item_text": "THIRUVARUR"
    },
    {
        "item_id": 475,
        "item_text": "PUDUKKOTTAI"
    },
    {
        "item_id": 476,
        "item_text": "MADURAI"
    },
    {
        "item_id": 477,
        "item_text": "VIRUDHUNAGAR"
    },
    {
        "item_id": 478,
        "item_text": "SIVAGANGA"
    },
    {
        "item_id": 479,
        "item_text": "THENI  *"
    },
    {
        "item_id": 480,
        "item_text": "RAMANATHAPURAM"
    },
    {
        "item_id": 481,
        "item_text": "TIRUNELVELI"
    },
    {
        "item_id": 482,
        "item_text": "THOOTHUKKUDI"
    },
    {
        "item_id": 483,
        "item_text": "KANNIYAKUMARI"
    },
    {
        "item_id": 484,
        "item_text": "SOUTH TRIPURA"
    },
    {
        "item_id": 485,
        "item_text": "NORTH TRIPURA"
    },
    {
        "item_id": 486,
        "item_text": "WEST TRIPURA"
    },
    {
        "item_id": 487,
        "item_text": "DHALAI  *"
    },
    {
        "item_id": 488,
        "item_text": "GAUTAM BUDDHA NAGAR *"
    },
    {
        "item_id": 489,
        "item_text": "MUZAFFARNAGAR"
    },
    {
        "item_id": 490,
        "item_text": "KAUSHAMBI *"
    },
    {
        "item_id": 491,
        "item_text": "SAHARANPUR"
    },
    {
        "item_id": 492,
        "item_text": "BIJNOR"
    },
    {
        "item_id": 493,
        "item_text": "BAGHPAT *"
    },
    {
        "item_id": 494,
        "item_text": "MEERUT"
    },
    {
        "item_id": 495,
        "item_text": "MORADABAD"
    },
    {
        "item_id": 496,
        "item_text": "RAMPUR"
    },
    {
        "item_id": 497,
        "item_text": "JYOTIBA PHULE NAGAR *"
    },
    {
        "item_id": 498,
        "item_text": "GHAZIABAD"
    },
    {
        "item_id": 499,
        "item_text": "BAREILLY"
    },
    {
        "item_id": 500,
        "item_text": "PILIBHIT"
    },
    {
        "item_id": 501,
        "item_text": "BULANDSHAHR"
    },
    {
        "item_id": 502,
        "item_text": "KHERI"
    },
    {
        "item_id": 503,
        "item_text": "BUDAUN"
    },
    {
        "item_id": 504,
        "item_text": "SHAHJAHANPUR"
    },
    {
        "item_id": 505,
        "item_text": "BAHRAICH"
    },
    {
        "item_id": 506,
        "item_text": "ALIGARH"
    },
    {
        "item_id": 507,
        "item_text": "ETAH"
    },
    {
        "item_id": 508,
        "item_text": "MATHURA"
    },
    {
        "item_id": 509,
        "item_text": "SHRAWASTI *"
    },
    {
        "item_id": 510,
        "item_text": "SITAPUR"
    },
    {
        "item_id": 511,
        "item_text": "KUSHINAGAR *"
    },
    {
        "item_id": 512,
        "item_text": "HATHRAS *"
    },
    {
        "item_id": 513,
        "item_text": "BALRAMPUR *"
    },
    {
        "item_id": 514,
        "item_text": "AZAMGARH"
    },
    {
        "item_id": 515,
        "item_text": "HARDOI"
    },
    {
        "item_id": 516,
        "item_text": "DEORIA"
    },
    {
        "item_id": 517,
        "item_text": "FARRUKHABAD"
    },
    {
        "item_id": 518,
        "item_text": "BALLIA"
    },
    {
        "item_id": 519,
        "item_text": "FIROZABAD"
    },
    {
        "item_id": 520,
        "item_text": "SIDDHARTHNAGAR"
    },
    {
        "item_id": 521,
        "item_text": "MAINPURI"
    },
    {
        "item_id": 522,
        "item_text": "MAHARAJGANJ"
    },
    {
        "item_id": 523,
        "item_text": "AGRA"
    },
    {
        "item_id": 524,
        "item_text": "GONDA"
    },
    {
        "item_id": 525,
        "item_text": "SULTANPUR"
    },
    {
        "item_id": 526,
        "item_text": "BARABANKI"
    },
    {
        "item_id": 527,
        "item_text": "KANNAUJ *"
    },
    {
        "item_id": 528,
        "item_text": "LUCKNOW"
    },
    {
        "item_id": 529,
        "item_text": "GORAKHPUR"
    },
    {
        "item_id": 530,
        "item_text": "BASTI"
    },
    {
        "item_id": 531,
        "item_text": "SANT KABIR NAGAR *"
    },
    {
        "item_id": 532,
        "item_text": "UNNAO"
    },
    {
        "item_id": 533,
        "item_text": "ETAWAH"
    },
    {
        "item_id": 534,
        "item_text": "KANPUR NAGAR"
    },
    {
        "item_id": 535,
        "item_text": "AURAIYA *"
    },
    {
        "item_id": 536,
        "item_text": "KANPUR DEHAT"
    },
    {
        "item_id": 537,
        "item_text": "FAIZABAD"
    },
    {
        "item_id": 538,
        "item_text": "AMBEDKAR NAGAR *"
    },
    {
        "item_id": 539,
        "item_text": "RAE BARELI"
    },
    {
        "item_id": 540,
        "item_text": "JALAUN"
    },
    {
        "item_id": 541,
        "item_text": "MAU"
    },
    {
        "item_id": 542,
        "item_text": "FATEHPUR"
    },
    {
        "item_id": 543,
        "item_text": "JAUNPUR"
    },
    {
        "item_id": 544,
        "item_text": "PRATAPGARH"
    },
    {
        "item_id": 545,
        "item_text": "HAMIRPUR"
    },
    {
        "item_id": 546,
        "item_text": "JHANSI"
    },
    {
        "item_id": 547,
        "item_text": "GHAZIPUR"
    },
    {
        "item_id": 548,
        "item_text": "BANDA"
    },
    {
        "item_id": 549,
        "item_text": "ALLAHABAD"
    },
    {
        "item_id": 550,
        "item_text": "CHANDAULI *"
    },
    {
        "item_id": 551,
        "item_text": "MAHOBA *"
    },
    {
        "item_id": 552,
        "item_text": "CHITRAKOOT *"
    },
    {
        "item_id": 553,
        "item_text": "VARANASI"
    },
    {
        "item_id": 554,
        "item_text": "SANT RAVIDAS NAGAR *"
    },
    {
        "item_id": 555,
        "item_text": "MIRZAPUR"
    },
    {
        "item_id": 556,
        "item_text": "LALITPUR"
    },
    {
        "item_id": 557,
        "item_text": "SONBHADRA"
    },
    {
        "item_id": 558,
        "item_text": "DEHRADUN"
    },
    {
        "item_id": 559,
        "item_text": "UTTARKASHI"
    },
    {
        "item_id": 560,
        "item_text": "CHAMOLI"
    },
    {
        "item_id": 561,
        "item_text": "RUDRAPRAYAG *"
    },
    {
        "item_id": 562,
        "item_text": "TEHRI GARHWAL"
    },
    {
        "item_id": 563,
        "item_text": "PITHORAGARH"
    },
    {
        "item_id": 564,
        "item_text": "BAGESHWAR"
    },
    {
        "item_id": 565,
        "item_text": "HARDWAR"
    },
    {
        "item_id": 566,
        "item_text": "GARHWAL"
    },
    {
        "item_id": 567,
        "item_text": "ALMORA"
    },
    {
        "item_id": 568,
        "item_text": "NAINITAL"
    },
    {
        "item_id": 569,
        "item_text": "CHAMPAWAT"
    },
    {
        "item_id": 570,
        "item_text": "UDHAM SINGH NAGAR *"
    },
    {
        "item_id": 571,
        "item_text": "KOLKATA"
    },
    {
        "item_id": 572,
        "item_text": "HAORA"
    },
    {
        "item_id": 573,
        "item_text": "MALDAH"
    },
    {
        "item_id": 574,
        "item_text": "NORTH 24 PARGANAS"
    },
    {
        "item_id": 575,
        "item_text": "HUGLI"
    },
    {
        "item_id": 576,
        "item_text": "KOCH BIHAR"
    },
    {
        "item_id": 577,
        "item_text": "MURSHIDABAD"
    },
    {
        "item_id": 578,
        "item_text": "DAKSHIN DINAJPUR *"
    },
    {
        "item_id": 579,
        "item_text": "JALPAIGURI"
    },
    {
        "item_id": 580,
        "item_text": "NADIA"
    },
    {
        "item_id": 581,
        "item_text": "DARJILING"
    },
    {
        "item_id": 582,
        "item_text": "UTTAR DINAJPUR"
    },
    {
        "item_id": 583,
        "item_text": "SOUTH 24 PARGANAS"
    },
    {
        "item_id": 584,
        "item_text": "PURBA MEDINAPUR"
    },
    {
        "item_id": 585,
        "item_text": "PASCHIM MEDINAPUR"
    },
    {
        "item_id": 586,
        "item_text": "BARDDHAMAN"
    },
    {
        "item_id": 587,
        "item_text": "PURULIYA"
    },
    {
        "item_id": 588,
        "item_text": "BANKURA"
    },
    {
        "item_id": 589,
        "item_text": "BIRBHUM"
    }
]



}
