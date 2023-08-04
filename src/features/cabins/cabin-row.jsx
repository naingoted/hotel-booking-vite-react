import styled from "styled-components";
import { useState } from "react";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurreny } from "../../utils/helpers";
import CreateCabinForm from "./create-cabin-form";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// eslint-disable-next-line react/prop-types
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinId,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <div>Fits up to {max_capacity}</div>
        <Price>{formatCurreny(regular_price)}</Price>
        {discount ? (
          <Discount>{formatCurreny(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>Actions</div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;