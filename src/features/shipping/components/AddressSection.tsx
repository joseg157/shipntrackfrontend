import { createRHFController, validators, useFormContext, useWatch } from '@features/form';
import { STATES } from '@utils/constants';
import type { CreateGroundShipmentInput } from '../interfaces/groundShipment.types';
import SectionCard from './SectionCard';

interface AddressSectionProps {
  title: string;
  prefix: 'shipper' | 'consignee' | 'billTo';
  icon: React.ReactNode;
}

const RHFController = createRHFController<CreateGroundShipmentInput>();

const stateOptions = Object.keys(STATES) as (keyof typeof STATES)[];

function AddressSection({ prefix, title, icon }: AddressSectionProps) {
  const { control } = useFormContext<CreateGroundShipmentInput>();

  const isBillToAddressRequired = useWatch({
    control,
    name: 'useAccountInfoForBilling',
    disabled: prefix !== 'billTo',
  });

  const action =
    prefix === 'billTo' ? (
      <div className="tw:absolute tw:top-1/2 tw:right-0 tw:-translate-y-1/2">
        <RHFController
          name="useAccountInfoForBilling"
          componentType="checkbox"
          label="Bill to Account Info"
        />
      </div>
    ) : null;

  const disableAddressFields = prefix === 'billTo' && isBillToAddressRequired;

  return (
    <SectionCard title={title} icon={icon} action={action}>
      <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:lg:grid-cols-2">
        <div className="tw:lg:col-span-2">
          <RHFController
            name={`${prefix}.name`}
            componentType="textfield"
            label="Name*"
            rules={{
              validate: {
                required: validators.required(),
              },
            }}
            disabled={disableAddressFields}
          />
        </div>

        <RHFController
          name={`${prefix}.address`}
          componentType="textfield"
          label="Address*"
          rules={{
            validate: {
              required: validators.required(),
            },
          }}
          disabled={disableAddressFields}
        />

        <RHFController
          name={`${prefix}.storeNumber`}
          componentType="textfield"
          label="Store #"
          disabled={disableAddressFields}
        />

        <RHFController
          name={`${prefix}.address2`}
          componentType="textfield"
          label="Address 2"
          disabled={disableAddressFields}
        />

        <RHFController
          name={`${prefix}.city`}
          componentType="textfield"
          label="City*"
          rules={{
            validate: {
              required: validators.required(),
            },
          }}
          disabled={disableAddressFields}
        />

        <RHFController
          name={`${prefix}.state`}
          componentType="autocomplete"
          label="State*"
          options={stateOptions}
          getOptionLabel={(option) => (STATES[option] ? STATES[option] : '')}
          rules={{
            validate: {
              required: validators.required(),
            },
          }}
          disabled={disableAddressFields}
        />

        <RHFController
          name={`${prefix}.postalCode`}
          componentType="textfield"
          label="Postal Code*"
          rules={{
            validate: {
              required: validators.required(),
            },
          }}
          disabled={disableAddressFields}
        />
        <RHFController
          name={`${prefix}.country`}
          componentType="textfield"
          label="Country*"
          rules={{
            validate: {
              required: validators.required(),
            },
          }}
          disabled={disableAddressFields}
        />

        <RHFController
          name={`${prefix}.contactName`}
          componentType="textfield"
          label="Contact Name"
          disabled={disableAddressFields}
        />
        <RHFController
          name={`${prefix}.email`}
          componentType="textfield"
          label="Email"
          disabled={disableAddressFields}
        />
        <RHFController
          name={`${prefix}.phone`}
          componentType="textfield"
          label="Phone"
          disabled={disableAddressFields}
        />
      </div>
    </SectionCard>
  );
}

export default AddressSection;
