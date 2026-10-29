import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { createRHFController, validators } from '@features/form';

import type { CreateGroundShipmentInput } from '../interfaces/groundShipment.types';

const RHFController = createRHFController<CreateGroundShipmentInput>();

interface PackageRowProps {
  index: number;
  onDelete: () => void;
}

function PackageRow({ index, onDelete }: PackageRowProps) {
  return (
    <div className="tw:rounded tw:border tw:border-divider">
      {/* Package Heading and deleted action button */}
      <div className="tw:flex tw:items-center tw:justify-between tw:border-b tw:border-divider tw:bg-gray-50 tw:px-3 tw:py-2">
        <span className="tw:text-xs tw:font-semibold tw:tracking-wide tw:text-gray-500 tw:uppercase">
          Package {index + 1}
        </span>
        <IconButton size="small" aria-label="Remove package" onClick={onDelete}>
          <DeleteOutlinedIcon fontSize="small" className="tw:text-red-400" />
        </IconButton>
      </div>

      {/* Fields for package details */}
      <div className="tw:grid tw:grid-cols-2 tw:gap-3 tw:p-3 tw:sm:grid-cols-4 tw:lg:grid-cols-7">
        <RHFController
          name={`packages.${index}.type`}
          componentType="textfield"
          label="Type"
          select
          className="tw:sm:col-span-2"
          rules={{
            validate: {
              required: validators.required('Package type is required'),
            },
          }}
        >
          <MenuItem value="box">Box</MenuItem>
          <MenuItem value="envelope">Envelope</MenuItem>
          <MenuItem value="pallet">Pallet</MenuItem>
          <MenuItem value="tube">Tube</MenuItem>
          <MenuItem value="crate">Crate</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </RHFController>

        <RHFController
          name={`packages.${index}.quantity`}
          componentType="textfield"
          label="Quantity"
          type="number"
          rules={{
            validate: {
              required: validators.required(),
              isNumber: validators.integer('Quantity must be a whole number'),
            },
          }}
        />

        <RHFController
          name={`packages.${index}.weight`}
          componentType="textfield"
          label="Weight (lbs)"
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
            },
          }}
          rules={{
            validate: {
              required: validators.required(),
              isNumber: validators.float(),
            },
          }}
        />

        <RHFController
          name={`packages.${index}.length`}
          componentType="textfield"
          label="Length (in)"
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            },
          }}
          rules={{
            validate: {
              required: validators.required(),
              isNumber: validators.float(),
            },
          }}
        />

        <RHFController
          name={`packages.${index}.width`}
          componentType="textfield"
          label="Width (in)"
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            },
          }}
          rules={{
            validate: {
              required: validators.required(),
              isNumber: validators.float(),
            },
          }}
        />

        <RHFController
          name={`packages.${index}.height`}
          componentType="textfield"
          label="Height (in)"
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            },
          }}
          rules={{
            validate: {
              required: validators.required(),
              isNumber: validators.float(),
            },
          }}
        />
      </div>

      {/* Additional package details can be added here if needed */}
      <div className="tw:grid tw:grid-cols-2 tw:gap-3 tw:px-3 tw:pb-3 tw:sm:grid-cols-4 tw:lg:grid-cols-7">
        <div className="tw:col-span-2 tw:sm:col-span-2">
          <RHFController
            name={`packages.${index}.declaredValue`}
            componentType="textfield"
            label="Declared Value"
            placeholder="0.00"
            type="number"
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
            }}
            rules={{
              validate: {
                required: validators.required(),
                isNumber: validators.float({ decimalPlaces: 2 }),
              },
            }}
          />
        </div>

        <div className="tw:col-span-2 tw:sm:col-span-2 tw:lg:col-span-3">
          <RHFController
            name={`packages.${index}.description`}
            componentType="textfield"
            label="Description"
          />
        </div>
      </div>
    </div>
  );
}

export default PackageRow;
