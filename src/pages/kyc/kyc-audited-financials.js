import { Helmet } from 'react-helmet-async';
// sections
import KycAuditedFinancial from 'src/sections/kyc/kyc-audited-financials';

// ----------------------------------------------------------------------

export default function KycAuditedFinancialPage() {
  return (
    <>
      <Helmet>
        <title> Bonds: KYC</title>
      </Helmet>

      <KycAuditedFinancial />
    </>
  );
}
