function orphans(parent, args, context){
    return context.prisma.father.findOne({ where: { id: parent.id } }).orphans();
}

module.exports = {
    orphans,
}