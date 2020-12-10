function mother(parent, context) {
    return context.prisma.motherJob.findUnique({ where: { id: parent.id } }).mother();
}

module.exports = {
    mother,
}