<template>
  <div class="home">
    <div v-for="(company, index) in companies" :key="index">
      {{ company.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import getCompanies from "@/composables/getCompanies";
import { Company } from "@/typings/api";

export default defineComponent({
  name: "Home",
  setup() {
    let companies = ref<Company[]>([]);

    const _getCompanies = async (): Promise<void> => {
      companies.value = await getCompanies();
    };

    onMounted(_getCompanies);

    return { companies };
  },
});
</script>
