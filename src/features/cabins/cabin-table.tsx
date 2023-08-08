import { useCabins } from "./use-cabins";
import Spinner from "../../ui/spinner";
import CabinRow from "./cabin-row";
import Table from "../../ui/table";
import Menus from "../../ui/menus";
import Empty from "../../ui/empty";
import Pagination from "../../ui/pagination";
import { PAGE_SIZE } from "../../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins, count } = useCabins();
  // redirect after current page have no data
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = +searchParams.get("page");
  if (page && page > 1 && count === PAGE_SIZE) {
    navigate("/cabins");
    return null; // Redirecting, no need to render further
  }
  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default CabinTable;
