export interface EmployeeEvent {
    id: number,
    name: string,
    date: Date,
    max_participants: number,
    location_x: string,
    location_y: string,
    type: string,
    location_name: string,
    employee_id: number,
};

export interface Employee {
    id: number,
    email: string,
    name: string,
    surname: string,
    birth_date: string,
    gender: string,
    work: string,
    events?: Array<EmployeeEvent>,
    imageId?: string,
    lastConnection?: Date,
    password?: string,
};
