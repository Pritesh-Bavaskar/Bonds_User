import { Helmet } from 'react-helmet-async';
// sections
import { BondLibraryView } from 'src/sections/bond-library/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Bonds: Library</title>
      </Helmet>

      <BondLibraryView />
    </>
  );
}
