import { Helmet } from 'react-helmet-async';
// sections
import { IssuerView } from 'src/sections/issuer/view';

// ----------------------------------------------------------------------

export default function IssuerPage() {
  return (
    <>
      <Helmet>
        <title> Bond: Issuer</title>
      </Helmet>

      <IssuerView />
    </>
  );
}
