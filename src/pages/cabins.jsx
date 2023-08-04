import { useEffect, useState } from "react";
import { getCabins } from "../services/api-cabins";
import Row from "../ui/row";
import Heading from "../ui/heading";
import CabinTable from "../features/cabins/cabin-table";
import Button from "../ui/button";
import CreateCabinForm from "../features/cabins/create-cabin-form";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> All Cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
