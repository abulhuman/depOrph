function orphans(parent, args, context){
    return context.prisma.father.findUnique({ where: { id: parent.id } }).orphans();
}

module.exports = {
    orphans,
}