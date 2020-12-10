function orphans(parent, args, context){
    return context.prisma.mother.findUnique({ where: { id: parent.id } }).orphans();
}

function motherjob(parent, args, context) {
    return context.prisma.mother.findUnique({ where: { id: parent.id } }).motherjob();
}

module.exports = {
    orphans,
    motherjob
}