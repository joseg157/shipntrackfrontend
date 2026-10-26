import type {
  PartyAddress,
  CreateGroundShipmentInput,
  ShipmentDetails,
} from './interfaces/groundShipment.types';

// const ActiveNavTab = {
//   DETAILS: 'details',
//   ITEMS: 'items',
//   BILLING: 'billing',
//   TRACKING: 'tracking',
// };

// const defaultNavTab = ActiveNavTab.DETAILS;

// const NavTabLabels = {
//   [ActiveNavTab.DETAILS]: 'Details',
//   [ActiveNavTab.ITEMS]: 'Items',
//   [ActiveNavTab.BILLING]: 'Billing',
//   [ActiveNavTab.TRACKING]: 'Tracking',
// };

export const REFERENCE_PARTIES = ['shipper', 'consignee', 'billTo'] as const;

export const REFERENCE_PARTY_LABELS: Record<(typeof REFERENCE_PARTIES)[number], string> = {
  shipper: 'Shipper',
  consignee: 'Consignee',
  billTo: 'Bill To',
};

export const ADDRESS_TEMPLATE: PartyAddress = {
  name: '',
  address: '',
  address2: '',
  city: '',
  state: null,
  postalCode: '',
  country: 'US',
  contactName: '',
  email: '',
  phone: '',
};

// Placeholder until service levels are loaded from the API.
export const SERVICE_LEVELS = [
  { value: 'STANDARD_GROUND', label: 'Standard Ground' },
  { value: 'EXPEDITED_GROUND', label: 'Expedited Ground' },
  { value: 'GUARANTEED_GROUND', label: 'Guaranteed Ground' },
  { value: 'ECONOMY_GROUND', label: 'Economy Ground' },
  { value: 'SAME_DAY', label: 'Same Day' },
  { value: 'LTL', label: 'LTL' },
  { value: 'FTL', label: 'FTL' },
  { value: 'INTERMODAL', label: 'Intermodal' },
];

export const SIGNATURE_TYPES = [
  { value: 'DIRECT', label: 'Direct' },
  { value: 'INDIRECT', label: 'Indirect' },
  { value: 'ADULT', label: 'Adult' },
] as const;

export const SHIPMENT_DETAILS_DEFAULTS: ShipmentDetails = {
  serviceLevel: '',
  shipmentDate: null,
  readyTime: '',
  closeTime: '',
  totalWeight: 0,
  weightUnit: 'LBS',
  totalPieces: 0,
  totalPackages: 0,
  palletCount: 0,
  isHazardous: false,
  isTemperatureControlled: false,
  declaredValue: 0,
  isSignatureRequired: false,
  appointmentRequired: false,
  liftgateRequired: false,
  insideDelivery: false,
};

export const GROUND_SHIPMENT_DEFAULTS: CreateGroundShipmentInput = {
  accountNumber: '',
  shipper: ADDRESS_TEMPLATE,
  consignee: ADDRESS_TEMPLATE,
  billTo: ADDRESS_TEMPLATE,
  useAccountInfoForBilling: true,
  shipmentDetails: SHIPMENT_DETAILS_DEFAULTS,

  references: [],
  packages: [],
  specialInstructions: '',
};
