export interface Generator {
  'Generator file sequence number': string;
  'Data Year': string;
  'Plant state abbreviation': string;
  'Plant name': string;
  'DOE/EIA ORIS plant or facility code': string;
  'Generator ID': string;
  'Number of associated boilers': string;
  'Generator status': string;
  'Generator prime mover type': string;
  'Generator primary fuel': string;
  'Generator nameplate capacity (MW)': string;
  'Generator capacity factor': string;
  'Generator annual net generation (MWh)': string;
  'Generator ozone season net generation (MWh)': string;
  'Generation data source': string;
  'Generator year on-line': string;
  'Generator planned or actual retirement year': string;
  Percentage: string;
  Position?: google.maps.LatLngLiteral;
}
