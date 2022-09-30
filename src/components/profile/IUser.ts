export interface ICompany {
    id: number,
    name: string,
}

export interface ITeam {
    id: number,
    name: string,
    company: ICompany
}

export interface IJob {
    id: number,
    name: string,
    company: ICompany
}

export interface IUser {
    email: string,
    firstname: string, 
    lastname: string,
    picture: string,
    company: ICompany,
    //company: Pick<ICompany, "id"|"name">,
    id:number
    teams: ITeam[],
    job: IJob
}