import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";
function UpdateSettingsForm() {
  const {
    isLoading: isLoadingSettings,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isLoading: isUpdatingSetting, updateSetting } = useUpdateSetting();

  function handleUpdateSetting(e, field) {
    const { value } = e.target;
    console.log(value.startsWith(`-`));
    // if (value === "0" || value.startsWith(`-`))
    //   return toast.error(`Value can't be 0 or negativ nummber`);
    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isLoadingSettings) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdateSetting(e, `minBookingLength`)}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSetting(e, `maxBookingLength`)}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdateSetting(e, `maxGuestsPerBooking`)}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting(e, `breakfastPrice`)}
          disabled={isUpdatingSetting}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
