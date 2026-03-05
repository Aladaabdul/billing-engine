import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () => {
    return `evt_${uuidv4()}`;
}