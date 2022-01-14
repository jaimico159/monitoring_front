<template>
  <div class="home">
    <div class="container mt-2">
      <h1 id="app-title">GuardianesInformáticos SpA</h1>
      <div class="row d-flex mb-4">
        <div class="col-sm-12 col-md-6 col-lg-3">
          <label class="align-self-start">Empresa</label>
          <CompanySelector></CompanySelector>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3" v-if="selectedCompany">
          <label class="align-self-start">Contrato</label>
          <ContractSelector></ContractSelector>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3" v-if="selectedContract">
          <label class="align-self-start">Periodo</label>
          <ContractPlanSelector></ContractPlanSelector>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3" v-if="selectedContractPlan">
          <button
            type="button"
            class="btn btn-secondary edit-button"
            @click="startEditing"
            v-if="!isEditing"
          >
            Editar Disponibilidad
          </button>
          <button
            type="button"
            class="btn btn-secondary edit-button"
            @click="sendForm"
            v-if="isEditing"
          >
            Terminar Edición
          </button>
        </div>
      </div>

      <div v-if="contractPlan && !isEditing">
        <div class="row">
          <div
            class="col-sm-12 col-md-6 mb-4"
            v-for="(contractPlanDay, index) in contractPlan.contractPlanDays"
            :key="index"
          >
            <ReservationsTable
              v-if="!isEditing"
              :contractPlanDay="contractPlanDay"
            ></ReservationsTable>
          </div>
        </div>
      </div>

      <div v-if="contractPlan && isEditing">
        <ReservationsForm
          :reservationsForm="reservationsForm"
          v-if="isEditing"
          :contractPlan="contractPlan"
          :setReservationsForm="setReservationsForm"
        ></ReservationsForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref, watch } from "vue";
import getCompanies from "@/composables/getCompanies";
import { Company, Engineer, Contract, ContractPlan } from "@/typings/api";
import getContractEngineers from "@/composables/getContractEngineers";
import getCompanyContracts from "@/composables/getCompanyContracts";
import getContractPlan from "@/composables/getContractPlan";
import getContractPlans from "@/composables/getContractPlans";
import setReservations from "@/composables/setReservations";
import ReservationsTable from "@/components/Home/ReservationsTable.vue";
import CompanySelector from "@/components/Home/CompanySelector.vue";
import ContractSelector from "@/components/Home/ContractSelector.vue";
import ContractPlanSelector from "@/components/Home/ContractPlanSelector.vue";
import ReservationsForm from "@/components/Home/ReservationsForm.vue";

export default defineComponent({
  name: "Home",
  components: {
    ReservationsTable,
    CompanySelector,
    ContractSelector,
    ContractPlanSelector,
    ReservationsForm,
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
    let reservationsForm = ref<
      { timeSlotId: number; engineerId: number }[] | undefined
    >(undefined);
    let isEditing = ref<boolean>(false);

    const _getCompanies = async (): Promise<void> => {
      companies.value = await getCompanies();
    };

    const _getCompanyContracts = async (companyId: number): Promise<void> => {
      contracts.value = await getCompanyContracts(companyId);
    };

    const _getContractEngineers = async (contractId: number): Promise<void> => {
      engineers.value = await getContractEngineers(contractId);
    };

    const _getContractPlans = async (contractId: number): Promise<void> => {
      contractPlans.value = await getContractPlans(contractId);
    };

    const _getContractPlanTimeSlots = async (
      contractPlanId: number
    ): Promise<void> => {
      contractPlan.value = await getContractPlan(contractPlanId);
    };

    const startEditing = () => {
      isEditing.value = true;
    };

    const stopEditing = () => {
      isEditing.value = false;
    };

    const setReservationsForm = (
      reservations: { timeSlotId: number; engineerId: number }[]
    ): void => {
      reservationsForm.value = reservations;
    };

    const sendForm = async () => {
      if (contractPlan.value?.id && reservationsForm.value) {
        contractPlan.value = await setReservations(contractPlan.value.id, {
          reservations: reservationsForm.value,
        });
        reservationsForm.value = [];
      }
      isEditing.value = false;
    };

    onMounted(() => {
      _getCompanies();
    });

    watch(selectedCompanyId, (newValue) => {
      selectedCompany.value = companies.value.find((e) => e.id === newValue);
      selectedContractId.value = undefined;
      stopEditing();
    });

    watch(selectedCompany, () => {
      if (selectedCompany.value) _getCompanyContracts(selectedCompany.value.id);
    });

    watch(selectedContractId, (newValue) => {
      selectedContract.value = contracts.value.find((e) => e.id === newValue);
      selectedContractPlanId.value = undefined;
      stopEditing();
    });

    watch(selectedContract, () => {
      if (selectedContract.value) {
        _getContractPlans(selectedContract.value.id);
        _getContractEngineers(selectedContract.value.id);
      }
    });

    watch(selectedContractPlanId, (newValue) => {
      selectedContractPlan.value = contractPlans.value.find(
        (e) => e.id === newValue
      );
      contractPlan.value = undefined;
      stopEditing();
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
    provide("engineers", engineers);
    provide("isEditing", isEditing);

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
      selectedContractPlan,
      isEditing,
      startEditing,
      sendForm,
      reservationsForm,
      setReservationsForm,
    };
  },
});
</script>

<style lang="css">
.edit-button {
  height: 100%;
  width: 80%;
}
</style>
