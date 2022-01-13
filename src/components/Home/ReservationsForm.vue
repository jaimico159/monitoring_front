<template>
  <div class="row">
    <div
      class="col-sm-12 col-md-6 mb-4"
      v-for="(contractPlanDay, index) in props.contractPlan.contractPlanDays"
      :key="index"
    >
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
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref, watch } from "vue";
import { ContractPlan, Engineer } from "@/typings/api";

export default defineComponent({
  name: "ReservationsForm",
  props: {
    contractPlan: Object as PropType<ContractPlan>,
    setReservationsForm: Function,
  },
  setup(props) {
    const engineers: Engineer[] = inject("engineers", []);

    let reservs: Array<{ timeSlotId: number; engineerId: number }> = [];

    props.contractPlan?.contractPlanDays.forEach((cpd) => {
      cpd.timeSlots.forEach((ts) => {
        ts.reservations?.forEach((res) => {
          reservs.push({
            timeSlotId: res.timeSlotId,
            engineerId: res.engineerId,
          });
        });
      });
    });

    let reservations = ref<{ timeSlotId: number; engineerId: number }[]>([]);

    if (reservs !== undefined) reservations.value = reservs;

    watch(reservations, (newValue) => {
      props.setReservationsForm && props.setReservationsForm(newValue);
    });

    return { engineers, reservations, props };
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
