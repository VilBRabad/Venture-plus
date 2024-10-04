declare module '*.png' {
    const value: any;
    export default value;
}


interface ICompany {
    _id: string;
    _v: number;
    Company: string;
    Company_name_for_email?: string;
    Account_stage?: string;
    Employees?: number;
    Industry?: string;
    Website?: string;
    Linkedin_url?: string;
    Facebook_url?: string;
    Twitter_url?: string;
    City?: string;
    State?: string;
    Country?: string;
    Postal_code?: string;
    Address?: string;
    Keywords?: string[];
    Phone_number?: string;
    Technologies?: string[];
    Total_funding?: number;
    Latest_funding?: string;
    Latest_funding_amount?: number;
    Last_raised_at?: string;
    Annual_revenue?: number;
    SIC_codes?: string;
    Short_description?: string;
    Founded_year?: number;
    logo?: string;
    Stock_symbol?: string
}