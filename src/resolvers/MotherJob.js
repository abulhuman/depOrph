function mother(parent, context) {
    console.log('Hello ¯\\_(ツ)_/¯');
    return context.prisma.motherJob.findOne({ where: { id: parent.id } }).mother();
}

module.exports = {
    mother,
}