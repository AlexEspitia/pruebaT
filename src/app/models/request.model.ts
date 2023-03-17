export interface EmployeeRequest {
  id: number;
  name?: string;
}

export interface Request {
  code: string;
  description: string;
  summary: string;
  employee: EmployeeRequest;
}
