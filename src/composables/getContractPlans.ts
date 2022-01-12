import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import axios from "axios";

const getContractPlans = async (
  contractId: number
): Promise<ContractPlan[]> => {
  const { data } = await axios.get(
    API_SCHEMA_V1.contracts.getContractPlans(contractId)
  );

  return data.contract_plans.map((contractPlan: APIContractPlan) => {
    return {
      id: contractPlan.id,
      contractId: contractPlan.contract_id,
      startDate: contractPlan.start_date,
      endDate: contractPlan.end_date,
      slotDuration: contractPlan.slot_duration,
    };
  });
};

export default getContractPlans;
