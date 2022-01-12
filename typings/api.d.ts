interface APICompany {
  id: number;
  name: string;
}

interface APIContract {
  id: number;
  start_at: string;
  end_at: string;
  slot_duration: number;
  company_id: number;
  company?: Company;
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
  startAt: string;
  endAt: string;
  slotDuration: number;
  companyId: number;
  company?: Company;
}

interface ContractPlan {
  id: number;
  contract: Contract;
  startDate: string;
  endDate: string;
  slotDuration: number;
  timeSlotsCount: number;
}

interface TimeSlot {
  id: number;
  startAt: string;
  duration: number;
  contract: Contract;
  contractPlan: ContractPlan;
  engineer: Engineer;
  reservations: Reservation[];
}

interface Reservation {
  id: number;
  engineer: Engineer;
  timeSlot: TimeSlot;
}
