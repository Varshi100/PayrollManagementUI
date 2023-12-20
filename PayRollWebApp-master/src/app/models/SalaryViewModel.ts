export class SalaryViewModel {
    id !: Number;
    userId !: string;
    firstName !: string
    lastName !: string
    email !: string
    phoneNumber !: string
    className !: string
    hrAllowance !: Number

    daAllowance !: Number
    travelAllowance !: Number
    medicalAllowance !: Number
    washingAllowance !: Number
    leaveDeduction !: Number

    month !: Date

    year !: Date

    basicSalary !: Number

    totalAllowances!: Number

    totalDeductions !: Number

    grossSalary !: Number

    netSalary !: Number
}