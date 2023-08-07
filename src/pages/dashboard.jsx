import DashboardLayout from "../features/dashboard/dashboard-layout";
import DashboardFilter from "../features/dashboard/dashboard-filter";
import Heading from "../ui/heading";
import Row from "../ui/row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
