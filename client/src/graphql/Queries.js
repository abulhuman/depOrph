export const ALL_ORPHANS_SEARCH_QUERY = `
    query($filter: String){
        allOrphans(take: 100 filter: $filter){
            id
            firstName
            fatherName
            grandFatherName
            greatGrandFatherName
            gender
            dateOfBirth
            sponsorshipStatus
            mother{
            firstName
            middleName
            lastName
            }
            guardian{
            firstName
            middleName
            lastName
            }
        }
    }`;
