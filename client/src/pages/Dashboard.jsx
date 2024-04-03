import { Balance, SearchInput } from "../components";
import Display from "../components/Display";

const Dashboard = () => {
  return (
    <div className="w-screen flex flex-col">
      <div className="md:px-20 px-6 gap-4 flex flex-col">
        <Balance />
        <SearchInput />
        <Display />
      </div>
    </div>
  );
};

export default Dashboard;
