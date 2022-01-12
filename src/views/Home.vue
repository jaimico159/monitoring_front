<template>
  <div class="home">
    <div v-for="(company, index) in companies" :key="index">
      {{ company.name }}
    </div>

    <div v-for="(engineer, index) in engineers" :key="index">
      {{ engineer.displayName }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import getCompanies from "@/composables/getCompanies";
import { Company, Engineer } from "@/typings/api";
import getEngineers from "@/composables/getEngineers";

export default defineComponent({
  name: "Home",
  setup() {
    let companies = ref<Company[]>([]);
    let engineers = ref<Engineer[]>([]);

    const _getCompanies = async (): Promise<void> => {
      companies.value = await getCompanies();
    };

    const _getEngineers = async (): Promise<void> => {
      engineers.value = await getEngineers();
    };

    onMounted(() => {
      _getCompanies();
      _getEngineers();
    });

    return { companies, engineers };
  },
});
</script>
