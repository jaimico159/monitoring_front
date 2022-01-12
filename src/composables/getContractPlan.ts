import API_SCHEMA_V1 from "@/utils/api_schema_v1";
import axios from "axios";

const getContractPlan = async (
  contractPlanId: number
): Promise<ContractPlan> => {
  const { contract_plan }: { contract_plan: APIContractPlan } = await axios.get(
    API_SCHEMA_V1.contractPlans.getContractPlanTimeSlots(contractPlanId)
  );

  return {
    id: contract_plan.id,
    startDate: contract_plan.start_date,
    endDate: contract_plan.end_date,
    slotDuration: contract_plan.slot_duration,
    contractId: contract_plan.contract_id,
    contractPlanDays: contract_plan.contract_plan_days.map(
      (contractPlanDay: APIContractPlanDay) => {
        return {
          id: contractPlanDay.id,
          currentDay: contractPlanDay.current_date,
          contractPlanId: contractPlanDay.contract_plan_id,
          timeSlots: contractPlanDay.time_slots.map((timeSlot) => {
            return {
              id: timeSlot.id,
              startAt: timeSlot.start_at,
              duration: timeSlot.duration,
              contractId: timeSlot.contract_id,
              contractPlanId: timeSlot.contract_plan_id,
              contractPlanDayId: timeSlot.contract_plan_day_id,
              engineerId: timeSlot.engineer_id,
            };
          }),
        };
      }
    ),
  };
};

export default getContractPlan;
