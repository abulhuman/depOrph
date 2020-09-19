function orphans(parent, args, context){
    console.log(parent);
    return context.prisma.father.findOne({ where: { id: parent.id } }).orphans();
}

module.exports = {
    orphans,
}