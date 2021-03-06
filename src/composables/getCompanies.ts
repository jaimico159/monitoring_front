import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import axios from "axios";

const getCompanies = async (): Promise<Company[]> => {
  const { data } = await axios.get(API_SCHEMA_V1.companies.getCompanies);

  return data.map((company: APICompany) => {
    return {
      id: company.id,
      name: company.name,
    };
  });
};

export default getCompanies;
