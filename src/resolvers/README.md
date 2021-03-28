# Mutation Implementation Guide

## Connect one-to-many relations as many-to-one

> Create mutation on `mutation.createOrphan`

```js
return await prisma.orphan.create({
    data: {
        ...
        supportPlanId: args.supportPlanId ? parseInt(args.supportPlanId) : null,
        ...
    }
});
```

> Update muation on `mutation.updateOrphan`

```js
...
const prevSupportPlan = await prisma.orphan.findUnique({ where: { id: args.id } }).supportPlan();
const prevSupportPlanId = prevSupportPlan ? prevSupportPlan.id : null;
...
retrun await prisma.orphan.create({
    data: {
        ...
        supportPlanId: args.supportPlanId
        ? parseInt(args.supportPlanId)
        : prevSupportPlanId,
        ...
    }
});
```

## Connect one-to-many relations as one-to-one

> Create mutation on `mutation.createOrphan`

```js
...
const educationIds = args.education
    ? [...args.education].map((val) => ({ id: parseInt(val) }))
    : [];

return await prisma.orphan.create({
   data: {
       ...
       education: { connect: educationIds[0] }
       ...
       }
});
```

> Update muation on `mutation.updateOrphan`

```js
const educationIds = args.education
    ? [...args.education].map((val) => ({ id: parseInt(val) }))
    : [];

return await prisma.orphan.create({
   data: {
       ...
       education: { connect: educationIds[0] }
       ...
   }
});
```

## connect one-to-many relations as one-to-many

> Create mutation on `mutation.createOrphan`

```js
const finRecIds = args.financialRecords
  ? [...args.financialRecords].map((val) => ({
      id: parseInt(val)
    }))
  : [];
  return await prisma.orphan.create({
      data: {
          ...
          financialRecords: { connect: finRecIds }
          ...
      }
  })
```

> Update muation on `mutation.updateOrphan`

```js
// Get all relations' objects -- Unnecessary, since prisma handles 
// unavailable args and doesn't disconnect records that are already connnected by default, i.e.,
// prisma only alters the provided args
const prevOrphan = {
    ...
    financialRecords: await prisma.orphan.findUnique({ where: { id: parseInt(args.id) }).financialRecords(),
    ...
    })
}
// Map them to keep only the id's in the objects -- Unnecessary, since prisma handles 
// unavailable args and doesn't disconnect records that are already connnected by default, i.e.,
// prisma only alters the provided args
const prevOrphanIds = {
    ...
    finRecIds: [...prevOrphan.financialRecords].map(val => ({ id: val.id }))
    ...
}
// Get the ids from the args if provided and set them to the orphan, -- Neccessary
// Set the previous ones to the orphan if the args are not provided -- Unnecessary, since prisma handles 
// unavailable args and doesn't disconnect records that are already connnected by default, i.e.,
// prisma only alters the provided args
const finRecIds = args.financialRecords
  ? [...args.financialRecords].map((val) => ({
      id: parseInt(val)
    }))
  : prevOrphanIds.finRecIds;
  return await prisma.orphan.create({
      data: {
          ...
          financialRecords: { connect: finRecIds }
          ...
      }
  })
```
