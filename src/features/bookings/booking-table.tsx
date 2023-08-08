import BookingRow from "./booking-row";
import Table from "../../ui/table";
import Menus from "../../ui/menus";
import Empty from "../../ui/empty";

import { useBookings } from "./use-bookings";
import Spinner from "../../ui/spinner";
import Pagination from "../../ui/pagination";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  // redirect after current page have no data
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = +searchParams.get("page");
  if (page && page > 1 && count === PAGE_SIZE) {
    navigate("/bookings");
    return null; // Redirecting, no need to render further
  }

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
