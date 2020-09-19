function donor(parent, args, context){
    return context.prisma.sponsoredGroup.findOne({ where: { id: parent.id } }).donor();
}

function socialworkers(parent, args, context){
    return context.prisma.sponsoredGroup.findMany({ where: { id: parent.id } }).socialworkers();
}

function orphans(parent, args, context){
    return context.prisma.sponsoredGroup.findOne({ where: { id: parent.id } }).orphans();
}

module.exports = {
    donor,
    socialworkers,
    orphans,
}