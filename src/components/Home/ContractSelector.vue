<template>
  <div id="selector">
    <select
      class="form-select"
      aria-label="companies"
      v-model="selectedContractId"
    >
      <option selected>Selecciona un contrato</option>
      <option
        v-for="(contract, index) in contracts"
        :key="index"
        :value="contract.id"
      >
        {{ contract.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "ContractSelector",
  setup() {
    const selectedContractId = inject("selectedContractId", undefined);
    const contracts = inject("contracts", []);

    return { selectedContractId, contracts };
  },
});
</script>
