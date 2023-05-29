import { axiosInstance } from "../config";

export const addProvider = async (body: any) => {
    const { slug } = body
    delete body.slug;
    const { data } = await axiosInstance.post(`provider/add_provider/${slug}`, body);
    return data;
}

export const editProvider = async (body: any) => {
    const { slug } = body
    delete body.slug;
    const { data } = await axiosInstance.put(`provider/edit_provider/${slug}`, body);
    return data;
}

export const removeProvider = async (body: any) => {
    const { slug, currentProviderId } = body
    const { data } = await axiosInstance.delete(`provider/${currentProviderId}/remove_provider/${slug}`);
    return data;
}

export const fetchPaymentProviders = async (slug: string) => {
    const { data } = await axiosInstance.get(`provider/linked_providers/${slug}`);
    return data;
}

export const fetchAllPaymentProviders = async () => {
    const { data } = await axiosInstance.get('provider/all_providers');
    return data;
}