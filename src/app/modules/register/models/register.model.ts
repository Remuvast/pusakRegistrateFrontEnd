export interface PasswordSecurity {
    password: string;
    confirmPassword: string;
    securityQuestionOne: string;
    securityAnswerOne: string;
    securityQuestionTwo: string;
    securityAnswerTwo: string;
    securityQuestionThree: string;
    securityAnswerThree: string;
}

export interface PersonalInformation {
    identificationType: string;
    identification: string;
    fullName: string;
    lastName: string;
    name: string;
    birthdate: string;
    gender: string;
    maritalStatus: string;
    ethnicity: string;
    disability: boolean;
    disabilityType: string;
    disabilityPercent: string;
    nacionality: string;
    emailAddress: string;
    confirmEmailAddress: string;
    secondEmailAddress: string;
    phoneNumber: string;
    cellPhone: string;
    secondCellPhone: string;
}

export interface PlaceBirth {
    country: string;
    province: string;
    placeBirth: string;
    city: string;
    parish: string;
}

export interface PlaceResidence {
    country: string;
    province: string;
    city: string;
    parish: string;
    zone: string;
    sector: string;
    street: string;
    secondaryStreet: string;
    number: string;
    geographicReference: string;
    postalCode: string;
}

export interface IRegister {
    identificationType: string;
    identification: string;
    fullName: string;
    lastName: string;
    name: string;
    birthdate: string;
    gender: string;
    maritalStatus: string;
    ethnicity: string;
    disability: boolean;
    disabilityType: string;
    disabilityPercent: number | null;
    nacionality: string;
    emailAddress: string;
    confirmEmailAddress: string;
    secondEmailAddress: string;
    phoneNumber: string;
    cellPhone: string;
    secondCellPhone: string;
    password: string;
    confirmPassword: string;
    securityQuestionOne: string;
    securityAnswerOne: string;
    securityQuestionTwo: string;
    securityAnswerTwo: string;
    securityQuestionThree: string;
    securityAnswerThree: string;
    countryBirth: string;
    provinceBirth: string;
    placeBirth: string;
    cityBirth: string;
    parishBirth: string;
    countryResidence: string;
    provinceResidence: string;
    cityResidence: string;
    parishResidence: string;
    zone: string;
    sector: string;
    street: string;
    secondaryStreet: string;
    number: string;
    geographicReference: string;
    postalCode: string;
}

export const init: IRegister = {
    identificationType: '',
    identification: '',
    fullName: '',
    lastName: '',
    name: '',
    birthdate: '',
    gender: '',
    maritalStatus: '',
    ethnicity: '',
    disability: false,
    disabilityType: '',
    disabilityPercent: null,
    nacionality: '',
    emailAddress: '',
    confirmEmailAddress: '',
    secondEmailAddress: '',
    phoneNumber: '',
    cellPhone: '',
    secondCellPhone: '',
    password: '',
    confirmPassword: '',
    securityQuestionOne: '',
    securityAnswerOne: '',
    securityQuestionTwo: '',
    securityAnswerTwo: '',
    securityQuestionThree: '',
    securityAnswerThree: '',
    countryBirth: '',
    provinceBirth: '',
    placeBirth: '',
    cityBirth: '',
    parishBirth: '',
    countryResidence: '',
    provinceResidence: '',
    cityResidence: '',
    parishResidence: '',
    zone: '',
    sector: '',
    street: '',
    secondaryStreet: '',
    number: '',
    geographicReference: '',
    postalCode: '',
}

export interface Step {
    name: string; 
    completed?: boolean;
}