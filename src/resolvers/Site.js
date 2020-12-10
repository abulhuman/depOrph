function orphans(parent, args, context){
    return context.prisma.site.findUnique({ where: { id: parent.id } }).orphans();
}

module.exports = {
    orphans,
}