import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/button-icon";
import { useLogout } from "./use-logout";
import SpinnerMini from "../../ui/spinner-mini";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => logout()}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
