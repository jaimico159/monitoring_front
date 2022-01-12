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
};

export default API_SCHEMA_V1;
