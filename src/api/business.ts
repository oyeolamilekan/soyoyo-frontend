import { axiosInstance } from "../config";

export const fetchBusiness = async () => {
    const { data } = await axiosInstance.get('business/all_businesses');
    return data;
}

export const createBusiness = async (body: Object) => {
    const { data } = await axiosInstance.post('business/create_business', body);
    return data;
}

export const businessApiKeys = async (business_slug: String) => {
    const { data } = await axiosInstance.get(`business/api_keys/${business_slug}`);
    return data;
}

export const generateAPIKey = async (business_slug: String) => {
    const { data } = await axiosInstance.post(`business/generate_api_key/${business_slug}`);
    return data;
}

export const fetchAPIKey = async (slug: string) => {
    const { data } = await axiosInstance.get(`business/api_keys/${slug}`);
    return data;
}

export const editBusiness = async (body: any) => {
    const slug = body.slug
    delete body.slug;
    const { data } = await axiosInstance.put(`business/edit_business/${slug}`, body);
    return data;
}