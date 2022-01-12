<template>
  <div class="home">
    <div class="container mt-2">
      <h1>GuardianesInformáticos SpA</h1>
      <select
        class="form-select"
        aria-label="companies"
        v-model="selectedCompanyId"
      >
        <option selected>Selecciona una compañía</option>
        <option
          v-for="(company, index) in companies"
          :key="index"
          :value="company.id"
        >
          {{ company.name }}
        </option>
      </select>

      <select
        class="form-select"
        aria-label="contracts"
        v-if="selectedCompany"
        v-model="selectedContractId"
      >
        <option selected>Selecciona un Contrato</option>
        <option
          v-for="(contract, index) in contracts"
          :key="index"
          :value="contract.id"
        >
          {{ contract.name }}
        </option>
      </select>

      <select
        class="form-select"
        aria-label="contract plans"
        v-if="selectedContract"
        v-model="selectedContractPlanId"
      >
        <option selected>Selecciona un Periodo</option>
        <option
          v-for="(contractPlan, index) in contractPlans"
          :key="index"
          :value="contractPlan.id"
        >
          {{ `Del ${contractPlan.startDate} al ${contractPlan.endDate}` }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import getCompanies from "@/composables/getCompanies";
import { Company, Engineer, Contract, ContractPlan } from "@/typings/api";
import getEngineers from "@/composables/getEngineers";
import getCompanyContracts from "@/composables/getCompanyContracts";
import getContractPlan from "@/composables/getContractPlan";
import getContractPlans from "@/composables/getContractPlans";

export default defineComponent({
  name: "Home",
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
    });

    watch(selectedCompany, () => {
      if (selectedCompany.value) _getCompanyContracts(selectedCompany.value.id);
    });

    watch(selectedContractId, (newValue) => {
      selectedContract.value = contracts.value.find((e) => e.id === newValue);
    });

    watch(selectedContract, () => {
      if (selectedContract.value) _getContractPlans(selectedContract.value.id);
    });

    watch(selectedContractPlanId, (newValue) => {
      selectedContractPlan.value = contractPlans.value.find(
        (e) => e.id === newValue
      );
    });

    watch(selectedContractPlan, () => {
      if (selectedContractPlan.value)
        _getContractPlanTimeSlots(selectedContractPlan.value.id);
    });

    return {
      companies,
      contracts,
      contractPlans,
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
