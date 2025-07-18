export interface ScholarshipRequirements{
    study_field: string;
    min_GPA: number;
    min_age: number;
    max_age: number;
    citizenship: boolean;
    resident: boolean;
}

export interface Scholarship{
    name:string;
    amount:number;
    due_date:string;
    requirements?:ScholarshipRequirements;
    description:string;
}
export interface StudentProfile {
    firstName: string;
    lastName: string;
    email: string;
    school?: string;    
    major: string;
    minor: string;
    gpa: string;        
    gradYear: string;   
    age?: number;       
    extracurriculars?: string;
    awards?: string;
}