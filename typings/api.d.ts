interface APICompany {
  id: number;
  name: string;
}

interface APIContract {
  id: number;
  name: string;
  start_at: string;
  end_at: string;
  slot_duration: number;
  company_id: number;
  company?: Company;
}

interface APIContractPlan {
  id: number;
  contract_id: number;
  start_date: string;
  end_date: string;
  slot_duration: number;
  contract_plan_days: APIContractPlanDay[];
}

interface APIContractPlanDay {
  id: number;
  current_date: string;
  contract_plan_id: number;
  time_slots: APITimeSlot[];
}

interface APITimeSlot {
  id: number;
  start_at: string;
  duration: integer;
  contract_id: number;
  contract_plan_id: number;
  contract_plan_day_id: number;
  engineer_id: number | null;
}
interface APIEngineer {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
}

interface Company {
  id: number;
  name: string;
}

interface Engineer {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
}

interface Contract {
  id: number;
  name: string;
  startAt: string;
  endAt: string;
  slotDuration: number;
  companyId: number;
  company?: Company;
}

interface ContractPlan {
  id: number;
  contract?: Contract;
  startDate: string;
  endDate: string;
  slotDuration: number;
  contractId: number;
  contractPlanDays: ContractPlanDay[];
}

interface ContracPlanDay {
  id: number;
  currentDate: string;
  contractPlanId: number;
  timeSlots: TimeSlot[];
}

interface TimeSlot {
  id: number;
  startAt: string;
  duration: number;
  contract?: Contract;
  contractPlan?: ContractPlan;
  engineer?: Engineer;
  reservations?: Reservation[];
  contractId: number;
  contractPlanId: number;
  contractPlanDayId: number;
}

interface Reservation {
  id: number;
  engineer: Engineer;
  timeSlot: TimeSlot;
}
