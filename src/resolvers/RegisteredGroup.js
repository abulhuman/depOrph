function orphans(parent, args, context){
    return context.prisma.registeredGroup.findOne({ where: { id: parent.id } }).orphans();
}

module.exports = {
    orphans,
}