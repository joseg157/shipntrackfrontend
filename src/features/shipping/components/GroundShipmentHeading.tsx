import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { createRHFController, useFormContext, useWatch, validators } from '@features/form';
import type { GroundShipmentFormData } from '../interfaces/groundShipment.types';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const RHFController = createRHFController<GroundShipmentFormData>();

interface GroundShipmentHeadingProps {
  mode: 'create' | 'edit';
}

function GroundShipmentHeading({ mode }: GroundShipmentHeadingProps) {
  const [editAccountNumMode, setEditAccountNumMode] = useState(mode === 'create');

  const { control } = useFormContext<GroundShipmentFormData>();
  const [shipperName, consigneeName, billToName] = useWatch({
    control,
    name: ['shipper.name', 'consignee.name', 'billTo.name'],
  });

  const handleEditAccountNumModeToggle = () => setEditAccountNumMode((prev) => !prev);

  return (
    <div className="tw:grid tw:gap-2 tw:p-4 tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:lg:grid-cols-4 tw:xl:grid-cols-6">
      <div>
        <div className="tw:text-lg tw:font-semibold">Shipper Name</div>
        <div>{shipperName}</div>
      </div>

      <div>
        <div className="tw:text-lg tw:font-semibold">Consignee Name</div>
        <div>{consigneeName}</div>
      </div>

      <div>
        <div className="tw:text-lg tw:font-semibold">Bill To</div>
        <div>{billToName}</div>
      </div>

      <div>
        <div className="tw:text-lg tw:font-semibold">Receive Date/Time</div>
        <div>2024-06-15 14:30</div>
      </div>

      <div>
        <div className="tw:text-lg tw:font-semibold">Status</div>
        <div>Drafts</div>
      </div>

      <div>
        <div className="tw:text-lg tw:font-semibold">
          Account #
          {mode === 'edit' && (
            <IconButton color="primary" onClick={handleEditAccountNumModeToggle}>
              <HiOutlinePencilAlt />
            </IconButton>
          )}
        </div>

        <div className="tw:w-50">
          {/* On creation, show the account number input field always */}
          {mode === 'create' && (
            <RHFController
              name="accountNumber"
              componentType="textfield"
              size="small"
              variant="outlined"
              rules={{
                validate: {
                  required: validators.required(),
                },
              }}
            />
          )}

          {/* On edit, allow editing the account number only if editAccountNumMode is true */}
          {mode === 'edit' && editAccountNumMode && (
            <RHFController
              name="accountNumber"
              componentType="textfield"
              size="small"
              variant="outlined"
              rules={{
                validate: {
                  required: validators.required(),
                },
              }}
            />
          )}

          {mode === 'edit' && !editAccountNumMode && <div>dadasd</div>}
        </div>
      </div>
    </div>
  );
}

export default GroundShipmentHeading;
