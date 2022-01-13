<template>
  <div class="home">
    <div class="container mt-2">
      <h1>GuardianesInformáticos SpA</h1>
      <div class="row d-flex mb-4">
        <div class="col-sm-12 col-md-6 col-lg-4">
          <label class="align-self-start">Empresa</label>
          <CompanySelector></CompanySelector>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4" v-if="selectedCompany">
          <label class="align-self-start">Contrato</label>
          <ContractSelector></ContractSelector>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4" v-if="selectedContract">
          <label class="align-self-start">Periodo</label>
          <ContractPlanSelector></ContractPlanSelector>
        </div>
      </div>

      <div v-if="contractPlan">
        <div class="row">
          <div
            class="col-sm-12 col-md-6 mb-4"
            v-for="(contractPlanDay, index) in contractPlan.contractPlanDays"
            :key="index"
          >
            <ReservationsTable
              :contractPlanDay="contractPlanDay"
            ></ReservationsTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref, watch } from "vue";
import getCompanies from "@/composables/getCompanies";
import { Company, Engineer, Contract, ContractPlan } from "@/typings/api";
import getEngineers from "@/composables/getEngineers";
import getCompanyContracts from "@/composables/getCompanyContracts";
import getContractPlan from "@/composables/getContractPlan";
import getContractPlans from "@/composables/getContractPlans";
import ReservationsTable from "@/components/Home/ReservationsTable.vue";
import CompanySelector from "@/components/Home/CompanySelector.vue";
import ContractSelector from "@/components/Home/ContractSelector.vue";
import ContractPlanSelector from "@/components/Home/ContractPlanSelector.vue";

export default defineComponent({
  name: "Home",
  components: {
    ReservationsTable,
    CompanySelector,
    ContractSelector,
    ContractPlanSelector,
  },
  setup() {
    let companies = ref<Company[]>([]);
    let engineers = ref<Engineer[]>([]);
    let contracts = ref<Contract[]>([]);
    let contractPlans = ref<ContractPlan[]>([]);
    let selectedCompany = ref<Company | undefined>(undefined);
    let selectedCompanyId = ref<number | undefined>(undefined);
    let selectedContract = ref<Contract | undefined>(undefined);
    let selectedContractId = ref<number | undefined>(undefined);
    let selectedContractPlanId = ref<number | undefined>(undefined);
    let selectedContractPlan = ref<ContractPlan | undefined>(undefined);
    let contractPlan = ref<ContractPlan | undefined>(undefined);

    const _getCompanies = async (): Promise<void> => {
      companies.value = await getCompanies();
    };

    const _getEngineers = async (): Promise<void> => {
      engineers.value = await getEngineers();
    };

    const _getCompanyContracts = async (companyId: number): Promise<void> => {
      contracts.value = await getCompanyContracts(companyId);
    };

    const _getContractPlans = async (contractId: number): Promise<void> => {
      contractPlans.value = await getContractPlans(contractId);
    };

    const _getContractPlanTimeSlots = async (
      contractPlanId: number
    ): Promise<void> => {
      contractPlan.value = await getContractPlan(contractPlanId);
    };

    onMounted(() => {
      _getCompanies();
    });

    watch(selectedCompanyId, (newValue) => {
      selectedCompany.value = companies.value.find((e) => e.id === newValue);
      selectedContractId.value = undefined;
    });

    watch(selectedCompany, () => {
      if (selectedCompany.value) _getCompanyContracts(selectedCompany.value.id);
    });

    watch(selectedContractId, (newValue) => {
      selectedContract.value = contracts.value.find((e) => e.id === newValue);
      selectedContractPlanId.value = undefined;
    });

    watch(selectedContract, () => {
      if (selectedContract.value) _getContractPlans(selectedContract.value.id);
    });

    watch(selectedContractPlanId, (newValue) => {
      selectedContractPlan.value = contractPlans.value.find(
        (e) => e.id === newValue
      );
      contractPlan.value = undefined;
    });

    watch(selectedContractPlan, () => {
      if (selectedContractPlan.value)
        _getContractPlanTimeSlots(selectedContractPlan.value.id);
    });

    provide("selectedCompanyId", selectedCompanyId);
    provide("companies", companies);
    provide("selectedContractId", selectedContractId);
    provide("contracts", contracts);
    provide("selectedContractPlanId", selectedContractPlanId);
    provide("contractPlans", contractPlans);

    return {
      companies,
      contracts,
      contractPlans,
      contractPlan,
      engineers,
      selectedCompany,
      selectedCompanyId,
      selectedContract,
      selectedContractId,
      selectedContractPlanId,
    };
  },
});
</script>
