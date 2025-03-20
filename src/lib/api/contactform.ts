// import { apiClient } from "@/lib/axiosClient";
// import {FormData} from "@/components/Sections/ContactUs";

// export const contactFormApi = {
//     getAll: async (contactId: string): Promise<FormData[]> => {
//         const response = await apiClient.get("/api/send/contactform");
//         return response.data.contactForm;
//     },
    
//     getById: async (id: string): Promise<FormData> => {
//         const response = await apiClient.get(`/api/send/contactform/${id}`);
//         return response.data;
//     },
//     create: async (formData: FormData, headers: unknown, p0: { "Content-Type": string; }): Promise<FormData> => {
//         const response = await apiClient.post("/api/send/contactform", formData);
//         return response.data;
//     },
// }