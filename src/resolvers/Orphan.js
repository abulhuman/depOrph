function siblings(parent, args, context) {
    return context.prisma.orphan.findOne({ where: { id: parent.id } }).siblings()
}
module.exports = {
    siblings,
}