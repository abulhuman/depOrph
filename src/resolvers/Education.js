function orphan(parent, args, context){
    return context.prisma.education.findOne({ where: { id: parent.id } }).orphan();
}

module.exports = {
    orphan,
}