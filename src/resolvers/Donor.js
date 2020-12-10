function sponsoredgroups(parent, args, context){
    return context.prisma.donor.findUnique({ where: { id: parent.id } }).sponsoredgroups();
}

module.exports = {
    sponsoredgroups,
}