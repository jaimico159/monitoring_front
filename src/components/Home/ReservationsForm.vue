<template>
  <div id="reservations_form">
    <div class="card">
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item" style="width: 200px">
          <strong>{{ contractPlanDay.currentDate }}</strong>
        </li>
        <li
          class="list-group-item flex-fill"
          v-for="(engineer, index) in engineers"
          :key="index"
        >
          {{ engineer.displayName }}
        </li>
      </ul>
      <ul
        class="list-group list-group-horizontal"
        v-for="(timeSlot, index) in contractPlanDay.timeSlots"
        :key="index"
      >
        <li
          class="list-group-item"
          style="width: 200px"
          v-bind:class="timeSlot.engineerId ? '' : 'empty-slot'"
        >
          {{ timeSlot.startAt }} - {{ timeSlot.endAt }}
        </li>
        <li
          class="list-group-item flex-fill"
          v-for="(engineer, index) in engineers"
          :key="index"
        >
          <input
            type="checkbox"
            :value="{ timeSlotId: timeSlot.id, engineerId: engineer.id }"
            v-model="reservations"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, provide, ref, watch } from "vue";
import { ContractPlanDay, Engineer } from "@/typings/api";

export default defineComponent({
  name: "ReservationsForm",
  props: {
    contractPlanDay: Object as PropType<ContractPlanDay>,
  },
  setup(props) {
    const engineers: Engineer[] = inject("engineers", []);
    let reservs: Array<{ timeSlotId: number; engineerId: number }> = [];
    if (props.contractPlanDay) {
      props.contractPlanDay.timeSlots.forEach((timeSlot) => {
        if (timeSlot.reservations) {
          timeSlot.reservations.forEach((reserv) => {
            reservs.push({
              engineerId: reserv.engineerId,
              timeSlotId: reserv.timeSlotId,
            });
          });
        }
      });
    }

    const reservations = ref<Array<{ timeSlotId: number; engineerId: number }>>(
      []
    );
    if (reservs !== undefined) reservations.value = reservs;

    watch(reservations, () => {
      reservations.value.forEach((e) => console.log(e));
    });

    const clickCheckBox = (e: Event) => {
      console.log(e);
    };

    provide("reservationsForm", { reservations: reservations });

    return { engineers, reservations, clickCheckBox };
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
