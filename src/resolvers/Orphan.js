function iga_property(parent, args, context){
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).iga_property();
}

function officialdocuments(parent, args, context){
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).officialdocuments();
}

function education(parent, args, context){
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).education();
}

function father(parent, args, context){
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).father();
}

function guardian(parent, args, context){
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).guardian();
}

function mother(parent, args, context){
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).mother();
}

function site(parent, args, context){
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).registeredgroup();
}

function sponsoredgroup(parent, args, context){
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).sponsoredgroup();
}

function siblings(parent, args, context) {
    return context.prisma.orphan.findUnique({ where: { id: parent.id } }).siblings();
}

module.exports = {
    iga_property,
    officialdocuments,
    education,
    father,
    guardian,
    mother,
    site,
    sponsoredgroup,
    siblings,
}