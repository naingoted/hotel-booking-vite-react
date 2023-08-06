import UpdateSettingsForm from "../features/settings/update-settings-form";
import Heading from "../ui/heading";
import Row from "../ui/row";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
