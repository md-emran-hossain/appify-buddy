import { redirect } from 'next/navigation';

const Home = () => {
  // TODO: Add proper server-side authentication check here when auth is fully re-enabled
  // if (!isAuthenticated) { redirect("/login"); }
  
  redirect("/feed");
};

export default Home;
