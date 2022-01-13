import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import axios from "axios";

const getContractEngineers = async (
  contractId: number
): Promise<Engineer[]> => {
  const { data } = await axios.get(
    API_SCHEMA_V1.contracts.getContractEngineers(contractId)
  );

  return data.engineers.map((engineer: APIEngineer): Engineer => {
    return {
      id: engineer.id,
      firstName: engineer.first_name,
      lastName: engineer.last_name,
      displayName: engineer.display_name,
      color: engineer.color,
    };
  });
};

export default getContractEngineers;
