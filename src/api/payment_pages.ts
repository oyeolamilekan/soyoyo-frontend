import { axiosInstance } from "../config";

export const fetchPaymentPages = async (slug: string) => {
    const { data } = await axiosInstance.get(`payment_page/fetch_payment_pages/${slug}`);
    return data;
}

export const fetchPaymentPage = async (slug: string) => {
    const { data } = await axiosInstance.get(`payment_page/fetch_payment_page/${slug}`);
    return data;
}

export const createPaymentPage = async (body: any) => {
    const { data } = await axiosInstance.post(`payment_page/create_payment_page`, body);
    return data;
}

export const updatePaymentPage = async (body: any) => {
    const business_slug = body.business_slug
    const page_slug = body.page_slug
    delete body.business_slug
    delete body.page_slug
    const { data } = await axiosInstance.patch(`payment_page/${business_slug}/update_payment_page/${page_slug}`, body);
    return data;
}

export const deletePaymentPage = async (values: any) => {
    const { business_slug, page_slug } = values
    const { data } = await axiosInstance.delete(`payment_page/${business_slug}/delete_payment_page/${page_slug}`);
    return data;
}

export const fetchPublicPaymentProviders = async (slug: string) => {
    const { data } = await axiosInstance.get(`payment_page/fetch_public_providers/${slug}`);
    return data;
}

export const fetchPaymentPagesSummary = async (slug: string) => {
    const { data } = await axiosInstance.get(`payment_page/fetch_payment_page_summary/${slug}`);
    return data;
}
