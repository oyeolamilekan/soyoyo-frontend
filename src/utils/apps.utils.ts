import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom"

export const checkIfActive = (route: string) => {
    const location = useLocation();
    const currentRoute = location.pathname;
    return route === currentRoute
}

export const getCountryFlag = (key: string) => {
    const data: any = {
        'dollar': '$, USD 🇺🇸',
        'euro': '€, EURO 🇪🇺',
        'british_pounds': '£, GBP 🇬🇧'
    }
    return data[key] ?? '';
}

export const removeUnderScore = (name: string) => {
    return name.replaceAll("_", " ")
}

export const formatDate = (date: string): string => {
  return moment(date).format("MMMM Do YYYY");
};

export const formatNumber = (amount: string, decimalPoint: number = 2) => {

    return parseInt(amount).toLocaleString('en-US', {
        minimumFractionDigits: decimalPoint,
        maximumFractionDigits: 2
      });
}

export const generateId = (length = 5) => Math.random().toString(36).substr(2, length);

export const redirectUrl = (url: string) => window.open(url, "_self")
