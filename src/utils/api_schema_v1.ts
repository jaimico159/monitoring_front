const API_SCHEMA_V1 = {
  companies: {
    getCompanies: "/companies",
    getCompanyContracts: function (companyId: number): string {
      return `/companies/${companyId}/contracts`;
    },
  },
  engineers: {
    getEngineers: "/engineers",
  },
  contracts: {
    getContractPlans: function (contractId: number): string {
      return `/contracts/${contractId}/contract_plans`;
    },
    getContractEngineers: function (contractId: number): string {
      return `/contracts/${contractId}/engineers`;
    },
  },
  contractPlans: {
    getContractPlanTimeSlots: function (contractPlanId: number): string {
      return `/contract_plans/${contractPlanId}/time_slots`;
    },
  },
};

export default API_SCHEMA_V1;
