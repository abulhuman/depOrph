function orphan(parent, args, context) {
    return context.prisma.sibling.findUnique({ where: { id: parent.id } }).orphan();
}

module.exports = {
    orphan,
}