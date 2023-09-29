export interface CompanyData {
    message: string,
    data: Company
}

export interface CompaniesData {
    message: string,
    data: Company[]
}


export interface Company {
    _id: string,
    name: string
}

