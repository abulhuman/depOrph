function orphan(parent, args, context){
    return context.prisma.iga_property.findUnique({ where: { id: parent.id } }).orphan();
}

module.exports = {
    orphan,
}