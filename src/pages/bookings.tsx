import Heading from "../ui/heading";
import Row from "../ui/row";
import BookingTable from "../features/bookings/booking-table";
import BookingTableOperations from "../features/bookings/booking-table-operations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
