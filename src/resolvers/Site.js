function orphans(parent, args, context){
    return context.prisma.site.findOne({ where: { id: parent.id } }).orphans();
}

module.exports = {
    orphans,
}