function orphans(parent, args, context){
    return context.prisma.guardian.findUnique({ where: { id: parent.id } }).orphans();
}

module.exports = {
    orphans,
}