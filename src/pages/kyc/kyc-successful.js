import { Helmet } from 'react-helmet-async';
// sections
import KYCSuccessful from 'src/sections/kyc/kyc-successful';

// ----------------------------------------------------------------------

export default function KYCSuccessfulPage() {
  return (
    <>
      <Helmet>
        <title> Issuer: KYC Success</title>
      </Helmet>

      <KYCSuccessful />
    </>
  );
}
