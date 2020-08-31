function orphan(parent, args, context) {
    return context.prisma.sibling.findOne({ where: { id: parent.id } }).orphan();
}

module.exports = {
    orphan,
}