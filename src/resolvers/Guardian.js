function orphans(parent, args, context){
    return context.prisma.guardian.findOne({ where: { id: parent.id } }).orphans();
}

module.exports = {
    orphans,
}