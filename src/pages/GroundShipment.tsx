import DocumentTitle from '@components/DocumentTitle';

import { CreateGroundShipmentForm } from '@features/shipping';

function GroundShipment() {
  return (
    <>
      <DocumentTitle documentTitle="Ground Shipment" />
      <CreateGroundShipmentForm />
    </>
  );
}

export default GroundShipment;
