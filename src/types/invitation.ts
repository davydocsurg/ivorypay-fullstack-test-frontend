import { User } from "./user";

export interface Invitation {
    id: string;
    email: string;
    accepted: boolean;
    invitee: User;
    inviter: User;
}
