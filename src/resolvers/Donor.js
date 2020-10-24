function sponsoredgroups(parent, args, context){
    return context.prisma.donor.findOne({ where: { id: parent.id } }).sponsoredgroups();
}

module.exports = {
    sponsoredgroups,
}