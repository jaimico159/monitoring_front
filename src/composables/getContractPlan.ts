import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import dateFormatter from "@/utils/dateFormatter";
import axios from "axios";

const getContractPlan = async (
  contractPlanId: number
): Promise<ContractPlan> => {
  const { data }: { data: APIContractPlan } = await axios.get(
    API_SCHEMA_V1.contractPlans.getContractPlanTimeSlots(contractPlanId)
  );

  return {
    id: data.id,
    startDate: dateFormatter.formatDateToHuman(data.start_date),
    endDate: data.end_date,
    slotDuration: data.slot_duration,
    contractId: data.contract_id,
    contractPlanDays: data.contract_plan_days.map(
      (contractPlanDay: APIContractPlanDay): ContractPlanDay => {
        return {
          id: contractPlanDay.id,
          currentDate: dateFormatter.dateToTextFormat(
            contractPlanDay.current_date
          ),
          contractPlanId: contractPlanDay.contract_plan_id,
          timeSlots: contractPlanDay.time_slots.map(
            (timeSlot: APITimeSlot): TimeSlot => {
              return {
                id: timeSlot.id,
                startAt: dateFormatter.getHourFromStringDateTime(
                  timeSlot.start_at
                ),
                endAt: dateFormatter.getHourFromDateTime(
                  dateFormatter.addSecondsToStringDateTime(
                    timeSlot.start_at,
                    timeSlot.duration
                  )
                ),
                duration: timeSlot.duration,
                contractId: timeSlot.contract_id,
                contractPlanId: timeSlot.contract_plan_id,
                contractPlanDayId: timeSlot.contract_plan_day_id,
                engineerId: timeSlot.engineer_id,
                engineer: {
                  id: timeSlot.engineer?.id,
                  firstName: timeSlot.engineer?.first_name,
                  lastName: timeSlot.engineer?.last_name,
                  displayName: timeSlot.engineer?.display_name,
                  color: timeSlot.engineer?.color,
                },
                reservations: timeSlot.reservations.map(
                  (reservation: APIReservation): Reservation => {
                    return {
                      id: reservation.id,
                      engineerId: reservation.engineer_id,
                      timeSlotId: reservation.time_slot_id,
                    };
                  }
                ),
              };
            }
          ),
        };
      }
    ),
  };
};

export default getContractPlan;
