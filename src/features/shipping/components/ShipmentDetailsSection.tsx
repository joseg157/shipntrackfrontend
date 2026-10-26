import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import { createRHFController, validators, useFormContext, useWatch } from '@features/form';

import type { CreateGroundShipmentInput } from '../interfaces/groundShipment.types';
import { SERVICE_LEVELS, SIGNATURE_TYPES } from '../constants';
import SectionCard from './SectionCard';

const RHFController = createRHFController<CreateGroundShipmentInput>();

const timeFieldProps = { slotProps: { inputLabel: { shrink: true } } } as const;

function ShipmentDetailsSection() {
  const { control } = useFormContext<CreateGroundShipmentInput>();

  const isSignatureRequired = useWatch({
    control,
    name: 'shipmentDetails.isSignatureRequired',
  });

  return (
    <SectionCard
      title="Shipment Details"
      icon={<LocalShippingOutlinedIcon fontSize="small" className="tw:text-purple-500" />}
    >
      <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:sm:grid-cols-2 tw:lg:grid-cols-4">
        <RHFController
          name="shipmentDetails.serviceLevel"
          componentType="textfield"
          label="Service Level*"
          select
          rules={{ validate: { required: validators.required() } }}
        >
          {SERVICE_LEVELS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </RHFController>

        <RHFController
          name="shipmentDetails.shipmentDate"
          componentType="datepicker"
          label="Ship Date*"
          rules={{ validate: { required: validators.required() } }}
        />

        <RHFController
          name="shipmentDetails.readyTime"
          componentType="textfield"
          label="Ready Time"
          type="time"
          {...timeFieldProps}
        />

        <RHFController
          name="shipmentDetails.closeTime"
          componentType="textfield"
          label="Close Time"
          type="time"
          {...timeFieldProps}
        />

        <RHFController
          name="shipmentDetails.totalPackages"
          componentType="textfield"
          label="Total Packages*"
          type="number"
          rules={{
            validate: {
              required: validators.required(),
              isNumber: validators.integer('Must be a whole number'),
            },
          }}
        />

        <RHFController
          name="shipmentDetails.totalPieces"
          componentType="textfield"
          label="Total Pieces*"
          type="number"
          rules={{
            validate: {
              required: validators.required(),
              isNumber: validators.integer('Must be a whole number'),
            },
          }}
        />

        <RHFController
          name="shipmentDetails.palletCount"
          componentType="textfield"
          label="Pallet Count"
          type="number"
        />

        <div className="tw:flex tw:gap-2">
          <RHFController
            name="shipmentDetails.totalWeight"
            componentType="textfield"
            label="Total Weight*"
            type="number"
            className="tw:min-w-0 tw:flex-1"
            rules={{
              validate: {
                required: validators.required(),
                isNumber: validators.float(),
              },
            }}
          />
          <RHFController
            name="shipmentDetails.weightUnit"
            componentType="textfield"
            label="Unit"
            select
            className="tw:w-24"
          >
            <MenuItem value="LBS">LBS</MenuItem>
            <MenuItem value="KG">KG</MenuItem>
          </RHFController>
        </div>

        <RHFController
          name="shipmentDetails.declaredValue"
          componentType="textfield"
          label="Declared Value"
          type="number"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            },
          }}
          rules={{ validate: { isNumber: validators.float() } }}
        />
      </div>

      <fieldset className="tw:mt-4 tw:border-t tw:border-divider tw:pt-3">
        <legend className="tw:sr-only">Special handling options</legend>
        <div className="tw:grid tw:grid-cols-1 tw:gap-x-4 tw:sm:grid-cols-2 tw:lg:grid-cols-4">
          <RHFController
            name="shipmentDetails.isHazardous"
            componentType="checkbox"
            label="Hazardous"
          />
          <RHFController
            name="shipmentDetails.isTemperatureControlled"
            componentType="checkbox"
            label="Temperature Controlled"
          />
          <RHFController
            name="shipmentDetails.appointmentRequired"
            componentType="checkbox"
            label="Appointment Required"
          />
          <RHFController
            name="shipmentDetails.liftgateRequired"
            componentType="checkbox"
            label="Liftgate Required"
          />
          <RHFController
            name="shipmentDetails.insideDelivery"
            componentType="checkbox"
            label="Inside Delivery"
          />
          <RHFController
            name="shipmentDetails.isSignatureRequired"
            componentType="checkbox"
            label="Signature Required"
          />
          {isSignatureRequired && (
            <RHFController
              name="shipmentDetails.signatureType"
              componentType="textfield"
              label="Signature Type*"
              select
              size="small"
              rules={{ validate: { required: validators.required() } }}
            >
              {SIGNATURE_TYPES.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </RHFController>
          )}
        </div>
      </fieldset>
    </SectionCard>
  );
}

export default ShipmentDetailsSection;
