import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Form, createRHFController, useForm } from '@features/form';

import type { CreateGroundShipmentInput } from '../interfaces/groundShipment.types';
import SectionCard from './SectionCard';
import PackageSection from './PackageSection';
import GroundShipmentHeading from './GroundShipmentHeading';
import AddressSection from './AddressSection';
import ReferencesSection from './ReferencesSection';
import ShipmentDetailsSection from './ShipmentDetailsSection';
import { GROUND_SHIPMENT_DEFAULTS } from '../constants';

const RHFController = createRHFController<CreateGroundShipmentInput>();

function CreateGroundShipmentForm() {
  const methods = useForm({
    defaultValues: GROUND_SHIPMENT_DEFAULTS,
  });

  // const [activeNavTab, setActiveNavTab] = useState(defaultNavTab);

  const onSubmit = (data: CreateGroundShipmentInput) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const onCancel = () => {
    methods.reset();
  };

  // const handleNavTabChange = (_event: React.SyntheticEvent, newValue: string) => {
  //   setActiveNavTab(newValue);
  // };

  return (
    <Form formMethods={methods} onSubmit={onSubmit} hideActions>
      {/* Header Section with Title, Draft Chip, and Action Buttons */}
      <div className="tw:-mx-4 tw:-mt-4 tw:mb-3 tw:border-b tw:border-gray-300 tw:bg-gray-100 tw:dark:bg-gray-900">
        <div className="tw:flex tw:flex-col tw:gap-y-4 tw:p-4 tw:lg:flex-row tw:lg:items-center tw:lg:justify-between">
          <div className="tw:flex tw:items-center tw:gap-2">
            <LocalShippingOutlinedIcon className="tw:text-4xl tw:text-blue-500" />
            <h5 className="tw:text-xl tw:font-bold">Ground Shipment #</h5>
            <Chip label="Draft" color="warning" size="small" className="tw:ml-2" />
          </div>

          <div className="tw:self-center tw:sm:self-end">
            <Button
              color="primary"
              startIcon={<SaveOutlinedIcon />}
              className="tw:mr-2"
              size="small"
              type="submit"
            >
              Create Order
            </Button>

            <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteOutlinedIcon />}
              className="tw:mr-2"
              size="small"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="tw:px-4">
          <GroundShipmentHeading mode="create" />
        </div>
      </div>

      {/* Navigation Tabs */}
      {/* <div className="tw:mb-4 tw:border-b tw:border-gray-500" aria-label="Ground Shipment Tabs">
        <Tabs className="tw:font-semibold" value={activeNavTab} onChange={handleNavTabChange}>
          {Object.entries(NavTabLabels).map(([key, label]) => (
            <Tab key={key} label={label} value={key} />
          ))}
        </Tabs>
      </div> */}

      {/* Details Section */}
      <div className="tw:animate-fade-in">
        <div className="tw:mb-2 tw:bg-gray-200 tw:py-2 tw:pl-5 tw:dark:bg-gray-900">
          <h6 className="tw:text-lg tw:font-semibold tw:uppercase">Main Information</h6>
        </div>

        <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-3">
          {/* Shipper Section */}
          <AddressSection
            title="Shipper (From)"
            prefix="shipper"
            icon={<BusinessIcon fontSize="small" className="tw:text-blue-500" />}
          />

          {/* Consignee Section */}
          <AddressSection
            title="Consignee (To)"
            prefix="consignee"
            icon={<BusinessIcon fontSize="small" className="tw:text-green-500" />}
          />

          {/* Bill To Section */}
          <AddressSection
            title="Bill To"
            prefix="billTo"
            icon={<AccountCircleIcon fontSize="small" className="tw:text-green-500" />}
          />

          {/* References Section */}

          <div className="tw:md:col-span-3">
            <ReferencesSection />
          </div>

          {/* Package Details Section */}
          <div className="tw:md:col-span-3">
            <PackageSection />
          </div>

          {/* Shipment Details Section */}
          <div className="tw:md:col-span-3">
            <ShipmentDetailsSection />
          </div>

          <div className="tw:md:col-span-3">
            <SectionCard
              title="Special Instructions / Notes"
              icon={<NoteOutlinedIcon fontSize="small" className="tw:text-blue-500" />}
            >
              <RHFController
                name="specialInstructions"
                componentType="textfield"
                placeholder="Add any special instructions or notes here"
                multiline
                rows={3}
              />
            </SectionCard>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default CreateGroundShipmentForm;
