export type UserType = {
    _id: string;
    full_name: string;
    email: string;
    role: "admin" | "user" | "pickuppartner";
    status?: string;
}