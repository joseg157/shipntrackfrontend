import type { IState } from '@interfaces/common.types';
import { REFERENCE_PARTIES } from '../constants';
import moment from 'moment';

// ============================================
// PARTY (Shipper/Consignee/BillTo)
// ============================================
export interface PartyAddress {
  accountNumber?: string; // Optional, it will grab the address associated with this account if not provided explicitly
  name: string;
  address: string;
  storeNumber?: string; // Optional store number associated with the address
  address2?: string;
  city: string;
  state: IState | null; // In reality this would be string but we will convert it to IState object if received from the backend as a string
  postalCode: string;
  country: string;
  contactName?: string;
  email?: string;
  phone?: string;
}

// ============================================
// SHIPMENT DETAILS
// ============================================

export interface ShipmentDetails {
  serviceLevel: string | null; // Will use API grabbed service levels
  shipmentDate: moment.Moment | null;
  readyTime?: string; // HH:mm
  closeTime?: string; // HH:mm
  totalWeight: number;
  weightUnit: 'LBS' | 'KG';
  totalPieces: number;
  totalPackages: number;
  palletCount?: number;
  isHazardous?: boolean;
  isTemperatureControlled?: boolean;
  declaredValue?: number;
  declaredValueCurrency?: string;
  isSignatureRequired?: boolean;
  signatureType?: 'ADULT' | 'DIRECT' | 'INDIRECT';
  appointmentRequired?: boolean;
  liftgateRequired?: boolean;
  insideDelivery?: boolean;
}

// ============================================
// PACKAGES
// ============================================

export interface PackageDetail {
  id: number; // Unique identifier for the package
  type: string; // Will use API grabbed package types
  quantity: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  declaredValue: number;
  description?: string;
}

// ============================================
// REFERENCES
// ============================================

export interface Reference {
  id: number; // Unique identifier for the reference
  type: string;
  value: string;
  party: (typeof REFERENCE_PARTIES)[number];
}

/**
 * Base Entity for Ground Shipment (DB)
 */
export interface GroundShipment {
  id: number;
  trackingNumber: string;

  // Account #
  accountNumber: string;

  // Shipper Information
  shipper: PartyAddress;

  // Consignee Information
  consignee: PartyAddress;

  // Bill To Information
  useAccountInfoForBilling?: boolean; // Indicates whether to use account information for billing if billTo is not provided explicitly
  billTo: PartyAddress;

  // Shipment Details
  shipmentDetails: ShipmentDetails;

  // Packages
  packages: PackageDetail[];

  // References
  references: Reference[];

  specialInstructions?: string;

  // Audit fields
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastModifiedBy: string;
}

/**
 *  Fields excluded from the form data that are not collected from the user including array containing id such as references
 */
type ExcludedFieldsOnFormData =
  | 'id'
  | 'trackingNumber'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'lastModifiedBy';

/**
 * Form data type (what the form collects from the user)
 */
export interface GroundShipmentFormData extends Omit<GroundShipment, ExcludedFieldsOnFormData> {}

/**
 * Input type for creating a new ground shipment
 */

export type NewReference = Omit<Reference, 'id'>;
export type NewPackageDetail = Omit<PackageDetail, 'id'>;

export interface CreateGroundShipmentInput extends Omit<
  GroundShipmentFormData,
  'references' | 'packages' | 'billTo'
> {
  billTo: Partial<PartyAddress>; // Partial why? By default, the billTo will use 'account' information if not provided explicitly. Otherwise, the user can provide specific billing details.
  references: NewReference[];
  packages: NewPackageDetail[];
}

/**
 * Input type for updating an existing ground shipment
 */

export interface UpdateGroundShipmentInput extends Omit<
  GroundShipmentFormData,
  'references' | 'packages'
> {
  id: number;
  references: Array<NewReference | Reference>;
  packages: Array<NewPackageDetail | PackageDetail>;
}

// export type ActiveNavTab = 'details' | 'items' | 'billing' | 'tracking';

/**
 * type PaymentType = 'PREPAID' | 'COLLECT' | 'THIRD_PARTY' | 'BILL_RECIPIENT' | 'BILL_SENDER' | 'COD';
 *
 * type ShipmentStatus =
  | 'DRAFT'
  | 'QUOTED'
  | 'BOOKED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'CANCELLED'
  | 'RETURNED';

  interface PaymentDetails {
  paymentType: PaymentType;
  // billingAccount?: string;
  // billingReference?: string;
  // freightCharges?: FreightCharges;
  // currency: string;
  // insuranceRequested?: boolean;
  // insuranceValue?: number;
  // codAmount?: number;
  // codCurrency?: string;
  // deliveryConfirmation?: boolean;
  // saturdayDelivery?: boolean;
  // insidePickup?: boolean;
}

interface _FreightCharges {
  baseRate?: number;
  fuelSurcharge?: number;
  accessorialCharges?: AccessorialCharge[];
  discount?: number;
  tax?: number;
  total?: number;
}

interface AccessorialCharge {
  code: string;
  description: string;
  amount: number;
}

// ============================================
// TRACKING
// ============================================
interface TrackingInfo {
  trackingNumber?: string;
  proNumber?: string; // Progressive number (carrier)
  bolNumber?: string; // Bill of Lading
  carrier?: string;
  carrierService?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  trackingEvents?: TrackingEvent[];
  trackingUrl?: string;
}

interface TrackingEvent {
  timestamp: Date;
  status: ShipmentStatus;
  location: string;
  description: string;
  signedBy?: string;
}
 */
