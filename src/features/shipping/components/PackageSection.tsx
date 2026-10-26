import { useState } from 'react';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import AddIcon from '@mui/icons-material/Add';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { useFormContext, useFieldArray } from '@features/form';
import type {
  CreateGroundShipmentInput,
  NewPackageDetail,
} from '../interfaces/groundShipment.types';
import PackageRow from './PackageRow';
import SectionCard from './SectionCard';

function PackageSection() {
  const { control } = useFormContext<CreateGroundShipmentInput>();
  const [deleteDialogState, setDeleteDialogState] = useState({
    open: false,
    deleteIndex: -1,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'packages',
  });

  const handleAddNewPackage = () => {
    const newPackage: NewPackageDetail = {
      type: '',
      declaredValue: 0,
      weight: 0,
      height: 0,
      width: 0,
      length: 0,
      quantity: 0,
      description: '',
    };

    append(newPackage);
  };

  const handleRemovePackage = (index: number) => {
    remove(index);
  };

  const handleOpenDeleteDialog = (index: number) => () => {
    setDeleteDialogState({ open: true, deleteIndex: index });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogState({ open: false, deleteIndex: -1 });
  };

  return (
    <SectionCard
      title="Package Detail"
      icon={<Inventory2OutlinedIcon fontSize="small" className="tw:text-green-500" />}
      action={
        <Button
          variant="outlined"
          size="small"
          onClick={handleAddNewPackage}
          startIcon={<AddIcon />}
        >
          Add Package
        </Button>
      }
    >
      {fields.map((field, index) => (
        <PackageRow key={field.id} index={index} onDelete={handleOpenDeleteDialog(index)} />
      ))}

      {/* Confirmation dialog*/}
      <Dialog open={deleteDialogState.open} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete package {deleteDialogState.deleteIndex + 1}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              handleCloseDeleteDialog();
              handleRemovePackage(deleteDialogState.deleteIndex);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </SectionCard>
  );
}

export default PackageSection;
