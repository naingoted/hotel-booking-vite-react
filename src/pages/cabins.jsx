import Row from "../ui/row";
import Heading from "../ui/heading";
import CabinTable from "../features/cabins/cabin-table";
import AddCabin from "../features/cabins/add-cabin";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> All Cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
