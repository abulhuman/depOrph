function sponsoredgroup(parent, args, context) {
    return context.prisma.socialWorker.findUnique({ where: { id: parent.id } }).sponsoredgroup();
}

module.exports = {
    sponsoredgroup,
}