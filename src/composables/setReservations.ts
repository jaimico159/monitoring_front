import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import axios from "axios";

const setReservations = async (
  contractPlanId: number,
  dataForm: SetReservationsForm
): Promise<void> => {
  await axios.post(
    API_SCHEMA_V1.contractPlans.setContractPlanReservations(contractPlanId),
    {
      reservations: dataForm.reservations,
    }
  );
};

export default setReservations;
