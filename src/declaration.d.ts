declare module '*.png' {
    const value: any;
    export default value;
}


interface ICompany {
    _id: string;
    _v: number;
    name: string;
    type?: string;
    primary_role?: string;
    cb_url?: string;
    domain?: string;
    homepage_url?: string;
    logo_url?: string;
    facebook_url?: string;
    twitter_url?: string;
    linkedin_url?: string;
    city?: string;
    region?: string;
    country_code?: string;
    short_description: string;
    industries?: string;
    founded_date?: Date;
    founders?: string;
    no_emp?: string;
    isActive?: boolean
}