import { Component, OnInit, SimpleChange, ViewChild,HostListener } from '@angular/core';
import { GeojsonService } from '../geojson.service';
import * as turf from "@turf/turf";
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { MaphelperService } from 'src/app/common-module/maphelper.service';
import { DownloadGeojsonDataComponent } from '../download-geojson-data/download-geojson-data.component';
import { MatDialog } from '@angular/material/dialog';
// import {CircleMode } from 'mapbox-gl-draw-circle';
// import {DirectMode,SimpleSelectMode,CircleMode,DragCircleMode} from 'mapbox-gl-draw-circle';
// import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';

@Component({
  selector: 'app-draw-map',
  templateUrl: './draw-map.component.html',
  styleUrls: ['./draw-map.component.css']
})

export class DrawMapComponent implements OnInit {


  color = "#0080ff";
  strokeColor = "#00000";
  draw;
  map: any;
  searchGeo: string = ''
  ShowSearchBox = false
  IsGeoLocationList = false
  GeoLocationListData: any;
  GlobalGeometry = []
  boudingCoordinates = [];
  FeatureData: any
  TehsilProperties = []

  mobileView
  ViewLinkedInPro:any = false


  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav


  screenWidth
  toogleMobileDrop =true


  @HostListener('window:resize', ['$event'])  
  onResize(event) {  
    this.screenWidth = window.innerWidth;  
  }

  constructor(private GeoService: GeojsonService, private mapHelperService: MaphelperService,
    private MatDialog: MatDialog) { 
     this.screenWidth =  window.innerWidth
    }


    

  ngOnInit(): void {
    console.log(this.GlobalGeometry)
    this.mapHelperService.FeatureModalSideNave.subscribe(result => {
      if (result) {
        this.FeatureData = result;
        this.sidenav.open()
        this.EditTehsilMode = false
        
        setTimeout(() => {
          this.gotoscorlled(result.ac_name)
        })

      }
    })

  }

  DrawEmit(event) {
    this.draw = event
  }

  RecivedMap(event) {
    this.map = event
  }

  DrawOnMap(drawing) {

    if (drawing === "reactangle") {
      this.draw.changeMode('draw_rectangle')
    }
  }

  addInput() {
    this.GeoService.GetLocationData(this.searchGeo).subscribe(data => {
      if (data.features.length > 0) {
        this.IsGeoLocationList = true
        this.GeoLocationListData = data.features
      }
    })

  }

  gotoscorlled(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
    // this.OneTimeScrolled =false;
  }

  // OnClickLocation(display_name) {
  //   let searachData = this.searchGeo.toLowerCase()
  //   let serachResult = display_name.properties.display_name.toLowerCase()
  //   this.IsGeoLocationList = false;
  //   this.GlobalGeometry = []
  //   this.boudingCoordinates = []

  //   if (serachResult.includes(searachData)) {
  //     this.TehsilProperties = []


  //     this.GeoService.getGeoJsonBoundries.features.forEach(val => {
  //       if (val.properties.dist_name) {

  //         if (val.properties.dist_name.toLowerCase() === searachData) {
  //           console.log(val.geometry)
  //           // this.GlobalGeometry.push(val.geometry.coordinates[0])
  //           this.boudingCoordinates.push(val.geometry.coordinates[0])

  //           val.properties['color'] = "#0080ff"
  //           let create_geojson = {
  //             "type": "Feature",
  //             "properties":val.properties,
  //             "geometry": {
  //               "type": "Polygon",
  //               "coordinates":val.geometry.coordinates[0] 
  //             }
  //           }
  //           // this.TehsilProperties.push({
  //           //   'coordinates':val.geometry.coordinates[0],
  //           //   'properties':val.properties
  //           // })

  //           this.GlobalGeometry.push(create_geojson)
  //         }

  //       }
  //     })

  //     if (this.GlobalGeometry.length > 0) {
  //       this.RemoveLayerSource(this.map)
  //       this.AddLayerSource(this.map)
  //       this.sidenav.open()

  //     }else{
  //       console.log("Data does not found")
  //     }

  //   }

  // }

  OnClickLocation(display_name) {

    this.GlobalGeometry = []
    this.boudingCoordinates = []
    this.TehsilProperties = []

    this.GeoService.getGeoJsonBoundries.features.forEach(val => {
      if (val.properties.dist_name) {

        if (val.properties.dist_name === display_name) {
          console.log(val.geometry)
          this.boudingCoordinates.push(val.geometry.coordinates[0])

          val.properties['color'] = "#0080ff"
          let create_geojson = {
            "type": "Feature",
            "properties": val.properties,
            "geometry": {
              "type": "Polygon",
              "coordinates": val.geometry.coordinates[0]
            }
          }
          this.GlobalGeometry.push(create_geojson)
        }

      }
    })

    this.CloseCityNav()
    if (this.GlobalGeometry.length > 0) {
      this.RemoveLayerSource(this.map)
      this.AddLayerSource(this.map)
      this.sidenav.open()

    } else {
      console.log("Data does not found")
    }
  }


  RemoveLayerSource(map) {
    this.mapHelperService.RemoveLayerFormMap(map)
  }

  AddLayerSource(map) {
    console.log(this.GlobalGeometry)
    this.map = this.mapHelperService.AddLayerOnMap(map, this.GlobalGeometry, this.boudingCoordinates)
    this.sidenav.close()
  }


  // Right SideNave
  selectedCountry = 'India'
  OnSelectedCountry(event) {
    console.log(event)
  }

  StateList = [
    "ANDHRA PRADESH",
    "ARUNACHAL PRADESH",
    "ASSAM",
    "BIHAR",
    "CHHATTISGARH",
    "DELHI",
    "GOA",
    "GUJARAT",
    "HARYANA",
    "HIMACHAL PRADESH",
    "JAMMU & KASHMIR",
    "JHARKHAND",
    "KARNATAKA",
    "KERALA",
    "MADHYA PRADESH",
    "MAHARASHTRA",
    "MANIPUR",
    "MEGHALAYA",
    "MIZORAM",
    "NAGALAND",
    "ORISSA",
    "PUDUCHERRY",
    "PUNJAB",
    "RAJASTHAN",
    "SIKKIM",
    "TAMIL NADU",
    "TRIPURA",
    "UTTAR PRADESH",
    "UTTARKHAND",
    "WEST BENGAL"
  ]

  StateAndDistrictData = [
    {
      "state": "ANDHRA PRADESH",
      "city": [
        "WEST GODAVARI",
        "GUNTUR",
        "ADILABAD",
        "SRIKAKULAM",
        "KARIMNAGAR",
        "VIZIANAGARAM",
        "NIZAMABAD",
        "CUDDAPAH",
        "KHAMMAM",
        "WARANGAL",
        "VISAKHAPATNAM",
        "NALGONDA",
        "EAST GODAVARI",
        "MEDAK",
        "MAHBUBNAGAR",
        "RANGAREDDI",
        "HYDERABAD",
        "KRISHNA",
        "PRAKASAM",
        "KURNOOL",
        "ANANTAPUR",
        "NELLORE",
        "CHITTOOR"
      ]
    },
    {
      "state": "ARUNACHAL PRADESH",
      "city": [
        "UPPER SIANG *",
        "EAST SIANG",
        "DIBANG VALLEY",
        "WEST SIANG",
        "LOWER DIBANG VALLEY",
        "UPPER SUBANSIRI",
        "ANJAW",
        "TIRAP",
        "LOHIT",
        "KURUNG KUMEY",
        "PAPUM PARE *",
        "LOWER SUBANSIRI",
        "CHANGLANG",
        "EAST KAMENG",
        "TAWANG",
        "WEST KAMENG"
      ]
    },
    {
      "state": "ASSAM",
      "city": [
        "JORHAT",
        "TINSUKIA",
        "DHEMAJI",
        "DIBRUGARH",
        "BONGAIGAON",
        "SONITPUR",
        "LAKHIMPUR",
        "SIBSAGAR",
        "GOLAGHAT",
        "DARRANG",
        "NALBARI",
        "KOKRAJHAR",
        "NAGAON",
        "KAMRUP",
        "BARPETA",
        "KARBI ANGLONG",
        "MARIGAON",
        "GOALPARA",
        "DHUBRI",
        "CACHAR",
        "NORTH CACHAR HILLS",
        "KARIMGANJ",
        "HAILAKANDI"
      ]
    },
    {
      "state": "BIHAR",
      "city": [
        "PATNA",
        "PASHCHIM CHAMPARAN",
        "PURBA CHAMPARAN",
        "BUXAR *",
        "SITAMARHI",
        "MADHUBANI",
        "VAISHALI",
        "SHEOHAR *",
        "KISHANGANJ",
        "ARARIA",
        "GOPALGANJ",
        "SUPAUL *",
        "DARBHANGA",
        "MUZAFFARPUR",
        "SIWAN",
        "SARAN",
        "MADHEPURA",
        "PURNIA",
        "SAHARSA",
        "SAMASTIPUR",
        "KATIHAR",
        "BEGUSARAI",
        "KHAGARIA",
        "BHOJPUR",
        "BHAGALPUR",
        "MUNGER",
        "NALANDA",
        "KAIMUR (BHABUA) *",
        "LAKHISARAI *",
        "ROHTAS",
        "JEHANABAD",
        "SHEIKHPURA *",
        "JAMUI *",
        "BANKA *",
        "AURANGABAD",
        "GAYA",
        "NAWADA"
      ]
    },
    {
      "state": "CHHATTISGARH",
      "city": [
        "DURG",
        "SURGUJA",
        "KORIYA *",
        "JASHPUR *",
        "BILASPUR",
        "KORBA *",
        "RAIGARH",
        "KAWARDHA *",
        "JANJGIR - CHAMPA*",
        "RAIPUR",
        "RAJNANDGAON",
        "MAHASAMUND *",
        "DHAMTARI *",
        "KANKER *",
        "BASTER",
        "DANTEWADA*"
      ]
    },
    {
      "state": "DELHI",
      "city": [
        null
      ]
    },
    {
      "state": "GOA",
      "city": [
        "NORTH GOA",
        "SOUTH GOA"
      ]
    },
    {
      "state": "GUJARAT",
      "city": [
        "KACHCHH",
        "BANAS KANTHA",
        "DOHAD  *",
        "SABAR KANTHA",
        "PATAN  *",
        "MAHESANA",
        "AHMADABAD",
        "SURENDRANAGAR",
        "GANDHINAGAR",
        "PANCH MAHALS",
        "RAJKOT",
        "KHEDA",
        "JAMNAGAR",
        "ANAND  *",
        "VADODARA",
        "BHAVNAGAR",
        "JUNAGADH",
        "BHARUCH",
        "PORBANDAR  *",
        "SURAT",
        "AMRELI",
        "NARMADA  *",
        "NAVSARI  *",
        "THE DANGS",
        "VALSAD"
      ]
    },
    {
      "state": "HARYANA",
      "city": [
        "SONIPAT",
        "YAMUNANAGAR",
        "KURUKSHETRA",
        "PANCHKULA *",
        "AMBALA",
        "PANIPAT",
        "KAITHAL",
        "SIRSA",
        "KARNAL",
        "JIND",
        "FATEHABAD *",
        "HISAR",
        "ROHTAK",
        "BHIWANI",
        "JHAJJAR *",
        "GURGAON",
        "FARIDABAD",
        "MAHENDRAGARH",
        "REWARI"
      ]
    },
    {
      "state": "HIMACHAL PRADESH",
      "city": [
        "KANGRA",
        "MANDI",
        "HAMIRPUR",
        "LAHUL & SPITI",
        "CHAMBA",
        "KULLU",
        "KINNAUR",
        "UNA",
        "SHIMLA",
        "BILASPUR",
        "SOLAN",
        "SIRMAUR"
      ]
    },
    {
      "state": "JAMMU & KASHMIR",
      "city": [
        "SRINAGAR",
        "BADGAM",
        null,
        "KUPWARA",
        "LEH(LADAKH)",
        "BARAMULA",
        "KARGIL",
        "ANANTNAG",
        "DODA",
        "PULWAMA",
        "PUNCH",
        "JAMMU",
        "RAJAURI",
        "UDHAMPUR",
        "KATHUA"
      ]
    },
    {
      "state": "JHARKHAND",
      "city": [
        "PAKAUR",
        "JAMTARA",
        "BOKARO",
        "SAHIBGANJ",
        "GODDA",
        "KODARMA",
        "GIRIDIH",
        "DUMKA",
        "DEOGHAR",
        "PALAMU",
        "HAZARIBAG",
        "CHATRA",
        "GARHWA",
        "PURBI SINGHBHUM",
        "RANCHI",
        "DHANBAD",
        "LATEHAR",
        "GUMLA",
        "LOHARDAGA",
        "SARAIKELA",
        "PACHIM SINGHBHUM",
        "SIMDEGA"
      ]
    },
    {
      "state": "KARNATAKA",
      "city": [
        "DAKSHINA KANNADA",
        "BANGALORE",
        "BAGALKOT *",
        "BIDAR",
        "BIJAPUR",
        "GULBARGA",
        "BELGAUM",
        "RAICHUR",
        "KOPPAL *",
        "GADAG *",
        "DHARWAD",
        "BELLARY",
        "UTTARA KANNADA",
        "HAVERI *",
        "DAVANGERE*",
        "CHITRADURGA",
        "SHIMOGA",
        "TUMKUR",
        "UDUPI *",
        "CHIKMAGALUR",
        "KOLAR",
        "HASSAN",
        "BANGALORE RURAL",
        "MANDYA",
        "KODAGU",
        "MYSORE",
        "CHAMRAJNAGAR*"
      ]
    },
    {
      "state": "KERALA",
      "city": [
        "KOZHIKODE",
        "KASARAGOD",
        "KANNUR",
        "WAYANAD",
        "MALAPPURAM",
        "PALAKKAD",
        "THRISSUR",
        "THIRUVANANTHAPURAM",
        "IDUKKI",
        "ERNAKULAM",
        "ALAPPUZHA",
        "KOTTAYAM",
        "PATHANAMTHITTA",
        "KOLLAM"
      ]
    },
    {
      "state": "MADHYA PRADESH",
      "city": [
        "MORENA",
        "BHIND",
        "TIKAMGARH",
        "GWALIOR",
        "SHEOPUR *",
        "DATIA",
        "NEEMUCH *",
        "SATNA",
        "SHIVPURI",
        "REWA",
        "CHHATARPUR",
        "GUNA",
        "PANNA",
        "ASHOK NAGAR",
        "MANDSAUR",
        "SIDHI",
        "RAJGARH",
        "SAGAR",
        "DAMOH",
        "SHAJAPUR",
        "VIDISHA",
        "SHAHDOL",
        "KATNI *",
        "UMARIA *",
        "RATLAM",
        "BHOPAL",
        "UJJAIN",
        "RAISEN",
        "SEHORE",
        "ANUPPUR",
        "JABALPUR",
        "DEWAS",
        "JHABUA",
        "NARSIMHAPUR",
        "DHAR",
        "INDORE",
        "DINDORI *",
        "HOSHANGABAD",
        "SEONI",
        "MANDLA",
        "CHHINDWARA",
        "HARDA *",
        "WEST NIMAR",
        "EAST NIMAR",
        "BETUL",
        "BALAGHAT",
        "BARWANI *",
        "BURHANPUR"
      ]
    },
    {
      "state": "MAHARASHTRA",
      "city": [
        "MUMBAI (SUBURBAN) *",
        "JALGAON",
        "NAGPUR",
        "PUNE",
        "CHANDRAPUR",
        "THANE",
        "SOLAPUR",
        "NANDURBAR *",
        "AMRAVATI",
        "DHULE",
        "GONDIYA *",
        "BHANDARA",
        "WARDHA",
        "BULDANA",
        "AKOLA",
        "NASHIK",
        "GADCHIROLI",
        "AURANGABAD",
        "WASHIM *",
        "JALNA",
        "YAVATMAL",
        "AHMADNAGAR",
        "HINGOLI *",
        "NANDED",
        "PARBHANI",
        "RAIGARH",
        "BID",
        "MUMBAI",
        "LATUR",
        "OSMANABAD",
        "SANGLI",
        "SATARA",
        "RATNAGIRI",
        "KOLHAPUR",
        "SINDHUDURG"
      ]
    },
    {
      "state": "MANIPUR",
      "city": [
        "SENAPATI",
        "IMPHAL WEST",
        "IMPHAL EAST *",
        "BISHNUPUR",
        "THOUBAL",
        "CHURACHANDPUR",
        "CHANDEL",
        "UKHRUL",
        "TAMENGLONG"
      ]
    },
    {
      "state": "MEGHALAYA",
      "city": [
        "EAST KHASI HILLS",
        "WEST GARO HILLS",
        "SOUTH GARO HILLS *",
        "JAINTIA HILLS",
        "EAST GARO HILLS",
        "WEST KHASI HILLS",
        "RI BHOI  *"
      ]
    },
    {
      "state": "MIZORAM",
      "city": [
        "AIZAWL",
        "CHAMPHAI *",
        "LUNGLEI",
        "KOLASIB *",
        "MAMIT *",
        "SERCHHIP *",
        "LAWNGTLAI",
        "SAIHA *"
      ]
    },
    {
      "state": "NAGALAND",
      "city": [
        "MON",
        "TUENSANG",
        "MOKOKCHUNG",
        "ZUNHEBOTO",
        "WOKHA",
        "KOHIMA",
        "PHEK",
        "DIMAPUR *"
      ]
    },
    {
      "state": "ORISSA",
      "city": [
        "KHORDHA  *",
        "SUNDARGARH",
        "MAYURBHANJ",
        "BALESHWAR",
        "SAMBALPUR",
        "JHARSUGUDA  *",
        "KENDUJHAR",
        "DEBAGARH  *",
        "JAJAPUR  *",
        "BARGARH  *",
        "ANUGUL  *",
        "BHADRAK  *",
        "DHENKANAL",
        "SONAPUR  *",
        "NUAPADA  *",
        "CUTTACK",
        "BALANGIR",
        "BAUDH  *",
        "KENDRAPARA *",
        "KANDHAMAL",
        "JAGATSINGHAPUR  *",
        "NAYAGARH  *",
        "KALAHANDI",
        "PURI",
        "GANJAM",
        "NABARANGAPUR  *",
        "RAYAGADA  *",
        "GAJAPATI  *",
        "KORAPUT",
        "MALKANGIRI  *"
      ]
    },
    {
      "state": "PUDUCHERRY",
      "city": [
        "PONDICHERRY",
        "MAHE",
        "KARAIKAL",
        "YANAM"
      ]
    },
    {
      "state": "PUNJAB",
      "city": [
        "AMRITSAR",
        "JALANDHAR",
        "RUPNAGAR",
        "SANGRUR",
        "NAWANSHAHR *",
        "GURDASPUR",
        "HOSHIARPUR",
        "KAPURTHALA",
        "FIROZPUR",
        "MOGA *",
        "LUDHIANA",
        "FARIDKOT",
        "FATEHGARH SAHIB *",
        "MUKTSAR *",
        "PATIALA",
        "BATHINDA",
        "MANSA *"
      ]
    },
    {
      "state": "RAJASTHAN",
      "city": [
        "GANGANAGAR",
        "HANUMANGARH *",
        "CHURU",
        "BIKANER",
        "JHUNJHUNUN",
        "JAISALMER",
        "SIKAR",
        "ALWAR",
        "JAIPUR",
        "JODHPUR",
        "BHARATPUR",
        "NAGAUR",
        "DAUSA *",
        "AJMER",
        "BANSWARA",
        "KARAULI *",
        "DHAULPUR",
        "BARMER",
        "SAWAI MADHOPUR",
        "TONK",
        "PALI",
        "JALOR",
        "BHILWARA",
        "RAJSAMAND *",
        "BUNDI",
        "KOTA",
        "SIROHI",
        "BARAN *",
        "CHITTAURGARH",
        "UDAIPUR",
        "JHALAWAR",
        "DUNGARPUR"
      ]
    },
    {
      "state": "SIKKIM",
      "city": [
        "SOUTH",
        "EAST",
        "WEST",
        "NORTH"
      ]
    },
    {
      "state": "TAMIL NADU",
      "city": [
        "THIRUVALLUR",
        "CHENNAI",
        "VELLORE",
        "KANCHEEPURAM",
        "KRISHNAGIRI",
        "TIRUVANNAMALAI",
        "SALEM",
        "NAGAPATTINAM  *",
        "DHARMAPURI",
        "VILUPPURAM",
        "THE NILGIRIS",
        "ERODE",
        "CUDDALORE",
        "NAMAKKAL   *",
        "KARUR  *",
        "PERAMBALUR",
        "COIMBATORE",
        "TIRUCHIRAPPALLI",
        "THANJAVUR",
        "DINDIGUL",
        "THIRUVARUR",
        "PUDUKKOTTAI",
        "MADURAI",
        "VIRUDHUNAGAR",
        "SIVAGANGA",
        "THENI  *",
        "RAMANATHAPURAM",
        "TIRUNELVELI",
        "THOOTHUKKUDI",
        "KANNIYAKUMARI"
      ]
    },
    {
      "state": "TRIPURA",
      "city": [
        "SOUTH TRIPURA",
        "NORTH TRIPURA",
        "WEST TRIPURA",
        "DHALAI  *"
      ]
    },
    {
      "state": "UTTAR PRADESH",
      "city": [
        "GAUTAM BUDDHA NAGAR *",
        "MUZAFFARNAGAR",
        "KAUSHAMBI *",
        "SAHARANPUR",
        "BIJNOR",
        "BAGHPAT *",
        "MEERUT",
        "MORADABAD",
        "RAMPUR",
        "JYOTIBA PHULE NAGAR *",
        "GHAZIABAD",
        "BAREILLY",
        "PILIBHIT",
        "BULANDSHAHR",
        "KHERI",
        "BUDAUN",
        "SHAHJAHANPUR",
        "BAHRAICH",
        "ALIGARH",
        "ETAH",
        "MATHURA",
        "SHRAWASTI *",
        "SITAPUR",
        "KUSHINAGAR *",
        "HATHRAS *",
        "BALRAMPUR *",
        "AZAMGARH",
        "HARDOI",
        "DEORIA",
        "FARRUKHABAD",
        "BALLIA",
        "FIROZABAD",
        "SIDDHARTHNAGAR",
        "MAINPURI",
        "MAHARAJGANJ",
        "AGRA",
        "GONDA",
        "SULTANPUR",
        "BARABANKI",
        "KANNAUJ *",
        "LUCKNOW",
        "GORAKHPUR",
        "BASTI",
        "SANT KABIR NAGAR *",
        "UNNAO",
        "ETAWAH",
        "KANPUR NAGAR",
        "AURAIYA *",
        "KANPUR DEHAT",
        "FAIZABAD",
        "AMBEDKAR NAGAR *",
        "RAE BARELI",
        "JALAUN",
        "MAU",
        "FATEHPUR",
        "JAUNPUR",
        "PRATAPGARH",
        "HAMIRPUR",
        "JHANSI",
        "GHAZIPUR",
        "BANDA",
        "ALLAHABAD",
        "CHANDAULI *",
        "MAHOBA *",
        "CHITRAKOOT *",
        "VARANASI",
        "SANT RAVIDAS NAGAR *",
        "MIRZAPUR",
        "LALITPUR",
        "SONBHADRA"
      ]
    },
    {
      "state": "UTTARKHAND",
      "city": [
        "DEHRADUN",
        "UTTARKASHI",
        "CHAMOLI",
        "RUDRAPRAYAG *",
        "TEHRI GARHWAL",
        "PITHORAGARH",
        "BAGESHWAR",
        "HARDWAR",
        "GARHWAL",
        "ALMORA",
        "NAINITAL",
        "CHAMPAWAT",
        "UDHAM SINGH NAGAR *"
      ]
    },
    {
      "state": "WEST BENGAL",
      "city": [
        "KOLKATA",
        "HAORA",
        "MALDAH",
        "NORTH 24 PARGANAS",
        "HUGLI",
        "KOCH BIHAR",
        "MURSHIDABAD",
        "DAKSHIN DINAJPUR *",
        "JALPAIGURI",
        "NADIA",
        "DARJILING",
        "UTTAR DINAJPUR",
        "SOUTH 24 PARGANAS",
        "PURBA MEDINAPUR",
        "PASCHIM MEDINAPUR",
        "BARDDHAMAN",
        "PURULIYA",
        "BANKURA",
        "BIRBHUM"
      ]
    }
  ]

  filteredList1 = this.StateAndDistrictData
  filteredList2

  SelectedDistrictData
  IsHideDistrictTable = true
  StateValue:any
  StateSelection(event: any) {
    console.log(event)
    this.SelectedDistrictData = event.value.city
    this.filteredList2 = this.SelectedDistrictData
    this.StateValue = event.value;
    this.IsHideDistrictTable = false
    // this.CloseCityNav()
    this.sidenav.close()
  }

  DistrictValue:any
  DistrictSelection(event: any) {
    this.toogleMobileDrop=false
    this.DistrictValue = event.value;
    this.OnClickLocation(event.value) 
  }

  //End Right SideNave


  
  //District Side Nave 
    ViewTehshil(data) {
      console.log(data)
      //Zoom to
      var bbox = turf.bbox({
        'type': 'Feature',
        'geometry': {
          'type': 'MultiPolygon',
          'coordinates': [data]
        }
      });
      this.map.fitBounds(bbox, { padding: 20 });

    }

  EditTehsilMode = false
  EditedTehsilValue
  EditedTehsilKey
  TehsilColor = ""
  index
  ReadMode = true
  EditTehsil(data, index) {
    this.index = index
    this.EditedTehsilValue = data
    this.EditedTehsilKey =   Object.keys(data)
    this.TehsilColor = data.color
    this.EditTehsilMode = !this.EditTehsilMode
  } 

  SaveTehsilInfo() {

    this.GlobalGeometry[this.index].properties.color = this.TehsilColor
    this.mapHelperService.RemoveLayerFormMap(this.map)
    this.mapHelperService.AddLayerOnMap(this.map, this.GlobalGeometry, this.boudingCoordinates)
    this.EditTehsilMode = false

  }

  ToggleTeshilInfo() {
    this.EditTehsilMode = false
  }

  CloseCityNav() {
    this.sidenav.toggle()
    this.mapHelperService.RemoveHighlightedLayer(this.map)
    this.DistrictMode = "view_disctrict_data"
    this.EditTehsilMode = false
  }

  ZoomToDistrict() {
    var bbox = turf.bbox({
      'type': 'Feature',
      'geometry': {
        'type': 'MultiPolygon',
        'coordinates': this.boudingCoordinates
      }
    })
    this.map.fitBounds(bbox, { padding: 20 });

  }

  OnDownloadDistrictData(fileName, district_geojson) {
    this.MatDialog.open(DownloadGeojsonDataComponent, {
      width: '300px',
      data: { 'fileName': fileName, "district_geojson": district_geojson, "download_type": "district_data", }
    })
  }



  DistrictMode = "view_disctrict_data"
  // CopyGlobalGeometry = this.GlobalGeometry
  CopyGlobalGeometry
  //"edit_district_list", "view_disctrict_data"
  EditDistrictData(value, data) {
    this.DistrictMode = value
    console.log(value)
    // this.CopyGlobalGeometry =  JSON.stringify(JSON.parse(this.GlobalGeometry)) 
    this.CopyGlobalGeometry = JSON.parse(JSON.stringify(this.GlobalGeometry))
  }

  SaveDistrictLevelData() {
    this.GlobalGeometry = this.CopyGlobalGeometry
    this.DistrictMode = "view_disctrict_data"

    this.mapHelperService.RemoveLayerFormMap(this.map)
    this.mapHelperService.AddLayerOnMap(this.map, this.GlobalGeometry, this.boudingCoordinates)

  }

  UpdateValue
  OnChangeTeshilName(event, index) {

  }


  //End District Side Nave


  OnScrollTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'auto' for instant scroll, 'smooth' for smooth scroll
    });
  }





}