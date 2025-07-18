
export const matchScholarships = (profile, scholarships) => {
    if(!profile || !scholarships || scholarships.length === 0) {    // check for valid entries
        return [];
    }

    //will use ranking system to match best scholarships
    
    return scholarships.map(scholarship =>{
         if(scholarship.require){}      
            if(scholarship.require.major !== profile.major){
                return null;
            }
            if (scholarship.require.minGPA && profile.gpa < scholarship.require.minGPA) {
                return null;
        }
    });
}