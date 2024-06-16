export const REQUESTS_KEY = 'requests';

export const HIGH_PRIORITY = 'High';
export const MEDIUM_PRIORITY = 'Medium';
export const LOW_PRIORITY = 'Low';
export const URGENCY_LEVELS = [HIGH_PRIORITY, MEDIUM_PRIORITY, LOW_PRIORITY];

export type Priority = typeof HIGH_PRIORITY | typeof MEDIUM_PRIORITY | typeof LOW_PRIORITY;

export const PENDING_STATUS = 'Pending';
export const COMPLETED_STATUS = 'Completed';

export type Status = typeof PENDING_STATUS | typeof COMPLETED_STATUS;

export type Request = {
  id: number;
  date: string;
  caseId: string;
  description: string;
  urgency: Priority;
  status: Status;
  reply?: string;
};

let requests: Request[] = [
  createData(
    1221,
    '12 Jun, 2024',
    'Device 004',
    'Low inventory of Ibuprofen. Please confirm restocking.',
    MEDIUM_PRIORITY,
    PENDING_STATUS,
  ),
  createData(
    4123,
    '13 Jun, 2024',
    'Device 005',
    'Malfunction in the dispensing mechanism. Please confirm repair.',
    MEDIUM_PRIORITY,
    COMPLETED_STATUS,
    'The issue has been resolved.'
  ),
  createData(
    8743,
    '13 Jun, 2024',
    'Device 006',
    'Successful restock of Paracetamol. Please confirm receipt.',
    HIGH_PRIORITY,
    COMPLETED_STATUS,
    'The inventory has been received.'
  ),
  createData(
    1231,
    '16 Jun, 2024',
    'Device 001',
    'Unauthorized access attempt. Please confirm security check.',
    HIGH_PRIORITY,
    COMPLETED_STATUS,
    'The security check has been completed.'
  ),
  createData(
    5542,
    '16 Jun, 2024',
    'Device 002',
    'Temperature fluctuation in the storage area. Please confirm temperature adjustment.',
    HIGH_PRIORITY,
    PENDING_STATUS,
  ),
  createData(
    7782,
    '16 Jun, 2024',
    'Device 003',
    'Reports a power outage. Please confirm power restoration.',
    MEDIUM_PRIORITY,
    PENDING_STATUS,
  ),
];

function createData(
  id: number,
  date: string,
  caseId: string,
  description: string,
  urgency: Priority,
  status: Status,
  reply?: string,
): Request {
  return { id, date, caseId, description, urgency, status, reply };
}

export const fetchRequests = async (): Promise<Request[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...requests]);
    }, 1000);
  });
};

export const updateRequest = async (updatedRequest: Request): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const request = requests.find((request) => request.id === updatedRequest.id);
      if (request) {
        request.status = COMPLETED_STATUS;
        request.reply = updatedRequest.reply;
        resolve();
      } else {
        reject(new Error('Invalid id'));
      }
    }, 100);
  });
}

export const addRequest = async (request: Request): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      requests.push(request);
      resolve();
    }, 100);
  });
};

export const deleteRequest = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = requests.findIndex((request) => request.id === id);
      if (index !== -1) {
        requests.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Invalid id'));
      }
    }, 0);
  });
};