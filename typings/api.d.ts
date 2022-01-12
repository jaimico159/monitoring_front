interface Company {
  name: string;
}

interface Engineer {
  firstName: string;
  lastName: string;
  displayName: string;
}

interface Contract {
  startAt: string;
  endAt: string;
  slotDuration: number;
  company: Company;
}

interface ContractPlan {
  contract: Contract;
  startDate: string;
  endDate: string;
  slotDuration: number;
  timeSlotsCount: number;
}

interface TimeSlot {
  startAt: string;
  duration: number;
  contract: Contract;
  contractPlan: ContractPlan;
  engineer: Engineer;
  reservations: Reservation[];
}

interface Reservation {
  engineer: Engineer;
  timeSlot: TimeSlot;
}
