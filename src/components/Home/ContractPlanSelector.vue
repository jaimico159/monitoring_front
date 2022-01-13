<template>
  <div id="selector">
    <select
      class="form-select"
      aria-label="companies"
      v-model="selectedContractPlanId"
    >
      <option selected>Selecciona un contrato</option>
      <option
        v-for="(contractPlan, index) in contractPlans"
        :key="index"
        :value="contractPlan.id"
      >
        {{ `Del ${contractPlan.startDate} al ${contractPlan.endDate}` }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "ContractPlanSelector",
  setup() {
    const selectedContractPlanId = inject("selectedContractPlanId", undefined);
    const contractPlans = inject("contractPlans", []);

    return { selectedContractPlanId, contractPlans };
  },
});
</script>
