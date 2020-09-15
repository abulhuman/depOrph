function orphan(parent, args, context){
    console.log(context.prisma.orphan.findOne({ where: { id: parent.id } }).orphan());
    return context.prisma.education.findOne({ where: { id: parent.id } }).orphan();
}

module.exports = {
    orphan,
}