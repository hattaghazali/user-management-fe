export enum EStatus {
    Active = 1,
    Deactive = 2
}

export enum EOccupation {
    Student = 1,
    Employee = 2
}

export enum EGender {
    Male = 1,
    Female = 2
}

export enum EState {
    Johor = 1,
    Kedah = 2,
    Kelantan = 3,
    Melaka = 4,
    NegeriSembilan = 5,
    Pahang = 6,
    PulauPinang = 7,
    Perak = 8,
    Perlis = 9,
    Selangor = 10,
    Terengganu = 11,
    Sabah = 12,
    Sarawak = 13,
    WilayahPersekutuanKualaLumpur = 14,
    WilayahPersekutuanLabuan = 15,
    WilayahPersekutuanPutrajaya = 16
}

export interface IUser {
    _id: string;
    email: string;
    password: string;
    name: string;
    gender: EGender;
    occupation: EOccupation;
    state: EState;
    avatar?: {
        img_url: string;
    };
    status: EStatus;
    createdAt: string;
    updatedAt: string;
}

export interface IUserReduced extends Omit<IUser, 'password' | 'updatedAt'> {}

export const stateMap: Record<EState, string> = {
    [EState.Johor]: 'Johor',
    [EState.Kedah]: 'Kedah',
    [EState.Kelantan]: 'Kelantan',
    [EState.Melaka]: 'Melaka',
    [EState.NegeriSembilan]: 'Negeri Sembilan',
    [EState.Pahang]: 'Pahang',
    [EState.PulauPinang]: 'Pulau Pinang',
    [EState.Perak]: 'Perak',
    [EState.Perlis]: 'Perlis',
    [EState.Selangor]: 'Selangor',
    [EState.Terengganu]: 'Terengganu',
    [EState.Sabah]: 'Sabah',
    [EState.Sarawak]: 'Sarawak',
    [EState.WilayahPersekutuanKualaLumpur]: 'Wilayah Persekutuan Kuala Lumpur',
    [EState.WilayahPersekutuanLabuan]: 'Wilayah Persekutuan Labuan',
    [EState.WilayahPersekutuanPutrajaya]: 'Wilayah Persekutuan Putrajaya'
};

export const statusMap: Record<EStatus, string> = {
    [EStatus.Active]: 'Active',
    [EStatus.Deactive]: 'Deactive'
};

export const occupationMap: Record<EOccupation, string> = {
    [EOccupation.Student]: 'Student',
    [EOccupation.Employee]: 'Employee'
};

export const genderMap: Record<EGender, string> = {
    [EGender.Male]: 'Male',
    [EGender.Female]: 'Female'
};
