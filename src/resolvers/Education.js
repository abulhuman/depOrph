function orphan(parent, args, context){
    return context.prisma.education.findUnique({ where: { id: parent.id } }).orphan();
}

module.exports = {
    orphan,
}