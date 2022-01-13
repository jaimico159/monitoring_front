<template>
  <div id="selector">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "CompanySelector",
  setup() {
    const selectedCompanyId = inject("selectedCompanyId", undefined);
    const companies = inject("companies", []);

    return { selectedCompanyId, companies };
  },
});
</script>
