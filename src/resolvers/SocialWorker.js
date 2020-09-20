function sponsoredgroup(parent, args, context) {
    return context.prisma.socialWorker.findOne({ where: { id: parent.id } }).sponsoredgroup();
}

module.exports = {
    sponsoredgroup,
}