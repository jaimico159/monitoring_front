<template>
  <div id="reservations_form">
    <div class="card">
      <div class="card-header day-header">
        <strong>{{ contractPlanDay.currentDate }}</strong>
        <ul class="list-group list-group-horizontal">
          <li
            class="list-group-item"
            v-for="(engineer, index) in engineers"
            :key="index"
          >
            {{ engineer.displayName }}
          </li>
        </ul>
      </div>
      <ul
        class="list-group list-group-horizontal"
        v-for="(timeSlot, index) in contractPlanDay.timeSlots"
        :key="index"
      >
        <li
          class="list-group-item"
          v-bind:class="timeSlot.engineerId ? '' : 'empty-slot'"
        >
          {{ timeSlot.startAt }} - {{ timeSlot.endAt }}
        </li>
        <li class="list-group-item flex-fill">
          {{ timeSlot.engineer ? timeSlot.engineer.displayName : "⚠️" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from "vue";
import { ContractPlanDay, Engineer } from "@/typings/api";

export default defineComponent({
  name: "ReservationsForm",
  props: {
    contractPlanDay: Object as PropType<ContractPlanDay>,
  },
  setup() {
    const engineers: Engineer[] = inject("engineers", []);

    console.log(engineers);

    return { engineers };
  },
});
</script>

<style lang="css" scoped>
.empty-slot {
  background-color: #ff05054d;
}
.day-header {
  background-color: rgb(250, 227, 95);
}
</style>
