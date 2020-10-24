function mother(parent, context) {
    return context.prisma.motherJob.findOne({ where: { id: parent.id } }).mother();
}

module.exports = {
    mother,
}