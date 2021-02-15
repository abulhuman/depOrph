# Realtionships Carinalities
## Realtionships between all entities that are currently in the schema

**Database - Server**

### Donor ✅
- `Donor` [1:M] `SupportPlan` - [1:M]
- `Donor` [1:M] `PeasantAssociation` - [1:M]
- `Donor` [1:M] `Orphan` - [1:M]

### Education ✅
- `Education` [1:M] `EducationalRecord` -  [1:M]
- `Education` [1:M] `Orphan` - [1:1]

### Father ✅
- `Father` [1:M] `Orphan` - [1:M]

### Guardian ✅
- `Guardian` [1:M] `Orphan` - [1:M]

### Mother ✅
- `Mother` [1:M] `Orphan` - [1:M]
- `Mother` [1:M] `MotherJob` - [1:M]

### MotherJob ✅
- `MotherJob` [M:1] `Mother` - [M:1]

### Orphan ✅
- `Orphan` [1:M] `SponsorshipStatus` - [1:M]
- `Orphan` [1:M] `FinancialRecord` - [1:M]
- `Orphan` [1:M] `HealthRecord` - [1:M]
- `Orphan` [M:1] `Education` - [1:1]
- `Orphan` [1:M] `OrphanPhotos` - [1:M]
- `Orphan` [M:1] `House_property` - [1:1] 
- `Orphan` [N:M] `Sibling` - [N:M]
- `Orphan` [M:1] `Father` - [M:1]
- `Orphan` [M:1] `Mother` - [M:1]
- `Orphan` [M:1] `Guardian` - [M:1] 
- `Orphan` [M:1] `SocialWorker` - [M:1]
- `Orphan` [M:1] `PeasntAssociation` - [M:1]
- `Orphan` [M:1] `District` - [M:1]
- `Orphan` [M:1] `SupportPlan` - [M:1]
- `Orphan` [M:1] `Donor` - [M:1]

### SocialWorker ✅
- `SocialWorker` [M:1] `PeasantAssociation` - [M:1]
- `SocialWorker` [1:M] `Orphan` - [1:M]

### District ✅
- `District` [1:M] `Orphan` - [1:M]
- `District` [1:M] `PeasantAssociation` - [1:M]

### EducationalRecord ✅
- `EducationalRecord` [M:1] `Education` - [M:1]

### FinancialRecord ✅
- `FinancialRecord` [M:1] `Orphan` - [M:1]

### HealthRecord ✅
- `HealthRecord` [M:1] `Orphan` - [M:1]

### House_property ✅
- `House_property` [1:M] `Orphan` - [1:M]

### OrphanPhotos ✅`
- `OrphanPhotos` [M:1] `Orphan` - [M:1]

### PeasantAssociation ✅
- `PeasantAssociation` [M:1] `District` - [M:1]
- `PeasantAssociation` [M:1] `Donor` - [M:1]
- `PeasantAssociation` [1:M] `Orphan` - [1:M]
- `PeasantAssociation` [1:M] `SocialWorker` - [1:M]

### SponsorshipStatus ✅
- `SponsorshipStatus` [M:1] `Orphan` - [M:1]

### SupportPlan ✅
- `SupportPlan` [M:1] `Donor` - [M:1]
- `SupportPlan` [1:M] `Orphan` - [1:M]
