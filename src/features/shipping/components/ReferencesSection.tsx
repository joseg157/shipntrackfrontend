import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BusinessIcon from '@mui/icons-material/Business';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';

import {
  createRHFController,
  validators,
  useFormContext,
  useFieldArray,
  useWatch,
} from '@features/form';

import { REFERENCE_PARTIES, REFERENCE_PARTY_LABELS } from '../constants';
import type { CreateGroundShipmentInput } from '../interfaces/groundShipment.types';
import SectionCard from './SectionCard';

type ReferenceParty = (typeof REFERENCE_PARTIES)[number];
type ReferencesViewMode = 'cards' | 'table';

const RHFController = createRHFController<CreateGroundShipmentInput>();

const referencePartyIconColors: Record<ReferenceParty, string> = {
  shipper: 'tw:text-blue-500',
  consignee: 'tw:text-green-500',
  billTo: 'tw:text-purple-500',
};

// interface CopyReferenceButtonProps {
//   party: ReferenceParty;
//   type: string;
//   value: string;
// }

// function CopyReferenceButton({ party, type, value }: CopyReferenceButtonProps) {
//   const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
//   const copied = status === 'copied';

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(value);
//       setStatus('copied');
//     } catch {
//       setStatus('failed');
//     }
//     setTimeout(() => setStatus('idle'), 1500);
//   };

//   return (
//     <>
//       <Tooltip title={copied ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}>
//         <span>
//           <IconButton
//             size="small"
//             disabled={!value}
//             aria-label={`Copy ${REFERENCE_PARTY_LABELS[party]} ${referenceTypeLabel(type)} reference ${value}`}
//             onClick={handleCopy}
//             sx={referenceFocusRing}
//           >
//             {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
//           </IconButton>
//         </span>
//       </Tooltip>
//       <span role="status" className="tw:sr-only">
//         {copied ? 'Copied to clipboard' : status === 'failed' ? 'Copy failed' : ''}
//       </span>
//     </>
//   );
// }

function ReferenceTable() {
  const { control } = useFormContext<CreateGroundShipmentInput>();
  const references = useWatch({ control, name: 'references' }) ?? [];

  const tableRows = REFERENCE_PARTIES.flatMap((party) =>
    references.filter((ref) => ref?.party === party).map((ref) => ({ party, ref })),
  );

  return (
    <Paper className="tw:overflow-hidden">
      <TableContainer className="tw:overflow-x-auto">
        <Table size="small" aria-label="Shipment references" className="tw:min-w-120">
          <TableHead>
            <TableRow>
              <TableCell scope="col">Party</TableCell>
              <TableCell scope="col">Ref Type</TableCell>
              <TableCell scope="col">Reference Value</TableCell>
              {/* <TableCell scope="col" align="right">
                <span className="tw:sr-only">Copy</span>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No references on file</TableCell>
              </TableRow>
            )}
            {tableRows.map(({ party, ref }, i) => (
              <TableRow key={`${party}-${i}`}>
                <TableCell>{REFERENCE_PARTY_LABELS[party]}</TableCell>
                <TableCell>{ref.type ? ref.type : '—'}</TableCell>
                <TableCell>{ref.value || '—'}</TableCell>
                {/* <TableCell align="right">
                  <CopyReferenceButton party={party} type={ref.type} value={ref.value} />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function ReferencesSection() {
  const { control } = useFormContext<CreateGroundShipmentInput>();
  const [view, setView] = useState<ReferencesViewMode>('cards');
  const [deleteDialogState, setDeleteDialogState] = useState({
    open: false,
    deleteIndex: -1,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'references' });

  const handleAddReference = (party: ReferenceParty) => () => {
    append({ party, type: '', value: '' });
  };

  const handleOpenDeleteDialog = (index: number) => () => {
    setDeleteDialogState({ open: true, deleteIndex: index });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogState({ open: false, deleteIndex: -1 });
  };

  const handleConfirmDelete = () => {
    remove(deleteDialogState.deleteIndex);
    handleCloseDeleteDialog();
  };

  return (
    <div>
      <div className="tw:mb-2 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2 tw:bg-gray-200 tw:py-2 tw:pr-4 tw:pl-5 tw:dark:bg-gray-900">
        <div className="tw:flex tw:items-center tw:gap-2">
          <ReceiptLongOutlinedIcon fontSize="small" className="tw:text-orange-500" />
          <h6 id="shipment-references-heading" className="tw:text-lg tw:font-semibold tw:uppercase">
            References
          </h6>
        </div>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={view}
          aria-label="References view"
          onChange={(_, next: ReferencesViewMode | null) => next && setView(next)}
        >
          <ToggleButton
            value="cards"
            aria-label="Card view"
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2,
              },
            }}
          >
            <ViewModuleOutlinedIcon fontSize="small" className="tw:mr-1" /> Cards
          </ToggleButton>
          <ToggleButton
            value="table"
            aria-label="Table view"
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2,
              },
            }}
          >
            <TableRowsOutlinedIcon fontSize="small" className="tw:mr-1" /> Table
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {view === 'cards' ? (
        <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:lg:grid-cols-3">
          {REFERENCE_PARTIES.map((party) => {
            const partyLabel = REFERENCE_PARTY_LABELS[party];

            const partyFields = fields
              .map((field, index) => ({ field, index }))
              .filter(({ field }) => field.party === party);

            return (
              <SectionCard
                key={party}
                title={partyLabel}
                icon={<BusinessIcon fontSize="small" className={referencePartyIconColors[party]} />}
                action={
                  <div className="tw:flex tw:items-center tw:gap-2">
                    <Chip
                      size="small"
                      label={partyFields.length}
                      aria-label={`${partyFields.length} ${partyLabel} references`}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddReference(party)}
                      aria-label={`Add ${partyLabel} reference`}
                    >
                      Add
                    </Button>
                  </div>
                }
              >
                {partyFields.length === 0 ? (
                  <p>No references for this party.</p>
                ) : (
                  <div className="tw:grid tw:gap-3">
                    {partyFields.map(({ field, index }) => (
                      <div key={field.id} className="tw:flex tw:items-start tw:gap-2">
                        <RHFController
                          name={`references.${index}.type`}
                          componentType="textfield"
                          label="Type"
                          size="small"
                          className="tw:w-36 tw:shrink-0"
                          rules={{
                            validate: {
                              required: validators.required(),
                            },
                          }}
                        />

                        <RHFController
                          name={`references.${index}.value`}
                          componentType="textfield"
                          label="Value"
                          size="small"
                          className="tw:min-w-0 tw:flex-1"
                          rules={{
                            validate: {
                              required: validators.required('Reference value is required'),
                            },
                          }}
                        />

                        <IconButton
                          size="small"
                          aria-label={`Remove ${partyLabel} reference ${index + 1}`}
                          onClick={handleOpenDeleteDialog(index)}
                          sx={{
                            '&:focus-visible': {
                              outline: '2px solid',
                              outlineColor: 'primary.main',
                              outlineOffset: 2,
                            },
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" className="tw:text-red-400" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>
            );
          })}
        </div>
      ) : (
        <ReferenceTable />
      )}

      <Dialog open={deleteDialogState.open} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this reference?
          {deleteDialogState.deleteIndex !== -1 && (
            <>
              <div>
                Party: {REFERENCE_PARTY_LABELS[fields[deleteDialogState.deleteIndex].party]}
              </div>
              <div>Type: {fields[deleteDialogState.deleteIndex].type}</div>
              <div>Value: {fields[deleteDialogState.deleteIndex].value}</div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReferencesSection;
