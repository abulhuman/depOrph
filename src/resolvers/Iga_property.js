function orphan(parent, args, context){
    return context.prisma.iga_property.findOne({ where: { id: parent.id } }).orphan();
}

module.exports = {
    orphan,
}