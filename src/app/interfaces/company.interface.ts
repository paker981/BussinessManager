export interface CompanyData {
    message: string,
    data: OrginalCompany
}

export interface CompaniesData {
    message: string,
    data: OrginalCompany[]
}


export interface OrginalCompany {
    _id: string,
    name: string
}

export interface Company {
    id: string,
    name: string
}
