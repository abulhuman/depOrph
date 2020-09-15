function orphans(parent, args, context){
    console.log(parent);
    return context.prisma.father.findOne({ where: { id: 11 } }).orphans();
}

module.exports = {
    orphans,
}