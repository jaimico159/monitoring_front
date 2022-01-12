import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import axios from "axios";

const getCompanies = async (): Promise<Company[] | undefined> => {
  const { data } = await axios.get(API_SCHEMA_V1.companies.getCompanies);
  return data.companies.map((company: Company) => {
    return {
      name: company.name,
    };
  });
};
