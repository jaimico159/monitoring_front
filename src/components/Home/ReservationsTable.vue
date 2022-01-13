<template>
  <div id="reservations">
    <div class="card">
      <div class="card-header day-header">
        <strong>{{ contractPlanDay.currentDate }}</strong>
      </div>
      <ul
        class="list-group list-group-horizontal"
        v-for="(timeSlot, index) in contractPlanDay.timeSlots"
        :key="index"
      >
        <li
          class="list-group-item"
          v-bind:class="timeSlot.engineerId ? 'filled-slot' : 'empty-slot'"
        >
          {{ timeSlot.startAt }} - {{ timeSlot.endAt }}
        </li>
        <li
          class="list-group-item flex-fill"
          :style="{ backgroundColor: timeSlot.engineer.color }"
        >
          {{
            timeSlot.engineer.displayName ? timeSlot.engineer.displayName : "⚠️"
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ContractPlanDay } from "@/typings/api";

export default defineComponent({
  name: "ReservationsTable",
  props: {
    contractPlanDay: Object as PropType<ContractPlanDay>,
  },
});
</script>

<style lang="css" scoped>
.empty-slot {
  background-color: #ff05054d;
}
.filled-slot {
  background-color: rgb(138, 253, 84);
}
.day-header {
  background-color: rgb(250, 227, 95);
}
</style>
