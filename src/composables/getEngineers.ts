import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import axios from "axios";

interface APIEngineer {
  first_name: string;
  last_name: string;
  display_name: string;
}

const getEngineers = async (): Promise<Engineer[]> => {
  const { data } = await axios.get(API_SCHEMA_V1.engineers.getEngineers);

  return data.map((engineer: APIEngineer) => {
    return {
      firstName: engineer.first_name,
      lastName: engineer.last_name,
      displayName: engineer.display_name,
    };
  });
};

export default getEngineers;
