// Controlled vocabulary for shipment reference types.
export const REFERENCE_PARTIES = ['shipper', 'consignee', 'billTo'] as const;

export const REFERENCE_PARTY_LABELS: Record<(typeof REFERENCE_PARTIES)[number], string> = {
  shipper: 'Shipper',
  consignee: 'Consignee',
  billTo: 'Bill To',
};

// export const REFERENCE_TYPE_LABELS = {
//   PO: 'PO',
//   ORDER: 'Order',
//   INVOICE: 'Invoice',
//   CUST_REF: 'Cust Ref',
//   BOL: 'BOL',
//   PRO: 'PRO',
//   DEPT: 'Department',
//   JOB: 'Job',
//   STORE: 'Store #',
// } as const;

// export type ReferenceType = keyof typeof REFERENCE_TYPE_LABELS;

// // Reference types allowed per party.
// export const ALLOWED_REFERENCE_TYPES: Record<
//   (typeof REFERENCE_PARTIES)[number],
//   readonly ReferenceType[]
// > = {
//   shipper: ['PO', 'BOL', 'CUST_REF', 'STORE'],
//   consignee: ['PO', 'DEPT', 'CUST_REF', 'STORE'],
//   billTo: ['INVOICE', 'PO', 'CUST_REF', 'STORE'],
// };
