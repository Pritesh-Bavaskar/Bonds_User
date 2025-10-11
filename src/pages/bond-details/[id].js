import { Helmet } from 'react-helmet-async';
// sections
import { BondDetailsView } from 'src/sections/bond-details/view';

// ----------------------------------------------------------------------

export default function BondDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Bonds: Bond Details</title>
      </Helmet>

      <BondDetailsView />
    </>
  );
}
