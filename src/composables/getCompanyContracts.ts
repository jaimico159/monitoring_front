import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import axios from "axios";

const getCompanyContracts = async (companyId: number): Promise<Contract[]> => {
  const { data } = await axios.get(
    API_SCHEMA_V1.companies.getCompanyContracts(companyId)
  );

  return data.map((company: APIContract): Contract => {
    return {
      id: company.id,
      startAt: company.start_at,
      endAt: company.end_at,
      slotDuration: company.slot_duration,
      companyId: company.company_id,
    };
  });
};

export default getCompanyContracts;
