export interface IndiaDistrictModel {
    objectid: number
    st_code: number
    st_name: string
    dt_code: number
    dist_name: string
    ac_no: number
    ac_name: string
    pc_no: number
    pc_name: string
    pc_id: number
    status: any
    shape_leng: number
    shape_area: number
  }

  export interface IndiaPinCodeModel {
    objectid: number
    id: string
    pin_code: string
    office_name: string
    office_type: string
    circle_name: string
    region_name: string
    division_name: string
    state: string
    district: string
    country: string
    latitude: number
    longitude: number
    st_areashape: number
    st_lengthshape: number
  }