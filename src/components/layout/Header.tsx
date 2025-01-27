import { fetchUser } from '@/app/actions/auth';

import HeaderClient from './HeaderClient';

const Header = async () => {
  const user = await fetchUser();
  return <HeaderClient user={user} />;
};

export default Header;
